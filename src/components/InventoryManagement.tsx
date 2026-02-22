import React, { useState } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const InventoryManagement: React.FC = () => {
  const [demand, setDemand] = useState<string>('500');
  const [safetyDays, setSafetyDays] = useState<string>('5');
  const [leadTime, setLeadTime] = useState<string>('15');

  const [cogs, setCogs] = useState<string>('120000');
  const [avgStock, setAvgStock] = useState<string>('15000');

  const safetyStock = Math.ceil(parseFloat(demand) * parseFloat(safetyDays));
  const reorderPoint = Math.ceil((parseFloat(demand) * parseFloat(leadTime)) + safetyStock);
  const turnover = (parseFloat(cogs) / parseFloat(avgStock)).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Safety Stock Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Estoque de Segurança</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Demanda Média (unid/dia)</label>
              <input type="number" value={demand} onChange={(e) => setDemand(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Dias de Reserva (Segurança)</label>
              <input type="number" value={safetyDays} onChange={(e) => setSafetyDays(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lead Time do Fornecedor (dias)</label>
              <input type="number" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>

            <div className="mt-6 p-6 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs font-bold text-orange-600 uppercase">Estoque de Segurança</p>
                  <p className="text-3xl font-black text-orange-900">{safetyStock} <span className="text-sm">unid</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-orange-600 uppercase">Ponto de Pedido</p>
                  <p className="text-3xl font-black text-orange-900">{reorderPoint} <span className="text-sm">unid</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Turnover Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Giro de Estoque</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CMV (Custo Mercadoria Vendida)</label>
              <input type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estoque Médio (Valor)</label>
              <input type="number" value={avgStock} onChange={(e) => setAvgStock(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>

            <div className="mt-6 p-8 bg-slate-900 rounded-3xl text-center text-white">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Índice de Giro</p>
              <p className="text-6xl font-black mb-2">{turnover}</p>
              <p className="text-slate-400 text-sm">vezes ao ano</p>
              
              <div className="mt-6 pt-6 border-t border-white/10 text-left">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  * Indica quantas vezes seu estoque foi vendido e reposto no período. Ideal: Maior giro = maior eficiência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
