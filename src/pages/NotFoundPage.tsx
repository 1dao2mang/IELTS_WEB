import { Link } from 'react-router-dom'
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Giant 404 */}
        <div className="relative">
          <span className="text-[10rem] sm:text-[12rem] font-display font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-br from-cyan-500/30 to-violet-500/30 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center backdrop-blur-sm">
              <AlertTriangle className="h-10 w-10 text-gray-400" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-6 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="btn-gradient inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
