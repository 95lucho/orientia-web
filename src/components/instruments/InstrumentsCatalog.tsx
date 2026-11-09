import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Clock, 
  UserCheck, 
  Layers, 
  FileText, 
  Info, 
  CheckCircle2, 
  Brain,
  Compass,
  Heart,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { VOCATIONAL_INSTRUMENTS } from '../../data/instruments';
import { VocationalInstrument } from '../../types/vocational';
import { resolveAssetUrl } from '../../utils/assetPaths';

interface InstrumentsCatalogProps {
  onSelectInstrument: (instrumentId: string) => void;
}

export const InstrumentsCatalog: React.FC<InstrumentsCatalogProps> = ({ onSelectInstrument }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Instrumentos (6)' },
    { id: 'Intereses Vocacionales', label: 'Intereses Vocacionales' },
    { id: 'Inteligencia General', label: 'Inteligencia General' },
    { id: 'Temperamento y Personalidad', label: 'Temperamento' },
    { id: 'Hábitos y Técnicas de Estudio', label: 'Hábitos de Estudio' },
    { id: 'Intereses Profesionales', label: 'Intereses Profesionales (IPP)' },
    { id: 'Batería de Aptitudes Diferenciales', label: 'Aptitudes (DAT)' },
  ];

  // Helper icon for each instrument
  const getInstrumentIcon = (id: string) => {
    switch (id) {
      case 'intereses-ocupacionales':
        return <Briefcase className="w-5 h-5 text-[#023273]" />;
      case 'otis-superior':
        return <Brain className="w-5 h-5 text-[#023273]" />;
      case 'keirsey-temperamento':
        return <Heart className="w-5 h-5 text-[#023273]" />;
      case 'habitos-estudio':
        return <GraduationCap className="w-5 h-5 text-[#023273]" />;
      case 'ipp-intereses':
        return <Compass className="w-5 h-5 text-[#023273]" />;
      case 'dat-aptitudes':
        return <Layers className="w-5 h-5 text-[#023273]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#023273]" />;
    }
  };

  const filteredInstruments = VOCATIONAL_INSTRUMENTS.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || inst.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Institutional Header UAGRM */}
      <div className="bg-[#023273] rounded-3xl p-7 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-900">
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-slate-200" />
            <span>Catálogo Curricular Oficial · UAGRM</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Catálogo de Instrumentos Vocacionales
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Explora los <strong>seis instrumentos de orientación vocacional y profesional</strong> seleccionados para la asignatura en Ciencias de la Educación. Cada prueba dispone de su ficha técnica detallada, fundamentación teórica, pautas de aplicación y espacio preparado para el desarrollo interactivo.
          </p>
        </div>
      </div>

      {/* Academic and Ethical Clarification Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-slate-800 shadow-2xs">
        <Info className="w-5 h-5 text-[#023273] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <p className="font-bold text-[#023273]">
            Rigor Metodológico y Criterio de la Cátedra:
          </p>
          <p className="text-slate-600">
            OrientIA no inventa preguntas, claves ni interpretaciones automáticas. La <strong>batería DAT</strong> se presenta integrada por sus <strong>ocho pruebas</strong>; sus cuadernillos físicos forman parte del material impreso de la docente, y se cuenta con la estructura oficial para su hoja de respuestas y baremos masculino y femenino.
          </p>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, categoría o teoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#023273]/20 focus:border-[#023273] transition-all"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#023273] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 Instruments */}
      {filteredInstruments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron instrumentos</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No hay instrumentos que coincidan con &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-[#023273] font-bold hover:underline"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument, index) => (
            <article
              key={instrument.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg hover:border-[#023273] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Header card info */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {instrument.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-400">
                      N° {VOCATIONAL_INSTRUMENTS.findIndex((i) => i.id === instrument.id) + 1}
                    </span>
                  </div>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-blue-50 transition-colors">
                    {getInstrumentIcon(instrument.id)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#023273] transition-colors leading-snug">
                      {instrument.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {instrument.description}
                </p>

                {/* Special card feature for DAT */}
                {instrument.subtests && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-[#023273] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#023273]" />
                      <span>Batería integrada (8 pruebas):</span>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      Abstracto, Verbal, Cálculo, Velocidad/Precisión, Espacial, Lenguaje, Ortografía y Mecánico.
                    </div>
                  </div>
                )}

                {/* Specs pill row */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{instrument.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#023273] font-semibold">
                    <FileText className="w-3.5 h-3.5 text-[#023273] shrink-0" />
                    <span>{instrument.pdfWarning ? 'PDF en revisión' : 'PDF disponible'}</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                {instrument.id === 'habitos-estudio' ? (
                  <a
                    href={resolveAssetUrl('/tests/habitos-estudio.html')}
                    className="text-[10px] font-bold text-[#023273] bg-blue-50 px-2 py-1 rounded-md border border-blue-200 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                    title="Abrir página HTML independiente"
                  >
                    <span>Página HTML</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-500">
                    {instrument.shortName}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  {instrument.pdfPath && (
                    <a
                      href={resolveAssetUrl(instrument.pdfPath)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 p-2 rounded-xl bg-white hover:bg-slate-100 text-[#023273] border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      title="Consultar o descargar instrumento PDF"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px]">PDF</span>
                    </a>
                  )}

                  <button
                    onClick={() => onSelectInstrument(instrument.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#023273] hover:bg-[#012250] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Conocer instrumento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
