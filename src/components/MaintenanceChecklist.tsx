import React, { useState } from 'react';
import { ClipboardCheck, ShieldCheck, AlertCircle, Calendar, Camera } from 'lucide-react';

const MaintenanceChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Nível de óleo do motor', status: 'pending' },
    { id: 2, label: 'Pressão e estado dos pneus', status: 'pending' },
    { id: 3, label: 'Luzes (faróis, setas, freio)', status: 'pending' },
    { id: 4, label: 'Nível do fluido de freio', status: 'pending' },
    { id: 5, label: 'Estado das mangueiras hidráulicas', status: 'pending' },
    { id: 6, label: 'Buzina e alarme de ré', status: 'pending' },
    { id: 7, label: 'Cintos de segurança', status: 'pending' },
    { id: 8, label: 'Vazamentos visíveis', status: 'pending' },
  ]);

  const updateStatus = (id: number, status: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
  };

  const okCount = items.filter(i => i.status === 'ok').length;
  const progress = (okCount / items.length) * 100;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-900 rounded-lg">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Checklist Diário (DDS)</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Equipamento</p>
          <p className="text-sm font-bold text-slate-900">Empilhadeira Hyster J2.5</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Progresso da Inspeção</span>
          <span className="text-sm font-black text-slate-900">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border border-slate-50 rounded-xl hover:bg-slate-50/50 transition-colors">
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => updateStatus(item.id, 'error')}
                className={`p-1.5 rounded-lg transition-all ${item.status === 'error' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}`}
              >
                <AlertCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => updateStatus(item.id, 'ok')}
                className={`p-1.5 rounded-lg transition-all ${item.status === 'ok' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
          <Camera className="w-4 h-4" /> Anexar Foto
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
          <Calendar className="w-4 h-4" /> Agendar Revisão
        </button>
      </div>

      <p className="mt-4 text-[10px] text-center text-slate-400 font-medium">
        Este documento tem validade educacional para simulação de processos de segurança operacional.
      </p>
    </div>
  );
};

export default MaintenanceChecklist;
