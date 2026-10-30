import {
  Books,
  Bus,
  Camera,
  Flask,
  GlobeHemisphereEast,
  GraduationCap,
  Heart,
  Laptop,
  MusicNotes,
  Palette,
  Plant,
  ShieldCheck,
  Sparkle,
  Trophy,
  UsersThree,
  BookOpenText,
} from '@phosphor-icons/react/dist/ssr'

const map = {
  book: BookOpenText,
  flask: Flask,
  computer: Laptop,
  trophy: Trophy,
  music: MusicNotes,
  palette: Palette,
  bus: Bus,
  shield: ShieldCheck,
  plant: Plant,
  globe: GlobeHemisphereEast,
  cap: GraduationCap,
  heart: Heart,
  users: UsersThree,
  sparkle: Sparkle,
  library: Books,
  camera: Camera,
} as const

export function Icon({ name, size = 26, className }: { name?: string | null; size?: number; className?: string }) {
  const Cmp = map[(name as keyof typeof map) ?? 'sparkle'] ?? Sparkle
  return <Cmp size={size} weight="light" className={className} />
}
