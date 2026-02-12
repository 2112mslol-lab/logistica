import React, { useState } from 'react';
import { Scale, Info } from 'lucide-react';

const VolumetricCalculator: React.FC = () => {
  const [dims, setDims] = useState({ length: 100, width: 100, height: 100 }); // cm
  const [factor, setFactor] = useState(6000); // Standard factor for air/road freight

  const calculateWeight = () => {
    const volume = dims.length * dims.width * dims.height;
    return volume / factor;
  };

  const weight = calculateWeight();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 card-hover">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Scale className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Cálculo de Peso Cubado</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {['length', 'width', 'height'].map((dim) => (
            <div key={dim}>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                {dim === 'length' ? 'Compr. (cm)' : dim === 'width' ? 'Larg. (cm)' : 'Alt. (cm)'}
              </label>
              <input
                type="number"
                value={dims[dim as keyof typeof dims]}
                onChange={(e) => setDims({...dims, [dim]: parseFloat(e.target.value) || 0})}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fator de Cubagem</label>
          <div className="flex gap-2">
            <select
              value={factor}
              onChange={(e) => setFactor(parseInt(e.target.value))}
              className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
            >
              <option value={6000}>6000 (Aéreo Nacional / Internacional)</option>
              <option value={5000}>5000 (Expresso)</option>
              <option value={300}>300 (Rodoviário padrão)</option>
              <option value={1000}>Customizado</option>
            </select>
          </div>
          <p className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
            <Info className="w-3 h-3" />
            O fator de cubagem varia conforme a transportadora ou modal.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl border border-purple-100">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Peso Taxável Estimado</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-purple-900">{weight.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
            <span className="text-xl font-bold text-purple-700">kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumetricCalculator;
