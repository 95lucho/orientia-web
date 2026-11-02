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
  FileSpreadsheet,
  FileText,
  Building2,
  Check,
  Download,
  ExternalLink
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
  const [activeSubTab, setActiveSubTab] = useState<'conoce' | 'aplica' | 'estructura'>('conoce');

  return (
    <div className="space-y-7 py-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#023273] hover:underline transition-all w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al catálogo de instrumentos</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {instrument.pdfPath && (
            <a
              href={instrument.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#023273] hover:bg-[#012250] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={instrument.pdfButtonLabel || 'Descargar instrumento PDF'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{instrument.pdfButtonLabel || 'Descargar instrumento PDF'}</span>
            </a>
          )}

          {instrument.id === 'habitos-estudio' && (
            <a
              href="./tests/habitos-estudio.html"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#023273] text-xs font-bold transition-all border border-slate-300 shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Abrir página HTML independiente</span>
            </a>
          )}

          <button
            onClick={() => onOpenChatWithContext(`Actúa como docente de la asignatura Orientación Vocacional y Profesional de la carrera Ciencias de la Educación en la UAGRM. Explícame en detalle la fundamentación teórica, características y precauciones para la administración del instrumento "${instrument.name}" (${instrument.academicAuthor}).`)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#023273] text-xs font-bold transition-all border border-slate-300 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#023273]" />
            <span>Consultar sobre este test en OrientIA</span>
          </button>
        </div>
      </div>

      {/* Main Header Card UAGRM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#023273] bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            {instrument.category}
          </span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            Siglas: {instrument.shortName}
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            UAGRM · Ciencias de la Educación
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {instrument.name}
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl">
          {instrument.description}
        </p>

        {/* Quick Specs Badges */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <Users className="w-4 h-4 text-[#023273] shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Autoría</span>
              <span className="font-semibold text-slate-800">{instrument.academicAuthor}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <Clock className="w-4 h-4 text-[#023273] shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duración</span>
              <span className="font-semibold text-slate-800">{instrument.estimatedDuration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <Layers className="w-4 h-4 text-[#023273] shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Población</span>
              <span className="font-semibold text-slate-800 truncate block">{instrument.targetAudience}</span>
            </div>
          </div>
        </div>

        {/* Specific Banner for DAT */}
        {instrument.id === 'dat-aptitudes' && (
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 sm:p-5 text-xs text-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#023273]">
              <Layers className="w-4 h-4 text-[#023273]" />
              <span>Batería Multifactorial Integrada por 8 Pruebas</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              <strong>Aviso de la cátedra:</strong> Los ocho cuadernillos de preguntas forman parte del texto físico de avance de la docente. Actualmente no se dispone de versión digital de dichos cuadernillos. La cátedra cuenta formalmente con la <strong>hoja de respuestas estandarizada</strong> y los <strong>dos baremos normativos de interpretación (masculino y femenino)</strong>. OrientIA no inventa preguntas, puntuaciones ni criterios de interpretación.
            </p>
          </div>
        )}
      </div>

      {/* Dedicated PDF Document Card */}
      {instrument.pdfPath && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-base sm:text-lg text-slate-900">
                    {instrument.id === 'dat-aptitudes' 
                      ? 'Material Completo del DAT (Cuadernillos, Respuestas y Baremos)'
                      : `Documento Oficial en PDF · ${instrument.shortName}`}
                  </h2>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200">
                    PDF Oficial
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Documento pedagógico de consulta y aplicación para Orientación Vocacional y Profesional (UAGRM)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={instrument.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#023273] hover:bg-[#012250] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{instrument.pdfButtonLabel || 'Descargar instrumento PDF'}</span>
              </a>

              <a
                href={instrument.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all border border-slate-300 cursor-pointer"
              >
                <span>Consultar en el navegador</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-2.5">
            <p className="leading-relaxed">
              {instrument.pdfDescription}
            </p>

            {instrument.id === 'dat-aptitudes' ? (
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Precisiones del documento para la práctica pedagógica:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900">
                  El archivo PDF reúne el material disponible de la batería DAT: protocolo general, <strong>hoja de respuestas estandarizada</strong> y los <strong>baremos de corrección e interpretación normativos (masculino y femenino)</strong>. OrientIA no aplica corrección algorítmica ni baremos ficticios; la valoración debe realizarse siguiendo el procedimiento manual estandarizado explicado por la cátedra.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <span className="font-semibold text-slate-600">Ruta oficial del archivo:</span>
                <code className="bg-slate-100 px-2 py-0.5 rounded text-[#023273] font-mono text-[11px] border border-slate-200">
                  {instrument.pdfPath}
                </code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('conoce')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'conoce'
              ? 'bg-[#023273] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>A. Conoce el instrumento</span>
        </button>

        <button
          onClick={() => setActiveSubTab('aplica')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'aplica'
              ? 'bg-[#023273] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>B. Aprende cómo se aplica</span>
        </button>

        <button
          onClick={() => setActiveSubTab('estructura')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'estructura'
              ? 'bg-[#023273] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>C. Estructura y demostración</span>
        </button>
      </div>

      {/* Tab 1: CONOCE EL INSTRUMENTO */}
      {activeSubTab === 'conoce' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Fundamentación y Ficha Técnica
              </h3>
              <p className="text-xs text-slate-500">
                Identificación académica del instrumento para la asignatura
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Nombre Completo</span>
                <span className="font-bold text-slate-900 text-sm">{instrument.name}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Marco Teórico</span>
                <span className="font-semibold text-slate-800">{instrument.theoreticalFramework}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Autor / Referencia Documentada</span>
                <span className="font-semibold text-slate-800">{instrument.academicAuthor}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Población Destinataria</span>
                <span className="font-semibold text-slate-800">{instrument.targetAudience}</span>
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Objetivos del Instrumento en la Orientación Vocacional
              </h4>
              <div className="space-y-2">
                {instrument.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <Check className="w-4 h-4 text-[#023273] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* If DAT, display the 8 subtests list */}
            {instrument.subtests && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    Las 8 Pruebas Integradas de la Batería DAT
                  </h4>
                  <span className="text-xs font-bold text-[#023273] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    8 Cuadernillos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {instrument.subtests.map((sub, i) => (
                    <div key={sub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          {i + 1}. {sub.name}
                        </span>
                        <span className="text-[10px] font-bold bg-[#023273] text-white px-2 py-0.5 rounded-sm">
                          {sub.shortCode}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#023273] font-medium">
                        Área: {sub.evaluationArea}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: APRENDE CÓMO SE APLICA */}
      {activeSubTab === 'aplica' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instrucciones para el Orientador */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#023273] flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-[#023273]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Instrucciones para el Educador / Orientador
                </h3>
                <p className="text-xs text-slate-500">
                  Procedimiento de administración y rol pedagógico
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {instrument.applicatorInstructions.map((inst, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#023273] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consignas para el Estudiante / Orientado */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#023273] flex items-center justify-center font-bold">
                <Target className="w-5 h-5 text-[#023273]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Consignas para el Estudiante / Orientado
                </h3>
                <p className="text-xs text-slate-500">
                  Pautas sobre cómo responder y completar el instrumento
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {instrument.studentInstructions.map((inst, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#023273] shrink-0 mt-0.5" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Formato de respuesta:</span>
              <p>{instrument.itemFormatDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ESTRUCTURA Y DEMOSTRACIÓN */}
      {activeSubTab === 'estructura' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#023273] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-[#023273]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Estructura de la Prueba y Espacio de Demostración
              </h3>
              <p className="text-xs text-slate-500">
                Familiarización con el formato de {instrument.shortName}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
            <p>
              <strong>Estado de la demostración interactiva:</strong> De acuerdo con la planificación por fases, las demostraciones interactivas fieles se integrarán en la <strong>Fase 4</strong>, una vez revisados los ejemplos demostrativos oficiales de cada instrumento.
            </p>
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 text-xs">
              <span className="font-bold text-[#023273] block uppercase text-[10px]">Especificación técnica del instrumento:</span>
              <p>• Formato esperado: <strong>{instrument.itemFormatDescription}</strong></p>
              <p>• Modalidad de administración: <strong>{instrument.applicationMode}</strong></p>
              <p>• Duración estimada: <strong>{instrument.estimatedDuration}</strong></p>
              {instrument.materialNotes && (
                <p className="text-[#023273] font-medium pt-1">• {instrument.materialNotes}</p>
              )}
            </div>
          </div>

          {/* Context consultation shortcut */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#023273] font-medium">
              ¿Tienes dudas sobre los fundamentos teóricos o cómo se administra {instrument.shortName}?
            </span>
            <button
              onClick={() => onOpenChatWithContext(`Hola OrientIA, quisiera que me expliques con mayor profundidad el marco teórico y la forma de aplicación de "${instrument.name}" para la cátedra de Orientación Vocacional y Profesional.`)}
              className="px-4 py-2 rounded-xl bg-[#023273] hover:bg-[#012250] text-white font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Consultar a OrientIA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
