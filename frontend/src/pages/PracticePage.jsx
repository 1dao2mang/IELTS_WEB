import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, BookOpen, PenTool, MessageCircle, ArrowRight, Target, Clock, ChevronRight } from 'lucide-react';
import { useTestStore } from '@/store';
import { ExerciseView } from '../components/ExerciseView';

const colorClasses = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
};

export const PracticePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filter, setFilter] = useState(null);
  const { exercises, isLoading, fetchTests } = useTestStore();

  React.useEffect(() => {
    fetchTests('listening');
    fetchTests('reading');
    fetchTests('writing');
    fetchTests('speaking');
  }, [fetchTests]);

  const categories = React.useMemo(() => [
    {
      id: 'listening',
      label: 'Listening',
      icon: Headphones,
      color: 'cyan',
      exercises: exercises.listening || [],
      isLoading: isLoading.listening
    },
    {
      id: 'reading',
      label: 'Reading',
      icon: BookOpen,
      color: 'emerald',
      exercises: exercises.reading || [],
      isLoading: isLoading.reading
    },
    {
      id: 'writing',
      label: 'Writing',
      icon: PenTool,
      color: 'violet',
      exercises: exercises.writing || [],
      isLoading: isLoading.writing
    },
    {
      id: 'speaking',
      label: 'Speaking',
      icon: MessageCircle,
      color: 'amber',
      exercises: exercises.speaking || [],
      isLoading: isLoading.speaking
    },
  ], [exercises, isLoading]);

  const filteredCategories = filter
    ? categories.filter(c => c.id === filter)
    : categories;

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b border-border py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <Target className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Practice Hub</h1>
          <p className="text-muted-foreground text-lg mb-4">
            All exercises in one place
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse and practice exercises across all four IELTS skills. Filter by skill type and track your progress as you complete each one.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* ─── Filters ────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={() => setFilter(null)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors ${
              !filter
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white dark:bg-slate-800 border-border text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            All Skills
          </button>
          {categories.map(cat => {
            const c = colorClasses[cat.color];
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors flex items-center space-x-2 ${
                  filter === cat.id
                    ? `${c.bg} border-transparent ${c.text}`
                    : 'bg-white dark:bg-slate-800 border-border text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <cat.icon className="h-4 w-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Category Sections ──────────── */}
        <div className="space-y-16">
          {filteredCategories.map(cat => {
            const c = colorClasses[cat.color];
            return (
              <section key={cat.id}>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <cat.icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground leading-tight">{cat.label}</h2>
                        <span className="text-sm font-medium text-muted-foreground">{cat.exercises.length} exercises</span>
                    </div>
                  </div>
                  <Link
                    to={`/${cat.id}`}
                    className={`text-sm font-semibold ${c.text} hover:underline flex items-center space-x-1`}
                  >
                    <span>View all</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {cat.isLoading ? (
                    <div className={`text-sm py-4 ${c.text} font-medium animate-pulse text-center`}>Loading {cat.label} exercises...</div>
                  ) : cat.exercises.map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex)}
                      className="w-full card card-clickable group flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                          <cat.icon className={`h-6 w-6 ${c.text}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className={`text-lg font-bold text-foreground truncate group-hover:${c.text} transition-colors`}>
                            {ex.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{ex.duration}m</span>
                            </span>
                            <span className="text-sm font-medium text-muted-foreground px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-border">
                                {ex.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4" />
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
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

