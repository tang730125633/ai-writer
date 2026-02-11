import React from 'react';
import { Settings, PenTool, Hash, FileText, Wand2 } from 'lucide-react';

export default function Sidebar({ onOpenConfig, onAction }) {
  const menuItems = [
    { icon: <PenTool size={20} />, label: '开始写作', action: 'startWriting' },
    { icon: <Hash size={20} />, label: '生成标题', action: 'generateTitles' },
    { icon: <FileText size={20} />, label: '创建大纲', action: 'createOutline' },
    { icon: <Wand2 size={20} />, label: '润色优化', action: 'polishText' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Vibe Writer
        </span>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onAction(item.action)}
            className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200 group active:scale-[0.98]"
          >
            <span className="text-gray-400 group-hover:text-indigo-600 transition-colors p-1.5 bg-gray-50 rounded-md group-hover:bg-indigo-50">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50/50">
        <button
          onClick={onOpenConfig}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-[0.98]"
        >
          <Settings size={18} />
          <span>API 设置</span>
        </button>
      </div>
    </aside>
  );
}
