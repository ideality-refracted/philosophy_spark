import React from 'react';
import { PhilosophyConcept } from '../types';

interface InsightCardProps {
  concept: PhilosophyConcept;
  index: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({ concept, index }) => {
  const delayClass = `delay-${index * 200}`; // Staggered animation
  
  // Construct search URLs
  const sepUrl = `https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(concept.sepTerm)}`;
  const iepUrl = `https://iep.utm.edu/?s=${encodeURIComponent(concept.iepTerm)}`;
  const crashCourseUrl = `https://www.youtube.com/results?search_query=crash+course+philosophy+${encodeURIComponent(concept.crashCourseTopic)}`;

  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-4 animate-fade-in ${delayClass} hover:border-spark-gold/30 transition-colors`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-serif text-spark-gold font-bold">{concept.name}</h3>
          <p className="text-sm text-slate-400 font-sans italic">{concept.philosopherOrSchool}</p>
        </div>
        <span className="text-5xl opacity-10 select-none">❝</span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">The Concept</h4>
        <p className="text-slate-200 font-sans leading-relaxed">{concept.coreIdea}</p>
      </div>

      <div className="mb-6 p-4 bg-indigo-900/20 rounded-lg border-l-2 border-spark-gold">
        <h4 className="text-xs uppercase tracking-widest text-spark-gold font-bold mb-1">Your Spark</h4>
        <p className="text-slate-300 font-sans">{concept.applicationToLife}</p>
      </div>

      <div className="border-t border-slate-700 pt-4">
        <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Dig Deeper (Canon Resources)</h4>
        <div className="flex flex-wrap gap-2">
          <ResourceLink href={sepUrl} label="Stanford Encyclopedia" />
          <ResourceLink href={iepUrl} label="Internet Encyclopedia" />
          <ResourceLink href={crashCourseUrl} label="Crash Course" icon="play" />
        </div>
      </div>
    </div>
  );
};

const ResourceLink: React.FC<{ href: string; label: string; icon?: string }> = ({ href, label, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-xs text-slate-300 rounded-md transition-colors border border-slate-700"
  >
    {icon === 'play' && (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    )}
    {label}
    {icon !== 'play' && (
      <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    )}
  </a>
);