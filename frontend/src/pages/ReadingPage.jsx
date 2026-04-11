import { useState, useEffect } from 'react';
import { BookOpen, Clock, ChevronRight, Lightbulb, ScanEye } from 'lucide-react';
import { useTestStore } from '@/store';
import { ExerciseView } from '../components/ExerciseView';

const tips = [
  { icon: ScanEye, text: 'Skim the passage first for general understanding.' },
  { icon: Clock, text: 'Spend no more than 20 minutes per passage section.' },
  { icon: Lightbulb, text: 'Underline keywords in questions before reading.' },
];

export const ReadingPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { exercises, isLoading, fetchTests } = useTestStore();

  useEffect(() => {
    fetchTests('reading');
  }, [fetchTests]);

  const readingExercises = exercises.reading || [];

  return (
    <div className="min-h-screen bg-transparent relative z-10 w-full animate-fade-in-up">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-inner flex items-center justify-center mx-auto mb-8">
            <BookOpen className="h-10 w-10 text-emerald-500 drop-shadow-sm" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            IELTS <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-600">Reading</span>
          </h1>
          <p className="text-muted-foreground text-xl mb-4 font-medium">
            Master the Reading section
          </p>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-lg">
            Practice with academic and general training reading passages. Learn to skim, scan, and identify key information quickly.
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
                {isLoading.reading ? (
                  <div className="text-sm py-4 text-emerald-600 dark:text-emerald-400 font-medium animate-pulse text-center">Loading reading exercises...</div>
                ) : readingExercises.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExercise(ex)}
                    className="w-full glass-panel group flex items-center justify-between p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-medium animate-fade-in-up"
                    style={{ animationDelay: `${0.1 * idx}s` }}
                  >
                    <div className="flex items-center space-x-5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                    <BookOpen className="h-6 w-6 text-primary" />
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

