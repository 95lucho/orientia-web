import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Target, 
  Users, 
  Lightbulb, 
  Layers
} from 'lucide-react';
import { NavigationTab } from '../../types/vocational';
import { VOCATIONAL_INSTRUMENTS } from '../../data/instruments';

interface HomeSectionProps {
  onNavigate: (tab: NavigationTab, instrumentId?: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-900/50">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs sm:text-sm font-semibold">
            <GraduationCap className="w-4 h-4 text-teal-400" />
            <span>Ciencias de la Educación · Cátedra de Orientación Vocacional y Profesional</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Bienvenido a <span className="bg-gradient-to-r from-teal-300 via-indigo-200 to-white bg-clip-text text-transparent">OrientIA</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Un entorno pedagógico integral concebido para futuros pedagogos y orientadores educativos. 
            Explora instrumentos estandarizados de orientación vocacional, interactúa con nuestro asistente inteligente 
            y fortalece tus competencias en formulación de instrucciones efectivas a sistemas de IA.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('tests')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Comenzar exploración</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('chatbot')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Consultar con OrientIA</span>
            </button>
          </div>

          {/* Quick Metrics / Academic Pillars */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{VOCATIONAL_INSTRUMENTS.length} Instrumentos Clásicos y Actuales</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Conexión Servidor Segura (Gemini)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Taller de Prompt Engineering</span>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation of Educational Purpose */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Fundamentación Pedagógica
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Orientación Vocacional como Práctica Transformadora
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            En la formación en <strong>Ciencias de la Educación</strong>, la orientación vocacional y profesional 
            supera la simple aplicación de pruebas psicométricas. Es un proceso de mediación pedagógica, 
            construcción de proyectos de vida, autoconocimiento reflexivo y análisis de las oportunidades formativas y del contexto socio-comunitario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 hover:border-indigo-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Proyecto de Vida Autónomo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acompañar a los sujetos en la deliberación informada sobre su futuro educativo y ocupacional, respetando su subjetividad e historia personal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 hover:border-teal-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mirada Institucional y Comunitaria</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprender el rol del orientador en escuelas secundarias, instituciones de formación docente, universidades y gabinetes psicopedagógicos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 hover:border-amber-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Alfabetización e Inteligencia Artificial</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Desarrollar criterio pedagógico para formular instrucciones efectivas (prompts) y utilizar la IA como catalizador del pensamiento crítico.
            </p>
          </div>
        </div>
      </section>

      {/* The 3 Core Sections of OrientIA */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Módulos Principales de la Aplicación
          </h2>
          <p className="text-sm text-slate-600">
            Navega entre los espacios diseñados para acompañar tu formación académica en la asignatura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Tests */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Módulo I</span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Test Vocacionales
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Catálogo de instrumentos de evaluación vocacional. Cada instrumento dispone de su propia página con ficha técnica, fundamentación, instrucciones para orientador y orientado, y el espacio preparado para la administración de reactivos oficiales de la cátedra.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('tests')}
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-800 hover:text-white font-semibold text-sm transition-all"
              >
                <span>Explorar instrumentos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Chatbot OrientIA */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Módulo II</span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  Chatbot OrientIA
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interfaz de conversación orientada a resolver dudas curriculares, teorías vocacionales (Holland, Super, Krumboltz) y diseño de intervenciones pedagógicas mediante conexión segura del servidor con modelos Gemini.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('chatbot')}
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 text-slate-800 hover:text-white font-semibold text-sm transition-all"
              >
                <span>Iniciar conversación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Formulación de Prompts */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Módulo III</span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                  Competencias de Prompting
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Estructura formativa para aprender a formular instrucciones precisas a la IA: definición de rol pedagógico, delimitación contextual de los orientados, consignas pedagógicas y marcos éticos de orientación.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('chatbot')}
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-violet-600 text-slate-800 hover:text-white font-semibold text-sm transition-all"
              >
                <span>Ver taller de prompts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instruments Preview */}
      <section className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Instrumentos Vocacionales Incluidos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Cada prueba dispone de ficha técnica, fundamentación y espacio asignado para reactivos.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tests')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-800"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOCATIONAL_INSTRUMENTS.slice(0, 3).map((inst) => (
            <div
              key={inst.id}
              onClick={() => onNavigate('tests', inst.id)}
              className="bg-white p-5 rounded-2xl border border-slate-200/70 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {inst.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {inst.estimatedDuration}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                {inst.name}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {inst.description}
              </p>
              <div className="pt-2 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                <span>Ver ficha e instrucciones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
