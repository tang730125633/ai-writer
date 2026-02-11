import { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import ChatWindow from './components/Chat/ChatWindow';
import InputBox from './components/Chat/InputBox';
import ConfigModal from './components/Settings/ConfigModal';
import { useStore } from './store/useStore';
import { useChat } from './hooks/useChat';
// import { PROMPTS } from './lib/prompts'; // 暂时注释掉，避免 unused var 报错

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const { config } = useStore();
  const { sendMessage } = useChat();

  useEffect(() => {
    if (!config.apiKey) {
      setShowConfig(true);
    }
  }, []);

  // 处理侧边栏点击事件
  const handleAction = async (action) => {
    let input = '';
    
    switch (action) {
        case 'startWriting':
            input = "我想写一篇关于【人工智能未来】的文章，请帮我生成全文。";
            break;
        case 'generateTitles':
            input = "请为【如何高效学习】这个主题生成 10 个爆款标题。";
            break;
        case 'createOutline':
            input = "请为【Python 入门教程】这个主题生成一份详细的大纲。";
            break;
        case 'polishText':
            input = "请润色这段话：'今天天气很好，我去公园玩了，很开心。' (要求：更生动、更文艺)";
            break;
        default:
            return;
    }
    
    // 自动发送 (模拟用户点击)
    if (input) {
        sendMessage(input);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        onOpenConfig={() => setShowConfig(true)} 
        onAction={handleAction} 
      />
      
      <main className="flex-1 flex flex-col relative h-full w-full max-w-[1440px] mx-auto bg-white shadow-xl rounded-l-3xl overflow-hidden my-4 border border-gray-100">
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${config.apiKey ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'} animate-pulse shadow-sm`} />
            <span className="text-sm font-medium text-gray-500">
                {config.apiKey ? 'AI 在线' : '未配置 Key'}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-400 font-mono">
            {config.model || '未连接'}
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative bg-gray-50/30">
            <ChatWindow />
        </div>

        <div className="p-6 pb-8 bg-white border-t border-gray-50 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
            <InputBox />
        </div>
      </main>

      {showConfig && <ConfigModal onClose={() => setShowConfig(false)} />}
    </div>
  );
}

export default App;
