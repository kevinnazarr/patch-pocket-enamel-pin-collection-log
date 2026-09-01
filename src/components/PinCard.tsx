import type { Pin, ColorTag } from '../types'

interface PinCardProps {
  pin: Pin
  onEdit: (pin: Pin) => void
  onDelete: (id: string) => void
}

const colorMap: Record<ColorTag, string> = {
  gold: '#d4af37',
  silver: '#c0c0c0',
  rainbow: 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #0000ff, #ff00ff)',
  pastel: '#f4d6f0',
  dark: '#2a2a2a'
}

const colorLabel: Record<ColorTag, string> = {
  gold: 'Gold',
  silver: 'Silver',
  rainbow: 'Rainbow',
  pastel: 'Pastel',
  dark: 'Dark'
}

export default function PinCard({ pin, onEdit, onDelete }: PinCardProps) {
  const bgColor = colorMap[pin.colorTag]
  const isRainbow = pin.colorTag === 'rainbow'
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Delete this pin?')) {
      onDelete(pin.id)
    }
  }
  
  return (
    <article
      style={{
        borderTop: `3px solid ${isRainbow ? '#ff0000' : bgColor}`,
        background: 'white',
        border: `2px solid ${isRainbow ? '#ccc' : bgColor}`,
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
        el.style.transform = 'translateY(0)'
      }}
      onClick={() => onEdit(pin)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onEdit(pin)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px', gap: '8px' }}>
         <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#1a1a1a', flex: 1, minWidth: 0 }}>
           {pin.name}
         </h3>
         <div style={{ display: 'flex', gap: '4px', whiteSpace: 'nowrap' }}>
           {pin.isWishlist && (
             <span style={{
               background: '#ffebee',
               color: '#c62828',
               padding: '2px 8px',
               borderRadius: '4px',
               fontSize: '12px',
               fontWeight: 600
             }}>
               Wishlist
             </span>
           )}
           <button
             onClick={handleDelete}
             title="Delete pin"
             style={{
               background: '#ffebee',
               color: '#c62828',
               border: 'none',
               borderRadius: '4px',
               padding: '2px 8px',
               fontSize: '12px',
               fontWeight: 600,
               cursor: 'pointer',
               transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
             }}
             onMouseEnter={e => {
               const el = e.currentTarget
               el.style.background = '#ef5350'
               el.style.color = 'white'
             }}
             onMouseLeave={e => {
               const el = e.currentTarget
               el.style.background = '#ffebee'
               el.style.color = '#c62828'
             }}
           >
             ✕
           </button>
         </div>
       </div>

      {pin.description && (
        <p style={{ fontSize: '14px', color: '#666', margin: '4px 0', lineHeight: 1.4 }}>
          {pin.description}
        </p>
      )}

      <p style={{ fontSize: '13px', color: '#999', margin: '4px 0' }}>
        {pin.artistOrSeries}
      </p>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{
          background: isRainbow ? 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #0000ff, #ff00ff)' : bgColor,
          color: ['pastel', 'silver'].includes(pin.colorTag) ? '#1a1a1a' : 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          {colorLabel[pin.colorTag]}
        </span>

        {!pin.isWishlist && (
          <span style={{
            background: pin.status === 'display' ? '#e8f5e9' : '#f5f5f5',
            color: pin.status === 'display' ? '#1b5e20' : '#424242',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            {pin.status === 'display' ? 'On Display' : 'In Storage'}
          </span>
        )}
      </div>
    </article>
  )
}
