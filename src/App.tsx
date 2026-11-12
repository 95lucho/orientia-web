import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeSection } from './components/home/HomeSection';
import { InstrumentsCatalog } from './components/instruments/InstrumentsCatalog';
import { InstrumentDetail } from './components/instruments/InstrumentDetail';
import { ChatbotSection } from './components/chat/ChatbotSection';
import { AboutSection } from './components/about/AboutSection';
import { NavigationTab, VocationalInstrument } from './types/vocational';
import { VOCATIONAL_INSTRUMENTS } from './data/instruments';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'tests' || tab === 'chatbot' || tab === 'acerca') {
        return tab;
      }
    }
    return 'inicio';
  });
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string | null>(null);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | null>(null);

  const selectedInstrument: VocationalInstrument | undefined = selectedInstrumentId
    ? VOCATIONAL_INSTRUMENTS.find((inst) => inst.id === selectedInstrumentId)
    : undefined;

  const handleNavigate = (tab: NavigationTab, instrumentId?: string) => {
    setActiveTab(tab);
    if (tab === 'tests') {
      setSelectedInstrumentId(instrumentId || null);
    } else {
      setSelectedInstrumentId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInstrument = (instrumentId: string) => {
    setSelectedInstrumentId(instrumentId);
    setActiveTab('tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedInstrumentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatWithContext = (contextPrompt: string) => {
    setInitialChatPrompt(contextPrompt);
    setActiveTab('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 flex flex-col font-sans selection:bg-[#023273] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        hasActiveInstrument={Boolean(selectedInstrumentId)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'inicio' && (
          <HomeSection onNavigate={handleNavigate} />
        )}

        {activeTab === 'tests' && !selectedInstrument && (
          <InstrumentsCatalog onSelectInstrument={handleSelectInstrument} />
        )}

        {activeTab === 'tests' && selectedInstrument && (
          <InstrumentDetail
            instrument={selectedInstrument}
            onBack={handleBackToCatalog}
            onOpenChatWithContext={handleOpenChatWithContext}
          />
        )}

        {activeTab === 'chatbot' && (
          <ChatbotSection
            initialPrompt={initialChatPrompt || undefined}
            onClearInitialPrompt={() => setInitialChatPrompt(null)}
          />
        )}

        {activeTab === 'acerca' && (
          <AboutSection onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Academic Footer */}
      <Footer onSelectTab={(tab) => handleNavigate(tab)} />
    </div>
  );
}
