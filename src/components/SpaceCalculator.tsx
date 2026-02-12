import React, { useState } from 'react';
import { Box, Maximize, AlertCircle, ChevronDown } from 'lucide-react';

const SpaceCalculator: React.FC = () => {
  const [space, setSpace] = useState({ length: 12, width: 8, height: 10 });
  const [item, setItem] = useState({ length: 40, width: 30, height: 20 });
  const [spaceUnit, setSpaceUnit] = useState<string>('m');
  const [itemUnit, setItemUnit] = useState<string>('cm');

  const conversions: Record<string, number> = {
    mm: 1,
    cm: 10,
    dm: 100,
    m: 1000,
    km: 1000000,
    inch: 25.4,
    ft: 304.8,
  };

  const calculateFitting = () => {
    // Convert all to mm for precision
    const sFactor = conversions[spaceUnit];
    const iFactor = conversions[itemUnit];

    const sL = space.length * sFactor;
    const sW = space.width * sFactor;
    const sH = space.height * sFactor;

    const iL = item.length * iFactor;
    const iW = item.width * iFactor;
    const iH = item.height * iFactor;

    if (iL <= 0 || iW <= 0 || iH <= 0) return { total: 0, efficiency: 0, fitL: 0, fitW: 0, fitH: 0 };

    const fitL = Math.floor(sL / iL);
    const fitW = Math.floor(sW / iW);
    const fitH = Math.floor(sH / iH);
    
    const total = fitL * fitW * fitH;
    
    // Efficiency calculation
    const spaceVolume = sL * sW * sH;
    const itemsVolume = total * (iL * iW * iH);
    const efficiency = spaceVolume > 0 ? (itemsVolume / spaceVolume) * 100 : 0;

    return { total, efficiency, fitL, fitW, fitH };
  };

  const { total, efficiency, fitL, fitW, fitH } = calculateFitting();

  const UnitSelector = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-2 py-1 pr-6 text-[10px] font-bold text-gray-600 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
      >
        {Object.keys(conversions).map(u => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>
      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 card-hover">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Maximize className="w-5 h-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Cálculo de Capacidade</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Espaço Total</h3>
              <UnitSelector value={spaceUnit} onChange={setSpaceUnit} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['length', 'width', 'height'].map((dim) => (
                <div key={dim}>
                  <input
                    type="number"
                    value={space[dim as keyof typeof space]}
                    onChange={(e) => setSpace({...space, [dim]: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder={dim}
                  />
                  <span className="text-[10px] text-gray-400 block text-center mt-1">{dim === 'length' ? 'Compr.' : dim === 'width' ? 'Larg.' : 'Alt.'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dimensões do Item</h3>
              <UnitSelector value={itemUnit} onChange={setItemUnit} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['length', 'width', 'height'].map((dim) => (
                <div key={dim}>
                  <input
                    type="number"
                    value={item[dim as keyof typeof item]}
                    onChange={(e) => setItem({...item, [dim]: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder={dim}
                  />
                  <span className="text-[10px] text-gray-400 block text-center mt-1">{dim === 'length' ? 'Compr.' : dim === 'width' ? 'Larg.' : 'Alt.'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 flex flex-col items-center justify-center text-center">
            <Box className="w-12 h-12 text-orange-600 mb-2 opacity-50" />
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Cabem no espaço</p>
            <span className="text-5xl font-black text-orange-900">{total}</span>
            <span className="text-lg font-bold text-orange-700">unidades</span>
            
            <div className="mt-4 pt-4 border-t border-orange-200 w-full">
              <div className="flex justify-between text-xs text-orange-800 font-medium">
                <span>Eficiência de Cubagem</span>
                <span>{efficiency.toFixed(1)}%</span>
              </div>
              <div className="mt-1 w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(efficiency, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 italic">
              Disposição: {fitL}x{fitW}x{fitH} (Comprimento x Largura x Altura). 
              Cálculo compatível com diferentes unidades de entrada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCalculator;
