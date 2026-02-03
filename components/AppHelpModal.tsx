import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, getTranslations } from '../types';

interface Props { language: Language; onClose: () => void }

export const AppHelpModal: React.FC<Props> = ({ language, onClose }) => {
  const tr = getTranslations(language);
  const t = tr.tutorial;
  const tCommon = tr.common;
  const steps = [t.step0, t.step1, t.step2, t.step3, t.step4];
  const [idx, setIdx] = useState(0);
  const isLast = idx === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100"><X /></button>
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <h3 className="text-xl font-black mb-2">{steps[idx].title}</h3>
        <p className="text-slate-600 mb-6">{steps[idx].text}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={() => setIdx(i => Math.max(0, i-1))} disabled={idx === 0} className="px-4 py-2 rounded-lg bg-slate-100 disabled:opacity-50"><ArrowLeft /></button>
            <button 
              onClick={() => isLast ? onClose() : setIdx(i => Math.min(steps.length - 1, i + 1))} 
              className="px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50 flex items-center gap-2"
            >
              {isLast ? tCommon.finish : tCommon.next}
              <ArrowRight />
            </button>
          </div>
          <button onClick={onClose} className="text-sm text-slate-500">{tCommon.close}</button>
        </div>
      </div>
    </div>
  );
};
