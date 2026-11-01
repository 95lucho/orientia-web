export type NavigationTab = 'inicio' | 'tests' | 'chatbot';

export interface VocationalInstrument {
  id: string;
  name: string;
  shortName: string;
  category: 'Intereses' | 'Aptitudes' | 'Madurez Vocacional' | 'Valores Ocupacionales' | 'Autoeficacia';
  academicAuthor: string;
  theoreticalFramework: string;
  targetAudience: string;
  estimatedDuration: string;
  applicationMode: string;
  description: string;
  objectives: string[];
  applicatorInstructions: string[];
  studentInstructions: string[];
  // Status of the instrument items
  status: 'pending_items' | 'ready';
  itemCountExpected?: number;
  itemFormatDescription: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'orientia-educational-engine' | 'system';
  promptQualityFeedback?: {
    clarityScore: number; // 0-100
    hasRole: boolean;
    hasContext: boolean;
    hasGoal: boolean;
    hasConstraints: boolean;
    suggestions: string[];
  };
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Diseño de Intervención' | 'Casos de Estudio' | 'Análisis de Instrumentos' | 'Dilemas Vocacionales';
  description: string;
  promptText: string;
  targetCompetency: string;
}
