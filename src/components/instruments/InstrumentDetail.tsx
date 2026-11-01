import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Target, 
  FileCheck2, 
  HelpCircle, 
  Layers, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Save,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { VocationalInstrument } from '../../types/vocational';

interface InstrumentDetailProps {
  instrument: VocationalInstrument;
  onBack: () => void;
  onOpenChatWithContext: (contextPrompt: string) => void;
}

export const InstrumentDetail: React.FC<InstrumentDetailProps> = ({ 
  instrument, 
  onBack,
  onOpenChatWithContext
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ficha' | 'instrucciones' | 'desarrollo'>('desarrollo');
  
  // State for user/professor custom official items testing
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [newItemInput, setNewItemInput] = useState('');
  const [showItemUploader, setShowItemUploader] = useState(false);

  const handleAddOfficialItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemInput.trim()) return;
    setCustomItems([...customItems, newItemInput.trim()]);
    setNewItemInput('');
  };

  const handleClearCustomItems = () => {
    setCustomItems([]);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al catálogo de instrumentos</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenChatWithContext(`Actúa como docente de Orientación Vocacional y Profesional. Explícame en detalle la fundamentación metodológica y las precauciones pedagógicas para la aplicación del instrumento "${instrument.name}" (${instrument.academicAuthor}).`)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200/80 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Consultar sobre este test en OrientIA</span>
          </button>
        </div>
      </div>

      {/* Main Header / Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {instrument.category}
          </span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            Siglas: {instrument.shortName}
          </span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Página individual del instrumento</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {instrument.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          {instrument.description}
        </p>

        {/* Quick Specs Badges */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <Users className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Autoría Académica</span>
              <span className="font-semibold">{instrument.academicAuthor}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Duración Estimada</span>
              <span className="font-semibold">{instrument.estimatedDuration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Población Objetivo</span>
              <span className="font-semibold truncate block">{instrument.targetAudience}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs gap-1">
        <button
          onClick={() => setActiveSubTab('desarrollo')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'desarrollo'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Espacio para Desarrollar el Instrumento</span>
        </button>

        <button
          onClick={() => setActiveSubTab('instrucciones')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'instrucciones'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Instrucciones de Aplicación</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ficha')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'ficha'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ficha Técnica y Objetivos</span>
        </button>
      </div>

      {/* Tab Content 1: ESPACIO PARA DESARROLLAR EL INSTRUMENTO */}
      {activeSubTab === 'desarrollo' && (
        <div className="space-y-6">
          {/* Official Academic Notice */}
          <div className="bg-gradient-to-br from-indigo-50/90 to-blue-50/90 border border-indigo-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">
                  Espacio de Desarrollo de {instrument.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Este espacio está preparado y estructurado para recibir y ejecutar los reactivos oficiales de la cátedra de <strong>Orientación Vocacional y Profesional</strong>. En apego a la consigna académica, <strong>no se han inventado preguntas, opciones ni respuestas simuladas</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-indigo-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Estructura de reactivos</span>
                <span className="font-semibold text-slate-900">{instrument.itemFormatDescription}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Reactivos esperados según manual</span>
                <span className="font-semibold text-slate-900">{instrument.itemCountExpected} ítems estandarizados</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Modalidad de administración</span>
                <span className="font-semibold text-slate-900">{instrument.applicationMode}</span>
              </div>
            </div>
          </div>

          {/* Instrument Execution Canvas (Ready state) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Cuestionario / Protocolo de Aplicación</span>
                  <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {customItems.length > 0 ? `${customItems.length} reactivos cargados` : 'A la espera de reactivos oficiales'}
                  </span>
                </h4>
                <p className="text-xs text-slate-500">
                  Los ítems proporcionados por el docente se renderizan en este módulo interactivo.
                </p>
              </div>

              <button
                onClick={() => setShowItemUploader(!showItemUploader)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{showItemUploader ? 'Ocultar ingestor' : 'Ingresar reactivos oficiales'}</span>
              </button>
            </div>

            {/* Optional Ingestor Box for Professor/Student */}
            {showItemUploader && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Carga de Reactivos Oficiales de la Cátedra
                    </h5>
                    <p className="text-xs text-slate-600">
                      Puedes agregar aquí los ítems reales provistos por tu docente o guardarlos en <code>src/data/instruments.ts</code>.
                    </p>
                  </div>
                  {customItems.length > 0 && (
                    <button
                      onClick={handleClearCustomItems}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Limpiar reactivos
                    </button>
                  )}
                </div>

                <form onSubmit={handleAddOfficialItem} className="flex gap-2">
                  <input
                    type="text"
                    value={newItemInput}
                    onChange={(e) => setNewItemInput(e.target.value)}
                    placeholder="Escribe o pega aquí el enunciado del reactivo oficial..."
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shrink-0"
                  >
                    Agregar reactivo
                  </button>
                </form>
              </div>
            )}

            {/* If custom items are loaded by the user, show them in live interactive form */}
            {customItems.length > 0 ? (
              <div className="space-y-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Reactivos oficiales ingresados para {instrument.shortName}:
                </p>
                <div className="space-y-4">
                  {customItems.map((item, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed pt-0.5">
                          {item}
                        </p>
                      </div>

                      {/* Scale selection according to itemFormatDescription */}
                      <div className="pl-10 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                        {['1 - Muy en desacuerdo', '2 - En desacuerdo', '3 - Neutral / Indiferente', '4 - De acuerdo', '5 - Totalmente de acuerdo'].map((opt, i) => (
                          <label key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-indigo-300 cursor-pointer">
                            <input type="radio" name={`item-${index}`} className="text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-[11px] font-medium truncate">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-xs">
                    Registrar respuestas de reactivos
                  </button>
                </div>
              </div>
            ) : (
              /* Ready State Slot Presentation */
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 bg-slate-50/50">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <FileSpreadsheet className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h5 className="text-base font-bold text-slate-800">
                    Módulo de Reactivos Oficiales Preparado
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Este panel desplegará la batería completa de {instrument.itemCountExpected ?? 'los'} reactivos de <strong>{instrument.name}</strong> en cuanto la cátedra proporcione el listado oficial de preguntas e ítems autorizados.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShowItemUploader(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-all shadow-2xs"
                  >
                    <PlusCircle className="w-4 h-4 text-indigo-600" />
                    <span>Cargar reactivos oficiales ahora</span>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('instrucciones')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-all"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Revisar pautas e instrucciones</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 2: INSTRUCCIONES DE APLICACIÓN */}
      {activeSubTab === 'instrucciones' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instrucciones para el Orientador */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Pautas para el Pedagogo / Orientador
                </h3>
                <p className="text-xs text-slate-500">
                  Rol profesional y condiciones del encuadre
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {instrument.applicatorInstructions.map((inst, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consignas para el Estudiante / Orientado */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Consignas para el Orientado
                </h3>
                <p className="text-xs text-slate-500">
                  Indicaciones previas al desarrollo del instrumento
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {instrument.studentInstructions.map((inst, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab Content 3: FICHA TÉCNICA Y OBJETIVOS */}
      {activeSubTab === 'ficha' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              Ficha Técnica Curricular
            </h3>
            <p className="text-xs text-slate-500">
              Datos psicopedagógicos de identificación y fundamentación teórica
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Nombre Completo</span>
              <span className="font-bold text-slate-900 text-sm">{instrument.name}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Marco Teórico</span>
              <span className="font-semibold text-slate-800">{instrument.theoreticalFramework}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Autor / Referencia</span>
              <span className="font-semibold text-slate-800">{instrument.academicAuthor}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Población Destinataria</span>
              <span className="font-semibold text-slate-800">{instrument.targetAudience}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Objetivos de la Aplicación en Orientación
            </h4>
            <div className="space-y-2">
              {instrument.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
