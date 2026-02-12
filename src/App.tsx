import { useState } from 'react';
import { Package, Truck, Layers, HelpCircle } from 'lucide-react';
import UnitConverter from './components/UnitConverter';
import SpaceCalculator from './components/SpaceCalculator';
import VolumetricCalculator from './components/VolumetricCalculator';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('converter');

  const tabs = [
    { id: 'converter', label: 'Conversor', icon: Package, component: UnitConverter },
    { id: 'space', label: 'Capacidade', icon: Layers, component: SpaceCalculator },
    { id: 'volumetric', label: 'Peso Cubado', icon: Truck, component: VolumetricCalculator },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">LogiCalc Pro</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Educational Suite</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Painel de Logística</h2>
          <p className="text-slate-500 max-w-2xl">
            Ferramentas profissionais de conversão e cálculo de espaço focadas no ensino profissionalizante de logística e transporte.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/70'}
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-12 xl:col-span-8">
              {tabs.find(t => t.id === activeTab)?.component && 
                React.createElement(tabs.find(t => t.id === activeTab)!.component)}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Sistema de Medidas
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Converta entre milímetros, centímetros, metros, polegadas e pés com precisão para evitar erros de carga.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Aproveitamento
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Descubra quantas unidades de um produto cabem em um contêiner ou armazém baseado em volume bruto.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Frete e Cubagem
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Calcule o peso cubado para precificação correta de fretes aéreos e rodoviários segundo normas padrão.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 text-center pb-10">
        <p className="text-xs text-slate-400 font-medium">
          DYS Logística - Módulo de Ensino v1.0.0
        </p>
      </footer>
    </div>
  );
}

import React from 'react';
export default App;
