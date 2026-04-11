import { Link } from 'react-router-dom';
import { Star, Apple, PlayCircle, Shield, Zap, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const skills = [
  { label: 'Listening', path: '/listening', desc: 'Mock Tests with authentic British/Australian accents.', icon: PlayCircle },
  { label: 'Reading', path: '/reading', desc: 'True/False/Not Given & full passages from past papers.', icon: Shield },
  { label: 'Writing', path: '/writing', desc: 'AI-graded Task 1 & 2 with instant band score predict.', icon: TrendingUp },
  { label: 'Speaking', path: '/speaking', desc: 'Record yourself and get pronunciation feedback.', icon: Zap },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      
      {/* ─── 1. Hero Section (Cinematic Entrance) ────────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            
            {/* Glowing Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 text-foreground px-5 py-2 rounded-full mb-8 shadow-soft">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-sm font-bold tracking-wide">IELTS WEB PLATFORM 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8">
              Master IELTS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-purple-500 drop-shadow-sm">
                Anytime, Anywhere.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the actual computer-delivered IELTS exam environment. Earn your target band with instant AI scoring.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/practice" className="btn-gradient w-full sm:w-auto flex items-center justify-center space-x-3 text-lg px-10 py-5">
                <span>Start Free Practice</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-80">
              <div className="flex items-center space-x-3 bg-white/40 dark:bg-black/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <div className="text-sm font-bold border-l border-border pl-3">4.9/5 Average Rating</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Mockup Layout (Glassmorphism) */}
          <div className="mt-20 relative max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-white/40 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
              {/* Fake UI mockup placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-slate-100/90 dark:from-slate-900/90 dark:to-[#050508]/90 backdrop-blur-2xl flex flex-col">
                <div className="h-14 border-b border-white/20 dark:border-white/5 flex items-center px-6 space-x-3 bg-white/20 dark:bg-black/20">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-inner"></div>
                </div>
                <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
                   <div className="text-center space-y-4">
                     <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-md mb-6">
                       <PlayCircle className="w-10 h-10 text-primary" />
                     </div>
                     <h3 className="text-3xl font-bold text-foreground">Interactive Mock Test System</h3>
                     <p className="text-muted-foreground text-lg">Your dashboard goes here</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Features / Skills Area (Bento Grid) ────────────────── */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Four Skills in One App</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to confidently achieve your target band.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Link 
                key={index} 
                to={skill.path} 
                className="glass-panel group p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-inner flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <skill.icon className="w-8 h-8 text-primary drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{skill.label}</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  {skill.desc}
                </p>
                <div className="text-primary font-bold flex items-center text-sm uppercase tracking-wider">
                  Practice Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Social Proof / Reviews ────────────────── */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-foreground mb-20 animate-fade-in-up">Loved by Test Takers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, idx) => (
              <div 
                key={item} 
                className="glass-panel p-10 animate-fade-in-up"
                style={{ animationDelay: `${0.2 * idx}s` }}
              >
                <div className="flex text-amber-500 mb-6 space-x-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current filter drop-shadow-sm" />)}
                </div>
                <p className="text-foreground text-lg italic mb-8 leading-relaxed font-medium">
                  "This platform exactly mimics the computer-delivered IELTS. The AI writing feedback is incredibly accurate. I jumped from 6.0 to 7.5 in just a month!"
                </p>
                <div className="flex items-center space-x-4 border-t border-border/50 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-md">
                    JD
                  </div>
                  <div>
                     <p className="text-base font-bold text-foreground">Jane Doe</p>
                     <p className="text-sm text-primary font-semibold">Overall Band 8.0</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Final CTA ─────────────────────────────── */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-primary/20 bg-gradient-to-br from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 p-12 md:p-20 text-center animate-fade-in-up">
            <h2 className="text-5xl font-black mb-8 text-foreground drop-shadow-sm">Ready to ace your IELTS?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of global students. The app is completely free. Start your first ultimate mock test today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link to="/practice" className="btn-gradient text-lg px-12 py-5 shadow-2xl">
                 Let's Begin Now
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
