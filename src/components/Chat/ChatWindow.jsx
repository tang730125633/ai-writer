import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import ReactMarkdown from 'react-markdown';

export default function ChatWindow() {
  const { messages } = useStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
            <div className="p-4 bg-indigo-50 rounded-full">
                <span className="text-4xl">👋</span>
            </div>
            <p className="text-lg font-medium text-gray-600">嗨，我是你的 AI 写作助手。</p>
            <p className="text-sm">请先配置 API Key，然后开始对话吧！</p>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
            msg.role === 'user' 
              ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-sm' 
              : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
          }`}>
            <ReactMarkdown 
                components={{
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-3 border-b pb-1" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-2 space-y-1" {...props} />,
                    code: ({node, inline, className, children, ...props}) => 
                        inline 
                            ? <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-pink-600" {...props}>{children}</code>
                            : <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs my-2"><code {...props}>{children}</code></pre>
                }}
            >
                {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
