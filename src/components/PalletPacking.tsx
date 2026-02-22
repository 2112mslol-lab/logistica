import React, { useState } from 'react';
import { Layers, Box, Maximize, Ruler } from 'lucide-react';

const PalletPacking: React.FC = () => {
  const [boxL, setBoxL] = useState('40');
  const [boxW, setBoxW] = useState('30');
  const [boxH, setBoxH] = useState('25');
  const [palletType, setPalletType] = useState('PBR'); // PBR: 1200x1000, Euro: 1200x800

  const palletDims = palletType === 'PBR' ? { l: 120, w: 100 } : { l: 120, w: 80 };
  
  // Basic calculation: boxes along L and boxes along W
  const perLayer1 = Math.floor(palletDims.l / parseFloat(boxL || '1')) * Math.floor(palletDims.w / parseFloat(boxW || '1'));
  const perLayer2 = Math.floor(palletDims.l / parseFloat(boxW || '1')) * Math.floor(palletDims.w / parseFloat(boxL || '1'));
  const boxesPerLayer = Math.max(perLayer1, perLayer2);
  
  const maxHeight = 160; // Standard max height with pallet in cm
  const maxLayers = Math.floor((maxHeight - 15) / parseFloat(boxH || '1')); // 15cm is pallet height
  const totalBoxes = boxesPerLayer * maxLayers;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Layers className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Ocupação de Paletes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tipo de Palete</label>
            <div className="grid grid-cols-2 gap-2">
              {['PBR', 'Euro'].map(type => (
                <button
                  key={type}
                  onClick={() => setPalletType(type)}
                  className={`p-3 rounded-xl border-2 font-bold transition-all ${
                    palletType === type ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {type === 'PBR' ? 'PBR (1.2x1.0m)' : 'Euro (1.2x0.8m)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">C (cm)</label>
              <input type="number" value={boxL} onChange={(e) => setBoxL(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">L (cm)</label>
              <input type="number" value={boxW} onChange={(e) => setBoxW(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">A (cm)</label>
              <input type="number" value={boxH} onChange={(e) => setBoxH(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl">
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Maximize className="w-4 h-4" /> Resumo do Cálculo
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Caixas por camada:</span>
                <span className="font-bold">{boxesPerLayer}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Limitação de altura (1.60m):</span>
                <span className="font-bold">{maxLayers} camadas</span>
              </li>
              <li className="flex justify-between text-sm pt-2 border-t border-slate-200 mt-2">
                <span className="text-slate-900 font-bold">Total estimado:</span>
                <span className="text-blue-600 font-black">{totalBoxes} caixas</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
          {/* Visual Representation (Abstract) */}
          <div className="relative w-48 h-48 bg-blue-500/20 border-2 border-blue-500/50 rounded-lg flex items-center justify-center rotate-12">
            <div className="grid grid-cols-3 gap-1 p-2 w-full h-full">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-orange-400 border border-orange-600/50 rounded shadow-lg transform -translate-y-1 -translate-x-1 hover:translate-y-0 transition-all cursor-pointer"></div>
              ))}
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-20">
              <Box className="w-40 h-40 text-blue-500" />
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <Ruler className="w-3 h-3" /> Visualização Esquemática
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalletPacking;
