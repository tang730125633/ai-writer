import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // --- 配置状态 ---
      config: {
        apiKey: '',
        baseUrl: 'https://open.bigmodel.cn/api/paas/v4', // 智谱默认地址
        model: 'glm-4-flash'
      },
      setConfig: (newConfig) => set((state) => ({ 
        config: { ...state.config, ...newConfig } 
      })),

      // --- 聊天状态 ---
      messages: [], // [{role, content}, ...]
      isGenerating: false,

      // 添加一条消息
      addMessage: (msg) => set((state) => ({ 
        messages: [...state.messages, msg] 
      })),
      
      // 更新最后一条消息 (用于流式输出时，不断修改同一条消息的内容)
      updateLastMessage: (content) => set((state) => {
        const newMessages = [...state.messages];
        if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = { 
                ...newMessages[newMessages.length - 1], 
                content: content 
            };
        }
        return { messages: newMessages };
      }),

      setIsGenerating: (status) => set({ isGenerating: status }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'ai-writer-storage', // LocalStorage Key
      partialize: (state) => ({ config: state.config }), // 只持久化配置，聊天记录刷新清空(方便测试)
    }
  )
);
