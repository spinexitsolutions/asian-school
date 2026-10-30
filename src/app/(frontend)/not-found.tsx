import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export default function NotFound() {
  return (
    <section className="dots-bg py-28 md:py-40">
      <div className="container-x max-w-xl text-center">
        <p className="font-heading text-[7rem] font-bold leading-none text-brand-600">404</p>
        <h1 className="heading-lg mt-4">Page not found</h1>
        <p className="mt-3 text-ink-2">The page you are looking for may have moved. Let’s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} weight="bold" /> Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
