// 提示词工厂：根据不同的功能场景，生成特定的 Prompt
export const PROMPTS = {
    // 场景：生成标题
    generateTitles: (topic, platform = '公众号', count = 10, style = '爆款') => {
        return [
            { role: "system", content: "你是一个专业的爆款标题生成专家。请直接输出标题列表，不要包含任何前言或后语。" },
            { role: "user", content: `请为主题"${topic}"生成${count}个适合发布在${platform}的标题。风格要求：${style}。` }
        ];
    },
    
    // 场景：开始写作
    startWriting: (topic, platform = '公众号', audience = '大众', length = '1500', style = '通俗易懂') => {
        return [
            { role: "system", content: "你是一个专业的写作助手。请根据用户需求撰写高质量的文章。使用 Markdown 格式，层级清晰。" },
            { role: "user", content: `请写一篇关于"${topic}"的文章。\n\n发布平台：${platform}\n受众群体：${audience}\n字数要求：${length}字左右\n风格偏好：${style}\n\n请按以下结构输出：\n1. 吸引人的标题\n2. 文章正文（分段落，带小标题）\n3. 结尾金句或互动(CTA)` }
        ];
    },
    
    // 场景：创建大纲
    createOutline: (topic, structure = '总分总') => {
        return [
            { role: "system", content: "你是一个结构化思维大师。请为用户生成清晰的写作大纲。" },
            { role: "user", content: `请为主题"${topic}"创建一个详细的写作大纲。\n结构要求：${structure}\n请包含一级标题、二级标题和每个部分的简要内容提示。` }
        ];
    },

    // 场景：润色优化
    polishText: (content, style = '更通顺') => {
        return [
            { role: "system", content: "你是一个资深编辑。请对用户提供的文本进行润色优化，使其更符合目标风格，但不要改变原意。" },
            { role: "user", content: `请将以下文本润色为${style}风格：\n\n${content}\n\n请输出：\n1. 润色后的文本\n2. 修改说明（列出主要改动点）` }
        ];
    }
};
