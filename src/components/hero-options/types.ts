export type HeroProps = {
  schoolName: string
  phone?: string | null
  established?: string | null
  stats: { value: string; label: string }[]
  notices: { title: string; date: string }[]
}
