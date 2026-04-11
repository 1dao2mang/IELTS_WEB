import { Outlet } from 'react-router-dom'
import { Navbar, Footer, ScrollToTop } from '@/components'

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="orb-cyan w-96 h-96 -top-48 -left-48 opacity-30 fixed" />
      <div className="orb-violet w-80 h-80 top-1/3 -right-40 opacity-20 fixed" />
      <div className="orb-blue w-72 h-72 bottom-0 left-1/4 opacity-15 fixed" />

      <ScrollToTop />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
