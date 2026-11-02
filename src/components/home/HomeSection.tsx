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
  Layers,
  Building2,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab } from '../../types/vocational';
import { VOCATIONAL_INSTRUMENTS } from '../../data/instruments';

interface HomeSectionProps {
  onNavigate: (tab: NavigationTab, instrumentId?: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-14 py-6">
      {/* Hero Section with UAGRM Brand Identity */}
      <section className="relative overflow-hidden rounded-3xl bg-[#023273] text-white p-7 sm:p-12 lg:p-14 shadow-xl border border-blue-900">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#C8102E]/15 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold">
            <Building2 className="w-4 h-4 text-slate-200" />
            <span>Universidad Autónoma Gabriel René Moreno · Ciencias de la Educación</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Orient<span className="text-white">IA</span> · Apoyo Académico en Orientación Vocacional y Profesional
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Bienvenido al espacio digital de apoyo formativo diseñado para los estudiantes de la carrera de <strong>Ciencias de la Educación</strong> de la <strong>UAGRM</strong>. Aquí podrás conocer a fondo los <strong>seis instrumentos vocacionales</strong> de la cátedra, comprender su fundamentación teórica, aprender cómo se aplican y resolver tus dudas pedagógicas con el asistente inteligente.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('tests')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#023273] font-bold text-sm sm:text-base shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#023273]" />
              <span>Explorar los 6 instrumentos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('chatbot')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#012250] hover:bg-[#011b40] border border-blue-400/40 text-white font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-200" />
              <span>Consultar al Chatbot OrientIA</span>
            </button>
          </div>

          {/* Academic Highlights */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-blue-800/80 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
              <span>6 Instrumentos Oficiales de la Cátedra</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
              <span>Batería DAT con 8 subpruebas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
              <span>Enfoque formativo no diagnóstico</span>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose of OrientIA */}
      <section className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-2xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Finalidad Académica
            </span>
            <span className="text-xs text-slate-400 font-medium">UAGRM · Santa Cruz</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Una Herramienta de Mediación Pedagógica
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            OrientIA es una herramienta de apoyo al aprendizaje para los futuros educadores. No es un sistema de diagnóstico psicológico ni una plataforma de evaluación psicométrica automatizada. Su objetivo es enriquecer el proceso formativo de la asignatura:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#023273] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Aprender Fundamentos y Aplicación
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprender qué evalúa cada instrumento, quiénes son sus autores, cuál es su marco teórico y cómo debe administrarlos el pedagogo orientador.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#023273] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Demostración y Familiarización
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experimentar de primera mano cómo se responden los tipos de reactivos de cada prueba antes de consultar los materiales físicos y documentos completos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#023273] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Tutoría Asistida con OrientIA
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consultar dudas conceptuales sobre los 6 instrumentos, dilemas vocacionales de aula y contenidos teóricos y metodológicos de la asignatura.
            </p>
          </div>
        </div>
      </section>

      {/* The 6 Instruments Overview Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Los 6 Instrumentos Vocacionales de la Cátedra
              </h2>
              <span className="text-[11px] font-bold bg-[#C8102E] text-white px-2 py-0.5 rounded-full">
                UAGRM
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Accede a la ficha técnica, fundamentación teórica, pautas de aplicación y detalles de cada prueba.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tests')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#023273] hover:underline w-fit"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VOCATIONAL_INSTRUMENTS.map((inst, index) => (
            <div
              key={inst.id}
              onClick={() => onNavigate('tests', inst.id)}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-[#023273] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {inst.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    #{index + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#023273] transition-colors leading-snug">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    {inst.academicAuthor}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {inst.description}
                </p>

                {inst.id === 'dat-aptitudes' && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-[#023273] font-medium">
                    Batería integrada por 8 subpruebas independientes
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#023273]">
                <span>Conocer instrumento</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notice regarding DAT & physical text */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#023273] text-white flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            Compromiso Ético y Rigor Académico en Ciencias de la Educación
          </h4>
          <p>
            OrientIA respeta la integridad de los instrumentos psicopedagógicos de la cátedra. No reproduce reactivos no autorizados ni inventa baremos ni diagnósticos automatizados. La batería DAT, cuyos cuadernillos se estudian en el texto físico de la docente, cuenta en la plataforma con su estructura analítica y las pautas de uso de su hoja de respuestas con baremos diferenciados masculino y femenino.
          </p>
        </div>
      </section>

      {/* Sección Institucional y Créditos UAGRM */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
            Filiación Académica & Créditos
          </span>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            OrientIA · Universidad Autónoma Gabriel René Moreno (UAGRM)
          </h4>
          <p className="text-xs text-slate-500">
            Referencia académica: <strong className="text-slate-800">Lic. Delia Claudia Jaldín Arroyo</strong> · Creador y desarrollador: <strong className="text-slate-800">Luis Enrique Justiniano Mercado</strong>
          </p>
        </div>

        <button
          onClick={() => onNavigate('acerca')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#023273] text-[#023273] hover:text-white font-bold text-xs transition-colors shrink-0 border border-slate-200 cursor-pointer"
        >
          <span>Conocer más acerca de OrientIA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
