import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  ShieldCheck, 
  Lightbulb, 
  GraduationCap
} from 'lucide-react';
import { ChatMessage } from '../../types/vocational';
import { MarkdownContent } from './MarkdownContent';

// Backend base URL: uses Render deployment in production, relative path in local development
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://orientia-web.onrender.com' : '');

const OFFICIAL_WELCOME_MESSAGE = `¡Hola! Soy OrientIA, tu asistente académico para la asignatura Orientación Vocacional y Profesional de Ciencias de la Educación de la UAGRM.

Puedo ayudarte a comprender los instrumentos de orientación vocacional, sus fundamentos teóricos, sus procedimientos de aplicación y los contenidos de la asignatura.

Puedes preguntarme sobre cualquiera de los seis instrumentos disponibles o consultar un tema de orientación vocacional.

¿Qué tema te gustaría estudiar hoy?`;

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
      content: OFFICIAL_WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'orientia-educational-engine',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [, setServerStatus] = useState<{ online: boolean; gemini: boolean }>({
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
    fetch(`${API_BASE_URL}/api/health`)
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
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
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
        content: `No se pudo conectar con el servidor de OrientIA en este momento (${err.message}). Por favor verifica la conexión o vuelve a intentar en unos instantes.`,
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
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: OFFICIAL_WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'orientia-educational-engine',
      },
    ]);
  };

  const suggestedQuestions = [
    '¿Cuáles son las 8 subpruebas que componen la batería DAT?',
    '¿Qué diferencia existe entre el OTIS Superior y una prueba de intereses como el IPP?',
    '¿Cómo se clasifican los 4 temperamentos según David Keirsey?',
    '¿Qué áreas explora el Test de Hábitos de Estudio en la universidad?',
  ];

  const getSourceDisplay = (source?: string) => {
    switch (source) {
      case 'gemini-3.8-flash':
        return {
          label: 'Modelo Gemini 3.8 Flash (Procesamiento IA)',
          isLiveAI: true,
        };
      case 'orientia-educational-engine':
        return {
          label: 'Servidor Educativo OrientIA (Base de Conocimiento de Cátedra)',
          isLiveAI: false,
        };
      case 'system':
        return {
          label: 'Aviso del Sistema OrientIA',
          isLiveAI: false,
        };
      default:
        return {
          label: 'Servidor Educativo OrientIA',
          isLiveAI: false,
        };
    }
  };

  return (
    <div className="space-y-6 py-4 sm:py-6">
      {/* Chat Section Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-[#023273]">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Chatbot OrientIA
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-[#023273] px-2.5 py-0.5 rounded-full border border-slate-200">
              UAGRM
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
              <GraduationCap className="w-3.5 h-3.5 text-[#023273]" />
              Ciencias de la Educación
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Asistente pedagógico para consultas teóricas, análisis de los 6 instrumentos y contenidos curriculares de Orientación Vocacional y Profesional.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#023273] bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
            title="Reiniciar conversación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar conversación</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[650px] max-h-[75vh]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/60">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const sourceInfo = !isUser && message.source ? getSourceDisplay(message.source) : null;

            return (
              <div
                key={message.id}
                className={`flex gap-3 sm:gap-4 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs font-bold text-xs ${
                    isUser
                      ? 'bg-[#023273] text-white ring-2 ring-blue-900/10'
                      : 'bg-slate-900 text-white ring-2 ring-slate-900/10'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Body */}
                <div className={`space-y-1.5 max-w-[85%] sm:max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 px-1 text-[11px] text-slate-500 font-medium ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-slate-700">{isUser ? 'Estudiante UAGRM' : 'OrientIA'}</span>
                    {!isUser && (
                      <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                        Cátedra
                      </span>
                    )}
                    <span>·</span>
                    <span>{message.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-[#023273] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs space-y-2'
                    }`}
                  >
                    <MarkdownContent content={message.content} isUser={isUser} />

                    {sourceInfo && (
                      <div className="pt-2.5 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                        <span className="font-medium">
                          Fuente: <span className="text-slate-600">{sourceInfo.label}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Entorno Académico UAGRM</span>
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
              <div className="w-9 h-9 rounded-2xl bg-[#023273] text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-xs shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#023273] animate-spin" />
                  <span>OrientIA está procesando la consulta pedagógica...</span>
                </div>
                <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#023273] rounded-full w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-600" />
              <span>Sugerencias:</span>
            </span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInputPrompt(q)}
                className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-[#023273] border border-slate-200 whitespace-nowrap text-xs transition-colors shrink-0 cursor-pointer shadow-2xs font-medium"
              >
                {q}
              </button>
            ))}
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
            placeholder="Escribe tu consulta pedagógica sobre los 6 instrumentos o la asignatura..."
            rows={1}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023273]/20 focus:border-[#023273] text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none max-h-32 bg-slate-50/50"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              !inputPrompt.trim() || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#023273] hover:bg-[#012250] text-white shadow-md shadow-[#023273]/20 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Enviar mensaje a OrientIA"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
