import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  ShieldCheck, 
  Lightbulb, 
  GraduationCap, 
  Layers, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { ChatMessage } from '../../types/vocational';
import { PromptCompetencyModal } from './PromptCompetencyModal';

interface ChatbotSectionProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({ 
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `¡Hola! Soy **OrientIA**, tu asistente pedagógico de inteligencia artificial para la asignatura **Orientación Vocacional y Profesional** en Ciencias de la Educación.

Puedo ayudarte con:
1. **Fundamentos teóricos:** Modelos de desarrollo vocacional (Holland RIASEC, Donald Super, autoeficacia de Betz, enfoques socioeducativos).
2. **Rol del pedagogo orientador:** Diseño de secuencias de orientación, entrevistas reflexivas y proyectos de vida.
3. **Metodología de instrumentos:** Criterios formativos para aplicar inventarios de intereses y escalas vocacionales.
4. **Competencias de Prompting:** Cómo formular instrucciones efectivas a la IA para tus prácticas formativas.

¿En qué temática deseas profundizar hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'orientia-educational-engine',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState<{ online: boolean; gemini: boolean }>({
    online: true,
    gemini: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If an external initial prompt is passed (e.g. from an instrument page)
  useEffect(() => {
    if (initialPrompt) {
      setInputPrompt(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  // Check health and server-side config on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setServerStatus({
          online: data.status === 'online',
          gemini: Boolean(data.geminiConfigured),
        });
      })
      .catch(() => {
        setServerStatus({ online: false, gemini: false });
      });
  }, []);

  // Evaluate prompt quality in real time for Prompt Engineering competency
  const evaluatePrompt = (text: string) => {
    const lower = text.toLowerCase();
    const hasRole = /act[uú]a como|como docente|orientador|pedagogo|asesor|tutor|especialista/.test(lower);
    const hasContext = /estudiantes|alumnos|secundaria|bachillerato|universidad|jóvenes|contexto|escuela|gabinete/.test(lower);
    const hasGoal = /diseña|explica|analiza|prop[oó]n|elabora|compara|desarrolla|guía|secuencia/.test(lower);
    const hasConstraints = /holland|super|kuder|crites|teoría|enfoque|no emitir|tabla|pasos|formato|ético|criterios/.test(lower);

    let score = 0;
    if (hasRole) score += 25;
    if (hasContext) score += 25;
    if (hasGoal) score += 25;
    if (hasConstraints) score += 25;

    return { score, hasRole, hasContext, hasGoal, hasConstraints };
  };

  const currentEvaluation = evaluatePrompt(inputPrompt);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          promptEvaluation: currentEvaluation,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'No se obtuvo respuesta del asistente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error fetching chat response:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `No se pudo conectar con el servidor de OrientIA en este momento (${err.message}). Por favor verifica la conexión o vuelve a intentar.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'system',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Conversación reiniciada. ¿Qué tema o duda sobre orientación vocacional deseas consultar?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'orientia-educational-engine',
      },
    ]);
  };

  const suggestedQuestions = [
    '¿Cómo abordar la indecisión vocacional en estudiantes de último año de secundaria?',
    'Diferencia entre el enfoque psicométrico tradicional y el enfoque de proyecto de vida.',
    '¿Qué precauciones éticas debe considerar el pedagogo al aplicar instrumentos vocacionales?',
    'Explícame la relación entre autoeficacia vocacional y rendimiento académico.',
  ];

  return (
    <div className="space-y-6 py-6">
      {/* Chat Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-teal-50 text-teal-700">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Chatbot OrientIA
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200/60">
              {serverStatus.gemini ? 'Gemini 3.8 Flash' : 'Motor Pedagógico Activo'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Asistente conversacional para consultas teóricas, dilemas de orientación vocacional y perfeccionamiento de competencias en formulación de instrucciones a la IA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200/70 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Taller de Prompts</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reiniciar conversación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-[650px] max-h-[75vh]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/40">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 sm:gap-4 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-teal-700 text-teal-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Body */}
                <div className={`space-y-1.5 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400 font-medium">
                    <span>{isUser ? 'Estudiante' : 'OrientIA'}</span>
                    <span>·</span>
                    <span>{message.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs space-y-2'
                    }`}
                  >
                    {/* Render plain / formatted text */}
                    <div className="whitespace-pre-wrap font-sans">
                      {message.content}
                    </div>

                    {!isUser && message.source && (
                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Fuente: {message.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash (Servidor)' : 'Servidor OrientIA'}</span>
                        <span className="flex items-center gap-1 text-teal-600 font-semibold">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Conexión Segura</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-9 h-9 rounded-2xl bg-indigo-900 text-teal-300 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-xs shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                  <span>OrientIA está procesando la consulta pedagógica...</span>
                </div>
                <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2.5 bg-slate-100/70 border-t border-slate-200/70 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Sugerencias:</span>
            </span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInputPrompt(q)}
                className="px-3 py-1 rounded-full bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200/80 whitespace-nowrap text-xs transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Prompt Competency Assistant / Real-time Feedback */}
        {inputPrompt.length > 10 && (
          <div className="px-4 py-2 bg-indigo-50/80 border-t border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-indigo-900">
            <div className="flex items-center gap-2">
              <span className="font-bold">Calidad de Formulación (Prompt):</span>
              <div className="w-20 bg-indigo-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    currentEvaluation.score >= 75
                      ? 'bg-emerald-500'
                      : currentEvaluation.score >= 50
                      ? 'bg-amber-500'
                      : 'bg-indigo-400'
                  }`}
                  style={{ width: `${currentEvaluation.score}%` }}
                />
              </div>
              <span className="font-bold">{currentEvaluation.score}%</span>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              <span className={currentEvaluation.hasRole ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                ✓ Rol
              </span>
              <span className={currentEvaluation.hasContext ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                ✓ Contexto
              </span>
              <span className={currentEvaluation.hasGoal ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                ✓ Tarea
              </span>
              <span className={currentEvaluation.hasConstraints ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                ✓ Restricciones
              </span>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 sm:gap-3">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Formula tu pregunta pedagógica o consulta sobre orientación vocacional..."
            rows={1}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none max-h-32 bg-slate-50/50"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              !inputPrompt.trim() || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Enviar mensaje a OrientIA"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Prompt Competency Guide Modal */}
      <PromptCompetencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPrompt={(text) => setInputPrompt(text)}
      />
    </div>
  );
};
