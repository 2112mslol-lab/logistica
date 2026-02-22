import { useState } from 'react';
import { Package, Truck, Layers, HelpCircle } from 'lucide-react';
import UnitConverter from './components/UnitConverter';
import SpaceCalculator from './components/SpaceCalculator';
import VolumetricCalculator from './components/VolumetricCalculator';
import Calculator from './components/Calculator';
import LeadTimeCalculator from './components/LeadTimeCalculator';
import InventoryManagement from './components/InventoryManagement';
import PalletPacking from './components/PalletPacking';
import FreightSimulator from './components/FreightSimulator';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  Clock, 
  Database, 
  Box, 
  DollarSign,
  ClipboardList
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('converter');

  const tabs = [
    { id: 'converter', label: 'Conversor', icon: Package, component: UnitConverter, category: 'Essenciais' },
    { id: 'space', label: 'Capacidade', icon: Layers, component: SpaceCalculator, category: 'Essenciais' },
    { id: 'volumetric', label: 'Peso Cubado', icon: Truck, component: VolumetricCalculator, category: 'Essenciais' },
    { id: 'leadtime', label: 'Lead Time', icon: Clock, component: LeadTimeCalculator, category: 'Gestão' },
    { id: 'inventory', label: 'Estoque/Giro', icon: Database, component: InventoryManagement, category: 'Gestão' },
    { id: 'pallet', label: 'Paletização', icon: Box, component: PalletPacking, category: 'Operação' },
    { id: 'freight', label: 'Frete/KM', icon: DollarSign, component: FreightSimulator, category: 'Operação' },
    { id: 'maintenance', label: 'Checklist', icon: ClipboardList, component: MaintenanceChecklist, category: 'Operação' },
    { id: 'calculator', label: 'Calculadora', icon: CalcIcon, component: Calculator, category: 'Suporte' },
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
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Painel de Logística</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Ferramentas profissionais de conversão e cálculo de espaço focadas no ensino profissionalizante de logística e transporte.
          </p>
        </div>

        {/* Tab Navigation Grouped with enhanced visibility */}
        <div className="mb-12 p-6 md:p-8 bg-slate-100/80 backdrop-blur-sm rounded-[2rem] border border-slate-200/60 shadow-inner space-y-8">
          {['Essenciais', 'Gestão', 'Operação', 'Suporte'].map((cat) => (
            <div key={cat} className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap bg-slate-200/50 px-3 py-1 rounded-full">
                  {cat}
                </h3>
                <div className="h-[1px] flex-1 bg-slate-200/50"></div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {tabs.filter(t => t.category === cat).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1 scale-105' 
                        : 'bg-white text-slate-600 hover:text-blue-600 hover:shadow-md border border-slate-200/50 shadow-sm'}
                    `}
                  >
                    <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-blue-500'}`}>
                      <tab.icon className="w-4 h-4" />
                    </div>
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Content Area - centered and boxed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {tabs.find(t => t.id === activeTab)?.component && 
              React.createElement(tabs.find(t => t.id === activeTab)!.component)}
          </motion.div>
        </AnimatePresence>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Sistema de Medidas
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Converta entre milímetros, centímetros, metros, polegadas e pés com precisão.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Aproveitamento
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Descubra quantas unidades cabem em um contêiner baseado em volume bruto.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Frete e Cubagem
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Calcule o peso cubado para precificação correta de fretes e transportes.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Calculadora
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ferramenta auxiliar para cálculos matemáticos rápidos sem sair do painel.
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
