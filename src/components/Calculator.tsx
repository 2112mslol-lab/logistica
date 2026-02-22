import React, { useState } from 'react';
import { Calculator as CalcIcon, Delete, Equal, Hash } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const handleNumber = (num: string) => {
    if (isFinished) {
      setDisplay(num);
      setIsFinished(false);
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num);
    }
  };

  const handleOperator = (op: string) => {
    if (isFinished) {
      setEquation(display + ' ' + op + ' ');
      setIsFinished(false);
      setDisplay('0');
      return;
    }
    
    if (display === '0' && equation.length > 0) {
      // Replace last operator
      setEquation(prev => prev.slice(0, -3) + ' ' + op + ' ');
    } else {
      setEquation(prev => prev + display + ' ' + op + ' ');
      setDisplay('0');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsFinished(false);
  };

  const handleCalculate = () => {
    if (isFinished || equation === '') return;
    
    try {
      const fullEquation = equation + display;
      const sanitized = fullEquation.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(sanitized);
      setDisplay(String(Number(result.toFixed(8))));
      setEquation(fullEquation + ' =');
      setIsFinished(true);
    } catch (error) {
      setDisplay('Erro');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className = "", variant = "secondary" }: any) => {
    const variants: any = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
      secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100",
      accent: "bg-slate-800 text-white hover:bg-slate-900",
      ghost: "bg-slate-100 text-slate-500 hover:bg-slate-200"
    };

    return (
      <button
        onClick={onClick}
        className={`h-14 rounded-2xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center text-lg ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto w-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="p-2 bg-slate-100 rounded-xl">
          <CalcIcon className="w-5 h-5 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Calculadora Auxiliar</h2>
      </div>

      <div className="mb-4 md:mb-6 p-4 md:p-6 bg-slate-900 rounded-2xl md:rounded-3xl flex flex-col items-end justify-center min-h-[100px] md:min-h-[140px] shadow-inner">
        <div className="text-slate-500 text-xs md:text-sm font-medium mb-1 h-6 overflow-hidden tabular-nums">
          {equation}
        </div>
        <div className="text-white text-3xl md:text-5xl font-black tracking-tight overflow-hidden text-right w-full tabular-nums">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <Button onClick={handleClear} variant="ghost" className="col-span-2">Limpar</Button>
        <Button onClick={handleBackspace} variant="ghost"><Delete className="w-5 h-5" /></Button>
        <Button onClick={() => handleOperator('÷')} variant="ghost" className="text-blue-600 text-2xl">÷</Button>

        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperator('×')} variant="ghost" className="text-blue-600 text-2xl">×</Button>

        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperator('-')} variant="ghost" className="text-blue-600 text-3xl">-</Button>

        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={() => handleOperator('+')} variant="ghost" className="text-blue-600 text-2xl">+</Button>

        <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
        <Button onClick={() => handleNumber('.')}>.</Button>
        <Button onClick={handleCalculate} variant="primary"><Equal className="w-6 h-6" /></Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Hash className="w-3 h-3" />
          Teclado Numérico Ativo
        </div>
      </div>
    </div>
  );
};

export default Calculator;
