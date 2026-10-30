'use client'

import { Printer } from '@phosphor-icons/react'

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-primary">
      <Printer size={18} weight="fill" /> Print / Save as PDF
    </button>
  )
}
