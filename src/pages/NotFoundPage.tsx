import { Link } from 'react-router-dom'
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-cyan w-[350px] h-[350px] -top-28 -left-28 animate-float opacity-25" />
      <div className="orb orb-violet w-[300px] h-[300px] -bottom-20 -right-20 animate-float-delayed opacity-20" />

      <div className="text-center max-w-md relative z-10">
        {/* Giant 404 */}
        <div className="relative">
          <span className="text-[10rem] sm:text-[12rem] font-display font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-br from-cyan-500/30 to-violet-500/30 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center backdrop-blur-sm animate-float">
              <AlertTriangle className="h-10 w-10 text-muted" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-heading mt-6 mb-3">
          Page Not Found
        </h1>
        <p className="text-body mb-8">
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
            className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl border border-theme-border text-heading hover:bg-theme-card-hover transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
