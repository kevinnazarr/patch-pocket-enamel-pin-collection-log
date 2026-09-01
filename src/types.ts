export type ColorTag = 'gold' | 'silver' | 'rainbow' | 'pastel' | 'dark'
export type PinStatus = 'display' | 'storage'

export interface Pin {
  id: string
  name: string
  description: string
  artistOrSeries: string
  colorTag: ColorTag
  status: PinStatus
  isWishlist: boolean
}

export type ColorFilter = 'all' | ColorTag
export type StatusFilter = 'all' | 'owned' | 'wishlist' | 'display' | 'storage'
