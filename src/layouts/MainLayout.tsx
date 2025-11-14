import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '@/components'

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
