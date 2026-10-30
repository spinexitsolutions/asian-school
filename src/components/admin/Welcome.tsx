import Link from 'next/link'

const shortcuts = [
  { href: '/admin/collections/enquiries', label: 'View enquiries', hint: 'Admission & contact forms' },
  { href: '/admin/collections/notices/create', label: 'Post a notice', hint: 'Appears on Notice Board' },
  { href: '/admin/collections/news/create', label: 'Add news / event', hint: 'With photos and details' },
  { href: '/admin/collections/gallery/create', label: 'New gallery album', hint: 'Upload many photos at once' },
  { href: '/admin/globals/home-page', label: 'Edit homepage', hint: 'Hero, numbers, principal' },
  { href: '/admin/globals/site-settings', label: 'Contact & logo', hint: 'Phone, address, socials' },
]

export default function Welcome() {
  return (
    <div className="asian-welcome">
      <p className="asian-welcome__eyebrow">Namaste 👋</p>
      <h2 className="asian-welcome__title">What would you like to update today?</h2>
      <div className="asian-welcome__grid">
        {shortcuts.map((s) => (
          <Link key={s.href} href={s.href} className="asian-welcome__card">
            <span className="asian-welcome__label">{s.label} →</span>
            <span className="asian-welcome__hint">{s.hint}</span>
          </Link>
        ))}
      </div>
      <p className="asian-welcome__foot">
        Changes go live on the website within seconds. <a href="/" target="_blank">Open website ↗</a>
      </p>
    </div>
  )
}
