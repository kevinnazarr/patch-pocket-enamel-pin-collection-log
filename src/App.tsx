import { useState, useEffect } from 'react'
import type { Pin, ColorFilter, StatusFilter } from './types'
import { loadPins, savePins } from './storage'
import { calculateSummary, filterPins } from './utils'
import PinCard from './components/PinCard'
import PinForm from './components/PinForm'
import PinSummary from './components/PinSummary'
import PinFilters from './components/PinFilters'
import './App.css'

function App() {
  const [pins, setPins] = useState<Pin[]>(() => loadPins())
  const [search, setSearch] = useState('')
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [editingPin, setEditingPin] = useState<Pin | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    savePins(pins)
  }, [pins])

  const summary = calculateSummary(pins)
  const filtered = filterPins(pins, search, colorFilter, statusFilter)

  const handleAddPin = () => {
    setEditingPin(undefined)
    setIsFormOpen(true)
  }

  const handleEditPin = (pin: Pin) => {
    setEditingPin(pin)
    setIsFormOpen(true)
  }

  const handleSavePin = (pin: Pin) => {
    if (editingPin) {
      setPins(pins.map(p => p.id === pin.id ? pin : p))
    } else {
      setPins([...pins, { ...pin, id: Date.now().toString() }])
    }
    setIsFormOpen(false)
    setEditingPin(undefined)
  }

  const handleDeletePin = (id: string) => {
    setPins(pins.filter(p => p.id !== id))
  }

  const handleReset = () => {
    setSearch('')
    setColorFilter('all')
    setStatusFilter('all')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <header style={{
        background: 'white',
        borderBottom: '2px solid #e0e0e0',
        padding: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            margin: '0 0 8px 0',
            color: '#1a1a1a'
          }}>
            Patch Pocket
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: 0
          }}>
            Your enamel pin collection log
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <PinSummary owned={summary.owned} wishlisted={summary.wishlisted} onDisplay={summary.onDisplay} />

        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Search pins or artists..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#ff6b35'}
            onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'}
          />
          <button
            onClick={handleAddPin}
            style={{
              padding: '10px 16px',
              background: '#ff6b35',
              color: 'white',
              border: '2px solid #ff6b35',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.boxShadow = 'none'
              el.style.transform = 'translateY(0)'
            }}
          >
            + Add Pin
          </button>
        </div>

        <PinFilters
          colorFilter={colorFilter}
          statusFilter={statusFilter}
          onColorChange={setColorFilter}
          onStatusChange={setStatusFilter}
          onReset={handleReset}
        />

        {pins.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px dashed #e0e0e0'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px 0' }}>
              No pins yet
            </h2>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
              Start cataloging your enamel pin collection
            </p>
            <button
              onClick={handleAddPin}
              style={{
                padding: '10px 16px',
                background: '#ff6b35',
                color: 'white',
                border: '2px solid #ff6b35',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Add Your First Pin
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px dashed #e0e0e0'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px 0' }}>
              No matches
            </h2>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleReset}
              style={{
                padding: '10px 16px',
                background: 'white',
                color: '#ff6b35',
                border: '2px solid #ff6b35',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {filtered.map(pin => (
              <PinCard key={pin.id} pin={pin} onEdit={handleEditPin} onDelete={handleDeletePin} />
            ))}
          </div>
        )}
      </main>

      {isFormOpen && (
        <PinForm
          pin={editingPin}
          onSave={handleSavePin}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  )
}

export default App
