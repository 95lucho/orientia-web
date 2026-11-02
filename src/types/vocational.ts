export type NavigationTab = 'inicio' | 'tests' | 'chatbot' | 'acerca';

export type InstrumentCategory = 
  | 'Intereses Vocacionales'
  | 'Inteligencia General'
  | 'Temperamento y Personalidad'
  | 'Hábitos y Técnicas de Estudio'
  | 'Intereses Profesionales'
  | 'Batería de Aptitudes Diferenciales';

export interface DATSubtest {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  evaluationArea: string;
}

export interface VocationalInstrument {
  id: string;
  name: string;
  shortName: string;
  category: InstrumentCategory;
  academicAuthor: string;
  theoreticalFramework: string;
  targetAudience: string;
  estimatedDuration: string;
  applicationMode: string;
  description: string;
  pdfPath?: string;
pdfButtonLabel?: string;
pdfDescription?: string;
  objectives: string[];
  applicatorInstructions: string[];
  studentInstructions: string[];
  status: 'pending_items' | 'ready';
  itemCountExpected?: number | string;
  itemFormatDescription: string;
  // Specific notes regarding physical and digital materials
  materialNotes?: string;
  hasPhysicalBooklets?: boolean;
  hasAnswerSheetAndNorms?: boolean;
  // Specific for batteries like DAT
  subtests?: DATSubtest[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'orientia-educational-engine' | 'system';
}
