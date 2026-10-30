/* eslint-disable @next/next/no-img-element */
export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src="/images/logo.png" alt="" width={64} height={64} />
      <div style={{ lineHeight: 1.15 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--theme-text)' }}>The Asian International School</div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, marginTop: 6 }}>
          Website Admin Panel
        </div>
      </div>
    </div>
  )
}
