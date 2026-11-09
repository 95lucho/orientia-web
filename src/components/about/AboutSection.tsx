import React from 'react';
import { ArrowRight, Building2, Compass, GraduationCap } from 'lucide-react';
import teacherPortrait from '../../assets/credits/docente.webp';
import developerPortrait from '../../assets/credits/desarrollador.webp';
import { NavigationTab } from '../../types/vocational';

interface AboutSectionProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Header Institucional */}
      <div className="bg-[#023273] rounded-3xl p-7 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-900">
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs border border-white/20">
            <Building2 className="w-3.5 h-3.5 text-slate-200" />
            <span>Información Institucional y Académica</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Acerca de OrientIA
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
            Conoce el origen, el marco institucional de la UAGRM y el equipo detrás de la concepción y desarrollo de esta herramienta pedagógica.
          </p>
        </div>
      </div>

      {/* Presentación Oficial de la Aplicación */}
      <section className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#023273] font-bold">
            <Compass className="w-5 h-5 text-[#023273]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
              Propósito Académico
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Presentación de OrientIA
            </h2>
          </div>
        </div>

        <blockquote className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-l-4 border-[#023273] text-slate-800 text-sm sm:text-base leading-relaxed italic">
          «OrientIA es una aplicación web de apoyo académico diseñada para acompañar el aprendizaje de los estudiantes de la asignatura Orientación Vocacional y Profesional, mediante recursos informativos sobre instrumentos de orientación vocacional y un chatbot de consulta académica».
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          La plataforma ha sido concebida como un entorno digital complementario para los futuros licenciados en <strong>Ciencias de la Educación</strong>, facilitando la familiarización con las pruebas psicopedagógicas, el análisis crítico de la toma de decisiones vocacionales y la construcción de proyectos de vida, sin reemplazar el diagnóstico psicométrico formal ni las sesiones presenciales de cátedra.
        </p>
      </section>

      {/* Marco Institucional UAGRM */}
      <section className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <GraduationCap className="w-5 h-5 text-[#023273]" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Filiación Institucional
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Universidad</span>
            <span className="font-bold text-slate-900 text-sm">UAGRM</span>
            <p className="text-[11px] text-slate-600">Universidad Autónoma Gabriel René Moreno</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Facultad</span>
            <span className="font-bold text-slate-900 text-sm">Facultad de Humanidades</span>
            <p className="text-[11px] text-slate-600">Sede Santa Cruz de la Sierra, Bolivia</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Carrera</span>
            <span className="font-bold text-slate-900 text-sm">Ciencias de la Educación</span>
            <p className="text-[11px] text-slate-600">Formación docente y pedagógica</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Asignatura</span>
            <span className="font-bold text-slate-900 text-sm">Orientación Vocacional</span>
            <p className="text-[11px] text-slate-600">Orientación Vocacional y Profesional</p>
          </div>
        </div>
      </section>

      {/* Créditos Oficiales y Autoría Diferenciada */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Créditos y Responsabilidad del Proyecto
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Diferenciación formal entre la referencia académica de la asignatura y el desarrollo técnico de la plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta 1: Docente de referencia académica */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  Referencia Académica
                </span>
              </div>

              <img
                src={teacherPortrait}
                alt="Lic. Delia Claudia Jaldín Arroyo"
                width={128}
                height={128}
                className="h-32 w-32 rounded-2xl border border-slate-200 object-cover object-top"
              />

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Lic. Delia Claudia Jaldín Arroyo
                </h3>
                <p className="text-xs text-[#023273] font-semibold">
                  Catedrática de Orientación Vocacional y Profesional
                </p>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  Referente académica de la asignatura, cuya orientación contribuye a mantener la coherencia curricular, la pertinencia pedagógica y la fundamentación conceptual de los contenidos educativos presentados en OrientIA.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Creador y Desarrollador */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  Creación y desarrollo tecnológico
                </h3>
              </div>

              <img
                src={developerPortrait}
                alt="Luis Enrique Justiniano Mercado"
                width={128}
                height={128}
                className="h-32 w-32 rounded-2xl border border-slate-200 object-cover object-top"
              />

              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-slate-900">
                  Luis Enrique Justiniano Mercado
                </h4>
                <p className="text-xs text-[#023273] font-semibold">
                  Creador de OrientIA
                </p>
                <p className="text-xs text-slate-600">
                  Estudiante de Ciencias de la Educación – UAGRM.
                </p>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  Responsable de la concepción, diseño y desarrollo tecnológico de OrientIA, incluyendo la arquitectura de la aplicación web, programación de sus funcionalidades, diseño de interfaces y experiencia de usuario, así como la integración de herramientas de inteligencia artificial aplicadas al ámbito educativo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accesos rápidos de regreso */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('inicio')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#023273] font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
        >
          <span>← Volver al Inicio</span>
        </button>

        <button
          onClick={() => onNavigate('tests')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#023273] hover:bg-[#012250] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
        >
          <span>Ir al Catálogo de Instrumentos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
