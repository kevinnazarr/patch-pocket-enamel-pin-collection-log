interface PinSummaryProps {
  owned: number
  wishlisted: number
  onDisplay: number
}

export default function PinSummary({ owned, wishlisted, onDisplay }: PinSummaryProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      padding: '20px',
      background: 'linear-gradient(135deg, #fff3ed 0%, #fff9f7 100%)',
      borderRadius: '8px',
      marginBottom: '24px',
      border: '2px solid #ff6b35'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#ff6b35' }}>
          {owned}
        </div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px', fontWeight: 600 }}>
          Owned
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#d4af37' }}>
          {wishlisted}
        </div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px', fontWeight: 600 }}>
          Wishlisted
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#1b5e20' }}>
          {onDisplay}
        </div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px', fontWeight: 600 }}>
          On Display
        </div>
      </div>
    </div>
  )
}
