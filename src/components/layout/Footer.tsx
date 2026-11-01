import React from 'react';
import { Compass, BookOpen, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { NavigationTab } from '../../types/vocational';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Orient<span className="text-teal-400">IA</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Plataforma pedagógica de Orientación Vocacional y Profesional para estudiantes y docentes de la carrera de Ciencias de la Educación. Integración reflexiva de instrumentos vocacionales y competencias en inteligencia artificial.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg w-fit border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Arquitectura segura: Procesamiento de IA desde el servidor sin exposición de credenciales</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Secciones</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('inicio')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Inicio y Presentación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tests')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Test Vocacionales (Instrumentos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('chatbot')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Chatbot OrientIA & Prompts
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cátedra Formativa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Asignatura: <strong className="text-slate-200">Orientación Vocacional y Profesional</strong>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Carrera: <strong className="text-slate-200">Ciencias de la Educación</strong>
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-indigo-400" />
              <span>Acompañamiento pedagógico y vocacional</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} OrientIA · Entorno Pedagógico Universitario.</p>
          <p className="text-center sm:text-right">
            Diseñado con enfoque ético para el desarrollo del proyecto de vida.
          </p>
        </div>
      </div>
    </footer>
  );
};
