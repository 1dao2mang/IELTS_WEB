import { useState, useEffect } from 'react';
import { MessageCircle, Clock, ChevronRight, Lightbulb, Mic } from 'lucide-react';
import { useTestStore } from '@/store';
import { ExerciseView } from '../components/ExerciseView';

const tips = [
  { icon: Mic, text: 'Record yourself and listen back for improvements.' },
  { icon: Clock, text: 'Part 2: Use 1 minute to plan, speak for 2 minutes.' },
  { icon: Lightbulb, text: 'Extend answers naturally — don\'t give one-word replies.' },
];

export const SpeakingPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { exercises, isLoading, fetchTests } = useTestStore();

  useEffect(() => {
    fetchTests('speaking');
  }, [fetchTests]);

  const speakingExercises = exercises.speaking || [];

  return (
    <div className="min-h-screen bg-transparent relative z-10 w-full animate-fade-in-up">
      {/* ─── Hero ─────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 shadow-inner flex items-center justify-center mx-auto mb-8">
            <MessageCircle className="h-10 w-10 text-amber-500 drop-shadow-sm" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            IELTS <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">Speaking</span>
          </h1>
          <p className="text-muted-foreground text-xl mb-4 font-medium">
            {speakingExercises.length} topics available
          </p>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-lg">
            Practice Speaking Parts 1, 2, and 3. Record yourself and receive feedback on pronunciation, fluency, grammar, and vocabulary.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* ─── Tips ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="card bg-white dark:bg-slate-800 flex items-start space-x-4 p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <tip.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed pt-1">{tip.text}</p>
            </div>
          ))}
        </div>

        {/* ─── Exercise List ───────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Exercises</h2>
          <div className="space-y-4">
            {isLoading.speaking ? (
              <div className="text-center py-12 text-amber-500 font-medium animate-pulse">Loading speaking topics...</div>
            ) : speakingExercises.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="w-full glass-panel group flex items-center justify-between p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-medium animate-fade-in-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="flex items-center space-x-5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {ex.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{ex.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 shrink-0 ml-4">
                  <span className="hidden sm:inline text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-muted-foreground border border-border">
                    {ex.difficulty}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedExercise && (
        <ExerciseView
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};

