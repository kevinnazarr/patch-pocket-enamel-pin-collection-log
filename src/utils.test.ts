import { describe, it, expect } from 'vitest'
import { calculateSummary, filterPins } from './utils'
import type { Pin } from './types'

describe('calculateSummary', () => {
  it('should calculate owned count excluding wishlist', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: false },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'silver', status: 'storage', isWishlist: false },
      { id: '3', name: 'Pin3', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true }
    ]
    const summary = calculateSummary(pins)
    expect(summary.owned).toBe(2)
    expect(summary.wishlisted).toBe(1)
  })

  it('should calculate on-display count excluding wishlist', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: false },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'silver', status: 'storage', isWishlist: false },
      { id: '3', name: 'Pin3', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true }
    ]
    const summary = calculateSummary(pins)
    expect(summary.onDisplay).toBe(1)
  })

  it('should handle empty collection', () => {
    const pins: Pin[] = []
    const summary = calculateSummary(pins)
    expect(summary.owned).toBe(0)
    expect(summary.wishlisted).toBe(0)
    expect(summary.onDisplay).toBe(0)
  })

  it('should handle all wishlist pins', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'silver', status: 'display', isWishlist: true }
    ]
    const summary = calculateSummary(pins)
    expect(summary.owned).toBe(0)
    expect(summary.wishlisted).toBe(2)
    expect(summary.onDisplay).toBe(0)
  })
})

describe('filterPins', () => {
  const testPins: Pin[] = [
    { id: '1', name: 'Gold Cat', description: 'A golden cat', artistOrSeries: 'Miller Studio', colorTag: 'gold', status: 'display', isWishlist: false },
    { id: '2', name: 'Silver Star', description: 'A silver star', artistOrSeries: 'Star Co', colorTag: 'silver', status: 'storage', isWishlist: false },
    { id: '3', name: 'Rainbow Dream', description: 'Colorful pin', artistOrSeries: 'Dream Arts', colorTag: 'rainbow', status: 'display', isWishlist: true },
    { id: '4', name: 'Pastel Moon', description: 'Soft moon', artistOrSeries: 'Pastel Collective', colorTag: 'pastel', status: 'storage', isWishlist: false }
  ]

  it('should filter by search name case-insensitive', () => {
    const result = filterPins(testPins, 'gold', 'all', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Cat')
  })

  it('should filter by search artist case-insensitive', () => {
    const result = filterPins(testPins, 'miller', 'all', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Cat')
  })

  it('should filter by color tag', () => {
    const result = filterPins(testPins, '', 'silver', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].colorTag).toBe('silver')
  })

  it('should filter by owned status', () => {
    const result = filterPins(testPins, '', 'all', 'owned')
    expect(result).toHaveLength(3)
    expect(result.every(p => !p.isWishlist)).toBe(true)
  })

  it('should filter by wishlist status', () => {
    const result = filterPins(testPins, '', 'all', 'wishlist')
    expect(result).toHaveLength(1)
    expect(result[0].isWishlist).toBe(true)
  })

  it('should filter by display status', () => {
    const result = filterPins(testPins, '', 'all', 'display')
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('display')
    expect(result[0].isWishlist).toBe(false)
  })

  it('should filter by storage status', () => {
    const result = filterPins(testPins, '', 'all', 'storage')
    expect(result).toHaveLength(2)
    expect(result.every(p => p.status === 'storage' && !p.isWishlist)).toBe(true)
  })

  it('should combine search and color filter', () => {
    const result = filterPins(testPins, 'miller', 'gold', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Cat')
  })

  it('should combine color and status filter', () => {
    const result = filterPins(testPins, '', 'silver', 'storage')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Silver Star')
  })

  it('should handle no matches', () => {
    const result = filterPins(testPins, 'nonexistent', 'all', 'all')
    expect(result).toHaveLength(0)
  })

  it('should return all when filters are all', () => {
    const result = filterPins(testPins, '', 'all', 'all')
    expect(result).toHaveLength(4)
  })

  it('should trim search whitespace', () => {
    const result = filterPins(testPins, '  gold  ', 'all', 'all')
    expect(result).toHaveLength(1)
  })

  it('should handle partial search match', () => {
    const result = filterPins(testPins, 'star', 'all', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Silver Star')
  })
})

describe('Filter combinations - complex scenarios', () => {
  const complexPins: Pin[] = [
    { id: '1', name: 'Gold Pin', description: '', artistOrSeries: 'Artist A', colorTag: 'gold', status: 'display', isWishlist: false },
    { id: '2', name: 'Gold Wishlist', description: '', artistOrSeries: 'Artist B', colorTag: 'gold', status: 'display', isWishlist: true },
    { id: '3', name: 'Silver Pin', description: '', artistOrSeries: 'Artist C', colorTag: 'silver', status: 'storage', isWishlist: false },
    { id: '4', name: 'Rainbow Pin', description: '', artistOrSeries: 'Artist A', colorTag: 'rainbow', status: 'display', isWishlist: false },
  ]

  it('should filter gold + owned', () => {
    const result = filterPins(complexPins, '', 'gold', 'owned')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Pin')
  })

  it('should filter gold + wishlist', () => {
    const result = filterPins(complexPins, '', 'gold', 'wishlist')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Wishlist')
  })

  it('should find by artist and color', () => {
    const result = filterPins(complexPins, 'Artist A', 'gold', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gold Pin')
  })

  it('should find by artist across colors', () => {
    const result = filterPins(complexPins, 'Artist A', 'all', 'all')
    expect(result).toHaveLength(2)
  })
})
