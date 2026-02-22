import React, { useState } from 'react';
import { DollarSign, Fuel, Navigation } from 'lucide-react';

const FreightSimulator: React.FC = () => {
  const [distance, setDistance] = useState('450');
  const [fuelPrice, setFuelPrice] = useState('5.85');
  const [consumption, setConsumption] = useState('3.5'); // km/l
  const [tolls, setTolls] = useState('120');
  const [margin, setMargin] = useState('30'); // %

  const fuelCost = (parseFloat(distance) / parseFloat(consumption)) * parseFloat(fuelPrice);
  const totalCost = fuelCost + parseFloat(tolls);
  const profit = totalCost * (parseFloat(margin) / 100);
  const finalFreight = totalCost + profit;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <DollarSign className="w-5 h-5 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Simulador de Frete</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Distância (km)</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Consumo (km/l)</label>
              <div className="relative">
                <Fuel className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input type="number" value={consumption} onChange={(e) => setConsumption(e.target.value)} className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Combustível (R$)</label>
              <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pedágios (R$)</label>
              <input type="number" value={tolls} onChange={(e) => setTolls(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Margem de Lucro (%)</label>
            <input 
              type="range" min="0" max="100" value={margin} 
              onChange={(e) => setMargin(e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
              <span>0%</span>
              <span>{margin}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium p-3 bg-white rounded-xl shadow-sm">
              <span className="text-slate-500">Custo Combustível</span>
              <span className="text-slate-900">R$ {fuelCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium p-3 bg-white rounded-xl shadow-sm">
              <span className="text-slate-500">Lucro Desejado</span>
              <span className="text-emerald-600">+ R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-center">Valor Total do Frete Sugerido</p>
            <p className="text-5xl font-black text-slate-900 text-center tracking-tight">
              <span className="text-lg font-bold text-slate-400">R$ </span>
              {finalFreight.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightSimulator;
