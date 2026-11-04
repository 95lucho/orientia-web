import { useState } from 'react';
import { APPLICATION_PRACTICES } from '../../data/applicationPractice';

export function ApplicationPractice({ instrumentId }: { instrumentId: string }) {
  const practice = APPLICATION_PRACTICES[instrumentId];
  const [selected, setSelected] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState(false);
  if (!practice) return null;
  const option = selected === null ? null : practice.options[selected];

  return (
    <section aria-labelledby={`practice-${instrumentId}`} className="space-y-5 rounded-2xl border border-blue-200 bg-blue-50/40 p-4 sm:p-6">
      <div className="space-y-2">
        <h3 id={`practice-${instrumentId}`} className="font-bold text-lg text-[#023273]">Practica como aplicador</h3>
        <p className="text-sm text-slate-700">{practice.objective}</p>
        <p className="text-xs text-slate-600">Aquí eres el estudiante que aprende a administrar el instrumento. No estás respondiendo el test: la situación es didáctica, no contiene reactivos ni genera puntuaciones psicométricas.</p>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-2">1. Prepara la aplicación</h4>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          {practice.preparation.map((step) => <li key={step}>{step}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-2">2. Ensaya la explicación</h4>
        <blockquote className="border-l-4 border-blue-300 pl-3 text-sm text-slate-700">{practice.briefing}</blockquote>
      </div>
      <fieldset className="space-y-3">
        <legend className="font-semibold text-sm">3. Resuelve una situación de administración</legend>
        <p className="text-sm text-slate-700">{practice.situation}</p>
        <p className="text-sm font-medium">{practice.question}</p>
        {practice.options.map((item, index) => (
          <label key={item.text} className="flex gap-3 items-start p-3 rounded-xl border border-slate-200 bg-white cursor-pointer text-sm text-slate-700">
            <input type="radio" name={`practice-${instrumentId}`} checked={selected === index} onChange={() => { setSelected(index); setReviewed(false); }} className="mt-1 shrink-0 accent-blue-800" />
            <span>{item.text}</span>
          </label>
        ))}
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={selected === null} onClick={() => setReviewed(true)} className="px-4 py-2 rounded-xl bg-[#023273] text-white text-sm font-semibold disabled:opacity-40">Ver orientación</button>
        <button type="button" onClick={() => { setSelected(null); setReviewed(false); }} className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold">Reiniciar práctica</button>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {reviewed && option && (
          <div className="space-y-2 bg-white border border-blue-200 rounded-xl p-4 text-sm text-slate-700">
            <p className="font-semibold text-[#023273]">{option.recommended ? 'Actuación recomendada' : 'Revisa tu intervención'}</p>
            <p>{option.feedback}</p>
            <p><strong>4. Cierre de la práctica: </strong>{practice.debrief}</p>
            <p className="text-xs text-slate-500">No se guarda una calificación ni se evalúa tu perfil personal. Puedes revisar otra actuación.</p>
          </div>
        )}
      </div>
    </section>
  );
}
