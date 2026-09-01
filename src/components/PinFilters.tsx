import type { ColorFilter, StatusFilter } from '../types'

interface PinFiltersProps {
  colorFilter: ColorFilter
  statusFilter: StatusFilter
  onColorChange: (color: ColorFilter) => void
  onStatusChange: (status: StatusFilter) => void
  onReset: () => void
}

export default function PinFilters({
  colorFilter,
  statusFilter,
  onColorChange,
  onStatusChange,
  onReset
}: PinFiltersProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      padding: '16px',
      background: '#f9f9f9',
      borderRadius: '8px',
      marginBottom: '16px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#666' }}>Color:</span>
        {['all', 'gold', 'silver', 'rainbow', 'pastel', 'dark'].map(color => (
          <button
            key={color}
            onClick={() => onColorChange(color as ColorFilter)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: colorFilter === color ? '2px solid #ff6b35' : '1px solid #e0e0e0',
              background: colorFilter === color ? '#fff3ed' : 'white',
              color: colorFilter === color ? '#ff6b35' : '#666',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#666' }}>Status:</span>
        {['all', 'owned', 'wishlist', 'display', 'storage'].map(status => (
          <button
            key={status}
            onClick={() => onStatusChange(status as StatusFilter)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: statusFilter === status ? '2px solid #ff6b35' : '1px solid #e0e0e0',
              background: statusFilter === status ? '#fff3ed' : 'white',
              color: statusFilter === status ? '#ff6b35' : '#666',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={onReset}
        style={{
          marginLeft: 'auto',
          padding: '6px 12px',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          background: 'white',
          color: '#666',
          fontSize: '13px',
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
        Reset
      </button>
    </div>
  )
}
