import { Link } from 'react-router-dom';
import { Star, Apple, PlayCircle, Shield, Zap, TrendingUp, ArrowRight, Download } from 'lucide-react';

const skills = [
  { label: 'Listening', path: '/listening', desc: 'Mock Tests with authentic British/Australian accents.', icon: PlayCircle },
  { label: 'Reading', path: '/reading', desc: 'True/False/Not Given & full passages from past papers.', icon: Shield },
  { label: 'Writing', path: '/writing', desc: 'AI-graded Task 1 & 2 with instant band score predict.', icon: TrendingUp },
  { label: 'Speaking', path: '/speaking', desc: 'Record yourself and get pronunciation feedback.', icon: Zap },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* ─── 1. Hero Section ────────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Rating Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9/5 from 10k+ Students</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Master IELTS.<br />
              <span className="text-primary">Anytime, Anywhere.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              The ultimate web platform simulating the real computer-delivered IELTS exam. Get instant AI band scores and detailed feedback.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/practice" className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Start Learning Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-4">
              {/* Fake App Store badges for trust */}
              <button className="flex items-center space-x-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight opacity-80">Download on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </button>
              <button className="flex items-center space-x-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <PlayCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight opacity-80">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Dashboard Mockup Layout */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-xl shadow-2xl overflow-hidden border border-border bg-white dark:bg-slate-800 flex items-center justify-center">
              {/* Fake UI mockup placeholder */}
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 border-8 border-white dark:border-slate-800 rounded-xl flex flex-col">
                <div className="h-12 border-b border-border flex items-center px-4 space-x-2 bg-white dark:bg-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 p-8 text-center text-muted-foreground flex items-center justify-center">
                   Interactive IELTS Mock Test Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Features / Skills Area ────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Four Skills in One App</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to confidently achieve your target band.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Link key={index} to={skill.path} className="card card-clickable group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <skill.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{skill.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {skill.desc}
                </p>
                <div className="text-primary font-semibold flex items-center text-sm">
                  Practice Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Social Proof / Reviews ────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">Loved by Test Takers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card bg-white dark:bg-slate-800">
                <div className="flex text-amber-500 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground text-base italic mb-6">
                  "This platform exactly mimics the computer-delivered IELTS. The AI writing feedback is incredibly accurate. I jumped from 6.0 to 7.5 in just a month!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-muted-foreground">
                    JD
                  </div>
                  <div>
                     <p className="text-sm font-bold text-foreground">Jane Doe</p>
                     <p className="text-xs text-muted-foreground">Overall Band 8.0</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Final CTA ─────────────────────────────── */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to ace your IELTS?</h2>
          <p className="text-lg text-primary-50 opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of global students. The app is free to try. Start your first mock test today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/practice" className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg">
               Take a Free Test
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

