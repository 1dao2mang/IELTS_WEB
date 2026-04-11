import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ScrollToTop } from '@/components/ScrollToTop'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuthStore, useProgressStore } from '@/store'

// Lazy-load all pages for better initial bundle size
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ListeningPage = lazy(() =>
  import('@/pages/ListeningPage').then(m => ({ default: m.ListeningPage }))
)
const ReadingPage = lazy(() =>
  import('@/pages/ReadingPage').then(m => ({ default: m.ReadingPage }))
)
const WritingPage = lazy(() =>
  import('@/pages/WritingPage').then(m => ({ default: m.WritingPage }))
)
const SpeakingPage = lazy(() =>
  import('@/pages/SpeakingPage').then(m => ({ default: m.SpeakingPage }))
)
const PracticePage = lazy(() =>
  import('@/pages/PracticePage').then(m => ({ default: m.PracticePage }))
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then(m => ({ default: m.ContactPage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
)
const ProgressPage = lazy(() =>
  import('@/pages/ProgressPage').then(m => ({ default: m.ProgressPage }))
)

function App() {
  const { fetchUser } = useAuthStore()
  const { syncWithBackend } = useProgressStore()

  useEffect(() => {
    fetchUser().then(() => {
      // Once user fetch attempt finishes (real or mock), try to sync progress
      syncWithBackend()
    })
  }, [fetchUser, syncWithBackend])

  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App
