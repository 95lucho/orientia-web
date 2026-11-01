import React from 'react';
import { Compass, BookOpen, MessageSquare, ShieldCheck, HeartHandshake, Building2 } from 'lucide-react';
import { NavigationTab } from '../../types/vocational';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#023273] text-white border-t-4 border-[#C8102E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Institutional Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#023273] flex items-center justify-center shadow-md font-bold">
                <Compass className="w-5 h-5 text-[#023273]" />
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">
                  Orient<span className="text-slate-200">IA</span>
                </span>
                <span className="text-[10px] ml-2 font-bold uppercase tracking-wider bg-[#C8102E] text-white px-2 py-0.5 rounded-sm">
                  UAGRM
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 max-w-md leading-relaxed">
              Plataforma digital educativa de apoyo académico para la asignatura <strong>Orientación Vocacional y Profesional</strong> de la carrera <strong>Ciencias de la Educación</strong>. 
              Universidad Autónoma Gabriel René Moreno (UAGRM), Santa Cruz de la Sierra, Bolivia.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-200 bg-[#012250] px-3.5 py-2 rounded-xl w-fit border border-blue-900/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Espacio de apoyo al aprendizaje · No sustituye el diagnóstico psicométrico formal</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-400/30 pb-1">
              Secciones de OrientIA
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              <li>
                <button
                  onClick={() => onSelectTab('inicio')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Inicio y Presentación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tests')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Catálogo de los 6 Instrumentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('chatbot')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Chatbot OrientIA
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-400/30 pb-1">
              Marco Académico UAGRM
            </h4>
            <div className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
              <p>
                Universidad: <strong className="text-white">Autónoma Gabriel René Moreno</strong>
              </p>
              <p>
                Facultad: <strong className="text-white">Facultad de Humanidades</strong>
              </p>
              <p>
                Carrera: <strong className="text-white">Ciencias de la Educación</strong>
              </p>
              <p>
                Asignatura: <strong className="text-white">Orientación Vocacional y Profesional</strong>
              </p>
              <p className="text-slate-300 text-[11px] pt-1">
                Santa Cruz de la Sierra, Bolivia
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-900/80 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} OrientIA · Universidad Autónoma Gabriel René Moreno (UAGRM).</p>
          <p className="text-center sm:text-right text-[11px]">
            Diseñado con rigor pedagógico para la formación docente en orientación vocacional.
          </p>
        </div>
      </div>
    </footer>
  );
};
