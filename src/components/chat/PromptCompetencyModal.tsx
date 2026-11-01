import React from 'react';
import { Sparkles, X, CheckCircle2, Copy, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { EDUCATIONAL_PROMPT_TEMPLATES, PROMPT_EVALUATION_CRITERIA } from '../../data/promptGuides';
import { PromptTemplate } from '../../types/vocational';

interface PromptCompetencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export const PromptCompetencyModal: React.FC<PromptCompetencyModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-teal-400/20 text-teal-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">
                Taller de Competencias en Formulación de Prompts
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Desarrollo de habilidades de instrucción a sistemas de IA en Ciencias de la Educación
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Method Explanation */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <span>Estructura R-C-T-R para Orientación Vocacional</span>
            </h4>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              Para obtener respuestas pedagógicamente fundamentadas de la inteligencia artificial, formula tus instrucciones integrando estos cuatro componentes esenciales:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {PROMPT_EVALUATION_CRITERIA.map((crit) => (
                <div key={crit.id} className="bg-white p-3 rounded-xl border border-indigo-200/60 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>{crit.label}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    {crit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Model Templates for Education Students */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">
                Plantillas Modélicas para la Cátedra
              </h4>
              <span className="text-xs text-slate-400">
                Haz clic en una para insertarla en el chat
              </span>
            </div>

            <div className="space-y-3">
              {EDUCATIONAL_PROMPT_TEMPLATES.map((template: PromptTemplate) => (
                <div
                  key={template.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all text-xs space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {template.title}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Competencia: <em>{template.targetCompetency}</em>
                  </p>
                  <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-100 italic leading-relaxed text-[11px]">
                    &ldquo;{template.promptText}&rdquo;
                  </p>
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        onSelectPrompt(template.promptText);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-[11px] hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      <span>Usar este prompt en OrientIA</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition-colors"
          >
            Cerrar guía
          </button>
        </div>
      </div>
    </div>
  );
};
