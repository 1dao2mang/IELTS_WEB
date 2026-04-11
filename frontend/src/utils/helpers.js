

export function formatDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function calculateScore(correct, total) {
  if (total === 0) return 0
  const percentage = (correct / total) * 100

  // IELTS band score approximation
  if (percentage >= 90) return 9
  if (percentage >= 80) return 8
  if (percentage >= 70) return 7
  if (percentage >= 60) return 6
  if (percentage >= 50) return 5
  if (percentage >= 40) return 4
  if (percentage >= 30) return 3
  if (percentage >= 20) return 2
  return 1
}

export function debounce unknown>(
  func,
  wait
): (...args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
