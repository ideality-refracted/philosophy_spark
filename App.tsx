import React, { useState } from 'react';
import { Button } from './components/Button';
import { InsightCard } from './components/InsightCard';
import { generateSparks } from './services/geminiService';
import { SparkResponse } from './types';

function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<SparkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSpark = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      const result = await generateSparks(input);
      setInsights(result);
    } catch (err) {
      setError("The muse is silent right now. Please check your connection or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSpark();
    }
  };

  return (
    <div className="min-h-screen bg-spark-dark text-slate-100 flex flex-col font-sans selection:bg-spark-gold/30">
      {/* Header */}
      <header className="py-6 border-b border-slate-800 bg-spark-dark/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-spark-gold rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
              <svg className="w-5 h-5 text-spark-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-white">
              Philosophy Spark
            </h1>
          </div>
          <nav>
            <a href="#" onClick={(e) => { e.preventDefault(); setInsights(null); setInput(''); }} className="text-sm font-medium text-slate-400 hover:text-spark-gold transition-colors">
              New Spark
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6 max-w-2xl mx-auto w-full">
        
        {/* Intro Text - Only show if no insights yet */}
        {!insights && !isLoading && (
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Examined Life
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              "The unexamined life is not worth living." <br/>
              <span className="text-sm mt-2 block">— Socrates</span>
            </p>
          </div>
        )}

        {/* Input Area */}
        <div className={`w-full transition-all duration-500 ease-in-out ${insights ? 'mb-8' : 'mb-0'}`}>
          <div className="bg-slate-800/80 rounded-2xl p-4 shadow-xl border border-slate-700 focus-within:border-spark-gold/50 focus-within:ring-1 focus-within:ring-spark-gold/50 transition-all relative overflow-hidden group">
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind? Describe a situation, a feeling, or a question..."
              className="w-full bg-transparent border-none text-lg text-slate-100 placeholder-slate-500 focus:ring-0 resize-none min-h-[120px]"
              disabled={isLoading}
            />
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50">
              <span className="text-xs text-slate-500 font-medium px-2">
                {input.length > 0 ? `${input.length} chars` : 'Share your thought'}
              </span>
              <Button onClick={handleSpark} isLoading={isLoading} disabled={!input.trim()}>
                Spark Insight
              </Button>
            </div>

            {/* Subtle glow effect in background */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-spark-gold/5 rounded-full blur-3xl pointer-events-none group-focus-within:bg-spark-gold/10 transition-colors"></div>
          </div>
          
          {!insights && !isLoading && (
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-800/50">
                  <div className="text-2xl mb-2">🤔</div>
                  <h3 className="font-serif font-bold text-slate-300">Question</h3>
                  <p className="text-xs text-slate-500 mt-1">Struggling with a moral dilemma?</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-800/50">
                  <div className="text-2xl mb-2">🌪️</div>
                  <h3 className="font-serif font-bold text-slate-300">Chaos</h3>
                  <p className="text-xs text-slate-500 mt-1">Feeling overwhelmed by modern life?</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-800/50">
                  <div className="text-2xl mb-2">💡</div>
                  <h3 className="font-serif font-bold text-slate-300">Wonder</h3>
                  <p className="text-xs text-slate-500 mt-1">Curious about the nature of reality?</p>
                </div>
             </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-center mb-8 animate-fade-in">
            {error}
          </div>
        )}

        {/* Results Feed */}
        {insights && (
          <div className="w-full space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px bg-slate-700 flex-grow"></div>
               <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Philosophical Perspectives</span>
               <div className="h-px bg-slate-700 flex-grow"></div>
            </div>
            
            {insights.map((concept, idx) => (
              <InsightCard key={idx} concept={concept} index={idx} />
            ))}

            <div className="text-center mt-12">
               <p className="text-slate-500 text-sm mb-4">Want to explore another angle?</p>
               <Button variant="secondary" onClick={() => { setInsights(null); setInput(''); window.scrollTo({top:0, behavior:'smooth'}); }}>
                 Clear & Start New
               </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;