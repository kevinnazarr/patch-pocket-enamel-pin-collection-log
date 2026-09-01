import type { Pin, ColorFilter, StatusFilter } from './types'

export const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2)

export const calculateSummary = (pins: Pin[]) => {
  const owned = pins.filter(p => !p.isWishlist).length
  const wishlisted = pins.filter(p => p.isWishlist).length
  const onDisplay = pins.filter(p => !p.isWishlist && p.status === 'display').length
  return { owned, wishlisted, onDisplay }
}

export const filterPins = (
  pins: Pin[],
  search: string,
  colorFilter: ColorFilter,
  statusFilter: StatusFilter
): Pin[] => {
  let result = pins

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.artistOrSeries.toLowerCase().includes(q)
    )
  }

  if (colorFilter !== 'all') {
    result = result.filter(p => p.colorTag === colorFilter)
  }

  if (statusFilter !== 'all') {
    if (statusFilter === 'owned') result = result.filter(p => !p.isWishlist)
    else if (statusFilter === 'wishlist') result = result.filter(p => p.isWishlist)
    else if (statusFilter === 'display') result = result.filter(p => !p.isWishlist && p.status === 'display')
    else if (statusFilter === 'storage') result = result.filter(p => !p.isWishlist && p.status === 'storage')
  }

  return result
}
