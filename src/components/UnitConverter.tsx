import React, { useState } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');

  const conversions: Record<string, { factor: number; label: string }> = {
    mm: { factor: 1, label: 'Milímetros (mm)' },
    cm: { factor: 10, label: 'Centímetros (cm)' },
    dm: { factor: 100, label: 'Decímetros (dm)' },
    m: { factor: 1000, label: 'Metros (m)' },
    dam: { factor: 10000, label: 'Decâmetros (dam)' },
    hm: { factor: 100000, label: 'Hectômetros (hm)' },
    km: { factor: 1000000, label: 'Quilômetros (km)' },
    inch: { factor: 25.4, label: 'Polegadas (in)' },
    ft: { factor: 304.8, label: 'Pés (ft)' },
  };

  const units = Object.keys(conversions);

  const convert = () => {
    const numValue = parseFloat(value) || 0;
    const valueInMm = numValue * conversions[fromUnit].factor;
    const result = valueInMm / conversions[toUnit].factor;
    return result.toLocaleString('pt-BR', { maximumFractionDigits: 6 });
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 card-hover">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <RefreshCw className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Conversor de Medidas</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Valor</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Digite o valor..."
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">De</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              {units.map((u) => (
                <option key={u} value={u}>{conversions[u].label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={swapUnits}
            className="mt-6 p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Para</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              {units.map((u) => (
                <option key={u} value={u}>{conversions[u].label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Resultado</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-blue-900">{convert()}</span>
            <span className="text-xl font-bold text-blue-700">{toUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
