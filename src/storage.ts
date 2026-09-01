import type { Pin } from './types'

const STORAGE_KEY = 'patch-pocket-pins'

export const loadPins = (): Pin[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const savePins = (pins: Pin[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pins))
}
