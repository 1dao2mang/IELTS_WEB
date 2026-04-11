import { describe, it, expect } from 'vitest'
import { formatDate, formatTime, calculateScore, generateId, shuffleArray } from '../helpers'

describe('formatDate', () => {
  it('formats a Date object', () => {
    const date = new Date('2025-01-15')
    const result = formatDate(date)
    expect(result).toContain('2025')
    expect(result).toContain('January')
    expect(result).toContain('15')
  })

  it('formats a date string', () => {
    const result = formatDate('2025-06-01')
    expect(result).toContain('2025')
    expect(result).toContain('June')
  })
})

describe('formatTime', () => {
  it('formats 0 seconds', () => {
    expect(formatTime(0)).toBe('0:00')
  })

  it('formats seconds < 60', () => {
    expect(formatTime(5)).toBe('0:05')
    expect(formatTime(59)).toBe('0:59')
  })

  it('formats minutes and seconds', () => {
    expect(formatTime(90)).toBe('1:30')
    expect(formatTime(3661)).toBe('61:01')
  })
})

describe('calculateScore', () => {
  it('returns 0 when total is 0', () => {
    expect(calculateScore(0, 0)).toBe(0)
  })

  it('returns band 9 for >= 90%', () => {
    expect(calculateScore(9, 10)).toBe(9)
    expect(calculateScore(10, 10)).toBe(9)
  })

  it('returns band 5 for 50-59%', () => {
    expect(calculateScore(5, 10)).toBe(5)
  })

  it('returns band 1 for < 20%', () => {
    expect(calculateScore(1, 10)).toBe(1)
  })
})

describe('generateId', () => {
  it('returns a non-empty string', () => {
    const id = generateId()
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })
})

describe('shuffleArray', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffleArray(arr)).toHaveLength(5)
  })

  it('does not mutate original array', () => {
    const arr = [1, 2, 3]
    const copy = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(copy)
  })

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })
})
