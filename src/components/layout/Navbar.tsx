import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, MessageSquare, Menu, X, GraduationCap } from 'lucide-react';
import { NavigationTab } from '../../types/vocational';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  hasActiveInstrument?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Academic Title */}
          <div 
            onClick={() => handleNav('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Orient<span className="text-indigo-600 font-extrabold">IA</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  Ed. Superior
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Ciencias de la Educación · Orientación Vocacional y Profesional
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => handleNav('inicio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'inicio'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNav('tests')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'tests'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Test Vocacionales</span>
            </button>

            <button
              onClick={() => handleNav('chatbot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chatbot'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatbot OrientIA</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            </button>
          </nav>

          {/* Right Action: Prompt / AI Assistant Quick Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('chatbot')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/90 rounded-full border border-indigo-200/80 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Asistente con IA activa</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-lg">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pb-1">
            Navegación principal
          </p>
          <button
            onClick={() => handleNav('inicio')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'inicio'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <div>Inicio</div>
              <div className="text-xs text-slate-500 font-normal">Presentación de OrientIA y fundamentos</div>
            </div>
          </button>

          <button
            onClick={() => handleNav('tests')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'tests'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-5 h-5 text-teal-600" />
            <div className="text-left">
              <div>Test Vocacionales</div>
              <div className="text-xs text-slate-500 font-normal">Instrumentos, fichas técnicas y aplicación</div>
            </div>
          </button>

          <button
            onClick={() => handleNav('chatbot')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'chatbot'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <div>Chatbot OrientIA</div>
              <div className="text-xs text-slate-500 font-normal">Consultas y competencias de formulación de prompts</div>
            </div>
          </button>
        </div>
      )}
    </header>
  );
};
