import { Outlet } from 'react-router-dom';
import { Navbar, Footer, ScrollToTop } from '@/components';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow relative z-10 pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

