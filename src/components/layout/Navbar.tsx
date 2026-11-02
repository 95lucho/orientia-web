import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, MessageSquare, Menu, X, GraduationCap, Building2, Users } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top institutional UAGRM thin banner */}
      <div className="bg-[#023273] text-white text-[11px] font-medium py-1 px-4 sm:px-8 border-b-2 border-[#C8102E] flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-200" />
            <span className="tracking-wide">
              Universidad Autónoma Gabriel René Moreno · <strong className="text-white font-semibold">UAGRM</strong>
            </span>
          </div>
          <span className="hidden md:inline text-slate-300 text-[10px]">
            Facultad de Humanidades · Ciencias de la Educación · Santa Cruz, Bolivia
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Academic Title */}
          <div 
            onClick={() => handleNav('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#023273] flex items-center justify-center text-white shadow-md shadow-[#023273]/25 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
              <div className="absolute bottom-0 inset-x-0 h-1 bg-[#C8102E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-[#023273] transition-colors">
                  Orient<span className="text-[#023273] font-extrabold">IA</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-[#023273] px-2 py-0.5 rounded-md border border-slate-200">
                  UAGRM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" title="Acento institucional provisorio" />
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Orientación Vocacional y Profesional · Ciencias de la Educación
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => handleNav('inicio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'inicio'
                  ? 'bg-[#023273] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#023273] hover:bg-white/80'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNav('tests')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'tests'
                  ? 'bg-[#023273] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#023273] hover:bg-white/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Test Vocacionales</span>
              <span className="text-[10px] bg-slate-200 text-[#023273] font-bold px-1.5 py-0.2 rounded-full">
                6
              </span>
            </button>

            <button
              onClick={() => handleNav('chatbot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chatbot'
                  ? 'bg-[#023273] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#023273] hover:bg-white/80'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatbot OrientIA</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8102E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8102E]"></span>
              </span>
            </button>

            <button
              onClick={() => handleNav('acerca')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'acerca'
                  ? 'bg-[#023273] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#023273] hover:bg-white/80'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Acerca de OrientIA</span>
            </button>
          </nav>

          {/* Right Action: Academic Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('chatbot')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#023273] bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-300 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#023273]" />
              <span>Asistente pedagógico activo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#023273]" /> : <Menu className="w-6 h-6 text-[#023273]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-lg">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pb-1">
            UAGRM · Orientación Vocacional y Profesional
          </p>
          <button
            onClick={() => handleNav('inicio')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'inicio'
                ? 'bg-[#023273] text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <div className="text-left">
              <div>Inicio</div>
              <div className={`text-xs ${activeTab === 'inicio' ? 'text-slate-200' : 'text-slate-500'} font-normal`}>
                Presentación de OrientIA y fundamentos
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNav('tests')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'tests'
                ? 'bg-[#023273] text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span>Test Vocacionales</span>
                <span className="text-[10px] bg-[#C8102E] text-white font-bold px-1.5 py-0.2 rounded-full">
                  6 instrumentos
                </span>
              </div>
              <div className={`text-xs ${activeTab === 'tests' ? 'text-slate-200' : 'text-slate-500'} font-normal`}>
                Catálogo de los 6 instrumentos y batería DAT
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNav('chatbot')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'chatbot'
                ? 'bg-[#023273] text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <div className="text-left">
              <div>Chatbot OrientIA</div>
              <div className={`text-xs ${activeTab === 'chatbot' ? 'text-slate-200' : 'text-slate-500'} font-normal`}>
                Consultas pedagógicas de la asignatura
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNav('acerca')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'acerca'
                ? 'bg-[#023273] text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <div className="text-left">
              <div>Acerca de OrientIA</div>
              <div className={`text-xs ${activeTab === 'acerca' ? 'text-slate-200' : 'text-slate-500'} font-normal`}>
                Créditos institucionales, referencia docente y autoría
              </div>
            </div>
          </button>
        </div>
      )}
    </header>
  );
};
