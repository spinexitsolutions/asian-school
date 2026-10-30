import { Crest } from '../Crest'

export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Crest size={56} />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: 'var(--theme-text)' }}>The Asian School</div>
        <div style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.6, marginTop: 6 }}>
          Website Control Room
        </div>
      </div>
    </div>
  )
}
