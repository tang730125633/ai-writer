// 负责与智谱 API 进行直接通信
export const streamChat = async (messages, config, onChunk, onFinish, onError) => {
  try {
    // 1. 发起 Fetch 请求
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages, // [{role: 'user', content: '...'}, ...]
        stream: true,       // 必须开启流式
        temperature: 0.7
      })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    // 2. 处理流式响应 (ReadableStream)
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 解码二进制数据
      const chunk = decoder.decode(value, { stream: true });
      
      // 处理多行数据 (SSE 格式通常是一行一个 data: ...)
      const lines = chunk.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        
        if (trimmed.startsWith('data: ')) {
            try {
                const json = JSON.parse(trimmed.slice(6)); // 去掉 'data: ' 前缀
                const content = json.choices?.[0]?.delta?.content || '';
                if (content) {
                    fullText += content;
                    onChunk(content); // 回调：把这一个字吐给 UI
                }
            } catch (e) {
                console.warn('JSON Parse Error', e);
            }
        }
      }
    }
    
    onFinish(fullText); // 回调：告诉 UI 完事了

  } catch (error) {
    console.error('Stream Error:', error);
    onError(error.message);
  }
};
