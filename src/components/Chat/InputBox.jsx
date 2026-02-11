import React, { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { Send } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function InputBox() {
  const [input, setInput] = useState('');
  const { sendMessage } = useChat();
  const { isGenerating } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative shadow-sm group">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            disabled={isGenerating}
            placeholder="输入你的创作灵感..."
            className="w-full pl-4 pr-14 py-4 min-h-[56px] max-h-[200px] border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed resize-none transition-all duration-200 scrollbar-hide text-base"
            rows={1}
            style={{
                height: 'auto',
                overflowY: 'hidden'
            }}
            onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
        />
        <button 
            type="submit" 
            disabled={isGenerating || !input.trim()}
            className="absolute right-3 bottom-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
        >
            {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <Send size={20} className="ml-0.5" />
            )}
        </button>
      </form>
      <p className="text-xs text-center text-gray-400 mt-3 select-none">
        按 Enter 发送，Shift + Enter 换行
      </p>
    </div>
  );
}
