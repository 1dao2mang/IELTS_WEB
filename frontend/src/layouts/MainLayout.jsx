import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Ambient Lighting Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb orb-cyan w-[400px] h-[400px] -top-32 -left-32 opacity-30 animate-float" />
        <div className="orb orb-violet w-[500px] h-[500px] top-[20%] right-[-10%] opacity-20 animate-float-delayed" />
        <div className="orb orb-amber w-[300px] h-[300px] bottom-[-5%] left-[20%] opacity-20 animate-float-slow" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar className="nav-glass sticky top-0" />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
