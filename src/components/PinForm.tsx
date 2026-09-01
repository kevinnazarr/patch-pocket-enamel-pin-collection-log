import type { Pin, ColorTag } from '../types'
import { useState } from 'react'

interface PinFormProps {
  pin?: Pin
  onSave: (pin: Pin) => void
  onCancel: () => void
}

const colorOptions: ColorTag[] = ['gold', 'silver', 'rainbow', 'pastel', 'dark']

export default function PinForm({ pin, onSave, onCancel }: PinFormProps) {
  const [name, setName] = useState(pin?.name || '')
  const [description, setDescription] = useState(pin?.description || '')
  const [artistOrSeries, setArtistOrSeries] = useState(pin?.artistOrSeries || '')
  const [colorTag, setColorTag] = useState<ColorTag>(pin?.colorTag || 'gold')
  const [status, setStatus] = useState<'display' | 'storage'>(pin?.status || 'display')
  const [isWishlist, setIsWishlist] = useState(pin?.isWishlist || false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Pin name is required')
      return
    }
    if (!colorTag) {
      setError('Color tag is required')
      return
    }

    onSave({
      id: pin?.id || Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      artistOrSeries: artistOrSeries.trim(),
      colorTag,
      status: isWishlist ? 'display' : status,
      isWishlist
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0', color: '#1a1a1a' }}>
          {pin ? 'Edit Pin' : 'Add Pin'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#1a1a1a' }}>
              Pin Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              placeholder="e.g., Retro Cat Badge"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#1a1a1a' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional description"
              rows={3}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#1a1a1a' }}>
              Artist or Series
            </label>
            <input
              type="text"
              value={artistOrSeries}
              onChange={e => setArtistOrSeries(e.target.value)}
              placeholder="e.g., Retro Cats Co."
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#1a1a1a' }}>
              Color Tag *
            </label>
            <select
              value={colorTag}
              onChange={e => setColorTag(e.target.value as ColorTag)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            >
              {colorOptions.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1a1a1a', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isWishlist}
                onChange={e => setIsWishlist(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span>This is a wishlist item (I don't own it yet)</span>
            </label>
          </div>

          {!isWishlist && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#1a1a1a' }}>
                Status
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="status"
                    value="display"
                    checked={status === 'display'}
                    onChange={() => setStatus('display')}
                    style={{ cursor: 'pointer' }}
                  />
                  On Display
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="status"
                    value="storage"
                    checked={status === 'storage'}
                    onChange={() => setStatus('storage')}
                    style={{ cursor: 'pointer' }}
                  />
                  In Storage
                </label>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#ff6b35',
                color: 'white',
                border: '2px solid #ff6b35',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.boxShadow = 'none'
              }}
            >
              {pin ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = '#f5f5f5'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'white'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
