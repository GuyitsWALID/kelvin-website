import React from 'react'
import { rangeFigure } from './rangeGeometry.mjs'
import './kit/iso.css'

const turn = value => Math.max(20, Math.min(70, Math.round(value)))
const operations = [
  { name: 'Drum', rates: [18, 28, 38], unit: 'rpm' },
  { name: 'Wash arm', rates: [12, 20, 28], unit: 'rpm' },
  { name: 'Brush', rates: [45, 65, 85], unit: 'rpm' },
  { name: 'Pump', rates: [1, 1.5, 2], unit: 'cycles/s' },
]
const durationOf = (index, rate) => index === 3 ? 1 / rate : 60 / rate

export default function RangeAnatomy({ index }) {
  const [view, setView] = React.useState(42)
  const [speed, setSpeed] = React.useState(1)
  const [running, setRunning] = React.useState(true)
  const [visible, setVisible] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)
  const root = React.useRef(null)
  const pointerX = React.useRef(null)
  // shortcut: reproject on each degree of drag; use a retained 3D scene for a full orbit.
  const art = React.useMemo(() => rangeFigure(index, view), [index, view])
  const operation = operations[index]
  const rate = operation.rates[speed]
  const active = visible && running && !reduced

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    observer.observe(root.current)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(motion.matches)
    update()
    motion.addEventListener('change', update)
    return () => { observer.disconnect(); motion.removeEventListener('change', update) }
  }, [])

  function keyDown(event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); setView(v => turn(v - 5)) }
    if (event.key === 'ArrowRight') { event.preventDefault(); setView(v => turn(v + 5)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setSpeed(v => Math.min(2, v + 1)) }
    if (event.key === 'ArrowDown') { event.preventDefault(); setSpeed(v => Math.max(0, v - 1)) }
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); setRunning(v => !v) }
  }

  return <div className={`range-anatomy iso ${active ? 'is-running' : ''}`} data-figure={index} ref={root} style={{ '--anatomy-duration': `${durationOf(index, rate)}s` }}>
    <div className="range-anatomy__stage" tabIndex={0} role="group" aria-label={`${operation.name} illustration. Drag to turn the view. Press Space to pause. Arrow keys turn the view or change speed.`} onKeyDown={keyDown}
      onPointerDown={event => { pointerX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId) }}
      onPointerMove={event => { if (pointerX.current === null) return; const delta = event.clientX - pointerX.current; setView(v => turn(v + delta * .35)); pointerX.current = event.clientX }}
      onPointerUp={() => { pointerX.current = null }} onPointerCancel={() => { pointerX.current = null }}
      dangerouslySetInnerHTML={{ __html: art }} />
    <div className="range-anatomy__controls">
      <span className="range-anatomy__hint">Drag to turn · Space to pause · ↑↓ speed</span>
      <span className="range-anatomy__readout" role="status" aria-live="polite">{running && !reduced ? `${operation.name} · ${rate} ${operation.unit}` : `${operation.name} · paused`}</span>
      <div className="range-anatomy__buttons" aria-label="Figure controls">
        <button type="button" onClick={() => setView(v => turn(v - 12))} disabled={view === 20} aria-label="Turn view left">←</button>
        <button type="button" onClick={() => setRunning(v => !v)} aria-label={running ? 'Pause mechanism' : 'Start mechanism'}>{running ? 'Pause' : 'Run'}</button>
        <button type="button" onClick={() => setView(v => turn(v + 12))} disabled={view === 70} aria-label="Turn view right">→</button>
      </div>
    </div>
  </div>
}
