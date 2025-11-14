import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import {
  HomePage,
  AboutPage,
  ListeningPage,
  ReadingPage,
  WritingPage,
  SpeakingPage,
  PracticePage,
  ContactPage,
} from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
