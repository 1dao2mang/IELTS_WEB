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
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b border-border py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Reading</h1>
          <p className="text-muted-foreground text-lg mb-4">
            {readingExercises.length} exercises available
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Strengthen your reading comprehension with academic and general training passages. Practice every question type found on the real IELTS exam.
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
              <div className="text-center py-12 text-muted-foreground font-medium animate-pulse">Loading reading tests...</div>
            ) : readingExercises.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="w-full card card-clickable group flex items-center justify-between p-6 text-left"
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

