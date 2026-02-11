import { useState } from 'react';
import { useStore } from '../store/useStore';
import { streamChat } from '../services/chatAPI';

export const useChat = () => {
  const { config, messages, addMessage, updateLastMessage, setIsGenerating } = useStore();

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    // 1. 立即上屏用户消息
    const userMsg = { role: 'user', content: input };
    addMessage(userMsg);
    
    // 2. 准备历史上下文 (System Prompt + Recent History)
    // 这里的 messages 已经是包含最新 userMsg 的了(因为 addMessage 是同步更新 store? 不，zustand 是同步的)
    // 安全起见，手动构造请求用的 messages
    const apiMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    // 3. 预先添加一条空的 AI 消息 (占位)
    addMessage({ role: 'assistant', content: '' });
    setIsGenerating(true);

    let fullReply = '';

    // 4. 调用 API
    await streamChat(
        apiMessages, 
        config,
        (chunk) => {
            fullReply += chunk;
            updateLastMessage(fullReply); // 实时更新最后一条消息的内容
        },
        () => setIsGenerating(false), // Finish
        (err) => {
            setIsGenerating(false);
            updateLastMessage(`❌ 出错了: ${err}`); // 把错误信息显示在气泡里
        }
    );
  };

  return { sendMessage };
};
