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
  SlidersHorizontal 
} from 'lucide-react';
import { VOCATIONAL_INSTRUMENTS } from '../../data/instruments';
import { VocationalInstrument } from '../../types/vocational';

interface InstrumentsCatalogProps {
  onSelectInstrument: (instrumentId: string) => void;
}

export const InstrumentsCatalog: React.FC<InstrumentsCatalogProps> = ({ onSelectInstrument }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Instrumentos' },
    { id: 'Intereses', label: 'Intereses Vocacionales' },
    { id: 'Autoeficacia', label: 'Autoeficacia de Carrera' },
    { id: 'Madurez Vocacional', label: 'Madurez Vocacional' },
    { id: 'Valores Ocupacionales', label: 'Valores Laborales' },
  ];

  const filteredInstruments = VOCATIONAL_INSTRUMENTS.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.academicAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || inst.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-700/50">
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Catálogo Curricular de Instrumentos</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Instrumentos de Orientación Vocacional
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explora las pruebas e inventarios estandarizados que fundamentan la práctica pedagógica en la asignatura. 
            Cada instrumento cuenta con su espacio exclusivo de ficha técnica, instrucciones metodológicas y área estructurada para el desarrollo de reactivos oficiales.
          </p>
        </div>
      </div>

      {/* Official Guidelines Reminder */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <p className="font-semibold text-amber-950">
            Aviso Académico sobre la Administración de Reactivos:
          </p>
          <p className="text-amber-800">
            En estricto cumplimiento de los principios pedagógicos y psicométricos, <strong>OrientIA no genera preguntas ficticias ni baremos inventados</strong>. Los instrumentos presentan su estructura técnica, pautas de aplicación y el espacio preparado para la incorporación de los reactivos oficiales proporcionados por la cátedra.
          </p>
        </div>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, autor, categoría o teoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instruments Grid */}
      {filteredInstruments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No se encontraron instrumentos</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No hay instrumentos que coincidan con &ldquo;{searchQuery}&rdquo;. Intenta con otro término o selecciona otra categoría.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-indigo-600 font-semibold hover:underline"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <article
              key={instrument.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/60">
                    {instrument.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {instrument.shortName}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {instrument.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    Referencia: {instrument.academicAuthor}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {instrument.description}
                </p>

                {/* Specs pill row */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{instrument.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{instrument.itemCountExpected} reactivos est.</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Página dedicada lista</span>
                </span>
                <button
                  onClick={() => onSelectInstrument(instrument.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs group-hover:scale-105 cursor-pointer"
                >
                  <span>Abrir instrumento</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
