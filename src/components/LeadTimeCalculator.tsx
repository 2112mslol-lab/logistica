import React, { useState } from 'react';
import { Clock, Timer, CheckCircle2, ChevronRight } from 'lucide-react';

const LeadTimeCalculator: React.FC = () => {
  const [processing, setProcessing] = useState<string>('1');
  const [production, setProduction] = useState<string>('2');
  const [shipping, setShipping] = useState<string>('3');
  const [delivery, setDelivery] = useState<string>('2');

  const steps = [
    { label: 'Processamento', value: processing, setter: setProcessing, color: 'bg-blue-500' },
    { label: 'Produção/Separação', value: production, setter: setProduction, color: 'bg-indigo-500' },
    { label: 'Expedição', value: shipping, setter: setShipping, color: 'bg-purple-500' },
    { label: 'Transporte/Entrega', value: delivery, setter: setDelivery, color: 'bg-emerald-500' },
  ];

  const total = parseFloat(processing) + parseFloat(production) + parseFloat(shipping) + parseFloat(delivery) || 0;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 card-hover">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Cálculo de Lead Time</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {step.label} (dias)
              </label>
              <input
                type="number"
                value={step.value}
                onChange={(e) => step.setter(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <Timer className="w-12 h-12 text-indigo-400 mb-4" />
          <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-1">Lead Time Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black">{total}</span>
            <span className="text-xl font-bold text-indigo-400">dias</span>
          </div>

          <div className="w-full mt-8 space-y-2">
            <div className="h-2 w-full bg-white/10 rounded-full flex overflow-hidden">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  style={{ width: `${(parseFloat(step.value || '0') / (total || 1)) * 100}%` }}
                  className={`${step.color} transition-all duration-500`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Pedido</span>
              <span>Entrega</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className={`w-2 h-2 rounded-full ${step.color} mb-2`}></div>
            <p className="text-xs font-bold text-slate-800">{step.label}</p>
            <p className="text-lg font-black text-slate-900">{((parseFloat(step.value || '0') / (total || 1)) * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadTimeCalculator;
