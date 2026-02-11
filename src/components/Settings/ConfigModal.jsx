import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';

export default function ConfigModal({ onClose }) {
  const { config, setConfig } = useStore();
  const [key, setKey] = useState(config.apiKey || '');
  const [baseUrl, setBaseUrl] = useState(config.baseUrl || '');
  const [model, setModel] = useState(config.model || '');

  const handleSave = () => {
    setConfig({ apiKey: key, baseUrl, model });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">API 配置</h3>
            <button onClick={onClose}><X size={20}/></button>
        </div>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">服务商 (Base URL)</label>
                <input 
                    type="text" 
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="w-full border rounded p-2" 
                    placeholder="https://open.bigmodel.cn/api/paas/v4"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模型名称</label>
                <input 
                    type="text" 
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border rounded p-2" 
                    placeholder="glm-4-flash"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input 
                    type="password" 
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full border rounded p-2" 
                    placeholder="sk-..."
                />
            </div>
            <button 
                onClick={handleSave}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
                保存配置
            </button>
        </div>
      </div>
    </div>
  );
}
