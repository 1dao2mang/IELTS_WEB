

export const accent = {
  listening: { gradient: 'from-blue-500 to-cyan-400', ring: 'ring-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  reading:   { gradient: 'from-emerald-500 to-teal-400', ring: 'ring-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  writing:   { gradient: 'from-violet-500 to-purple-400', ring: 'ring-violet-500/40', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  speaking:  { gradient: 'from-amber-500 to-orange-400', ring: 'ring-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-500/10' },
}

export const fmtTime = (s) => 
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
