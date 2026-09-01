import { describe, it, expect } from 'vitest'
import { calculateSummary, filterPins } from './utils'
import type { Pin } from './types'

describe('calculateSummary', () => {
  it('should return zero counts for empty collection', () => {
    const result = calculateSummary([])
    expect(result.owned).toBe(0)
    expect(result.wishlisted).toBe(0)
    expect(result.onDisplay).toBe(0)
  })

  it('should exclude wishlist items from owned count', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: false },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true }
    ]
    const result = calculateSummary(pins)
    expect(result.owned).toBe(1)
    expect(result.wishlisted).toBe(1)
  })

  it('should count all wishlist items', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true },
      { id: '3', name: 'Pin3', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: false }
    ]
    const result = calculateSummary(pins)
    expect(result.wishlisted).toBe(2)
  })

  it('should exclude wishlist items from on-display count', () => {
    const pins: Pin[] = [
      { id: '1', name: 'Pin1', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: false },
      { id: '2', name: 'Pin2', description: '', artistOrSeries: '', colorTag: 'gold', status: 'display', isWishlist: true },
      { id: '3', name: 'Pin3', description: '', artistOrSeries: '', colorTag: 'gold', status: 'storage', isWishlist: false }
    ]
    const result = calculateSummary(pins)
    expect(result.onDisplay).toBe(1)
  })
})

describe('filterPins', () => {
  const testPins: Pin[] = [
    { id: '1', name: 'Golden Cat', description: 'A golden cat pin', artistOrSeries: 'Artist A', colorTag: 'gold', status: 'display', isWishlist: false },
    { id: '2', name: 'Silver Star', description: 'A silver star pin', artistOrSeries: 'Artist B', colorTag: 'silver', status: 'storage', isWishlist: false },
    { id: '3', name: 'Rainbow Badge', description: 'A rainbow badge', artistOrSeries: 'Artist A', colorTag: 'rainbow', status: 'display', isWishlist: true },
    { id: '4', name: 'Pastel Dream', description: 'A pastel dream pin', artistOrSeries: 'Artist C', colorTag: 'pastel', status: 'storage', isWishlist: false }
  ]

  it('should search by name case-insensitive', () => {
    const result = filterPins(testPins, 'golden', 'all', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Golden Cat')
  })

  it('should search by artist case-insensitive', () => {
    const result = filterPins(testPins, 'artist a', 'all', 'all')
    expect(result).toHaveLength(2)
  })

  it('should handle partial name matching', () => {
    const result = filterPins(testPins, 'star', 'all', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Silver Star')
  })

  it('should trim whitespace from search', () => {
    const result = filterPins(testPins, '  golden  ', 'all', 'all')
    expect(result).toHaveLength(1)
  })

  it('should filter by gold color', () => {
    const result = filterPins(testPins, '', 'gold', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].colorTag).toBe('gold')
  })

  it('should filter by silver color', () => {
    const result = filterPins(testPins, '', 'silver', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].colorTag).toBe('silver')
  })

  it('should filter by rainbow color', () => {
    const result = filterPins(testPins, '', 'rainbow', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].colorTag).toBe('rainbow')
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

  it('should combine search and color filter with AND logic', () => {
    const result = filterPins(testPins, 'artist a', 'gold', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Golden Cat')
  })

  it('should combine search and status filter with AND logic', () => {
    const result = filterPins(testPins, 'artist a', 'all', 'owned')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Golden Cat')
  })

  it('should combine all filters with AND logic', () => {
    const result = filterPins(testPins, 'artist', 'gold', 'display')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Golden Cat')
  })

  it('should return empty array when no matches', () => {
    const result = filterPins(testPins, 'nonexistent', 'all', 'all')
    expect(result).toHaveLength(0)
  })

  it('should return all pins when filters are all', () => {
    const result = filterPins(testPins, '', 'all', 'all')
    expect(result).toHaveLength(4)
  })
})
