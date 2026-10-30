'use client'

import {
  Briefcase,
  Buildings,
  Certificate,
  ChalkboardTeacher,
  ClipboardText,
  Files,
  Gear,
  GraduationCap,
  House,
  Images,
  Info,
  Medal,
  Megaphone,
  Newspaper,
  PencilSimpleLine,
  Quotes,
  SquaresFour,
  Tray,
  UsersThree,
  ImageSquare,
  Bus,
  DownloadSimple,
  ListChecks,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react'

const map: Record<string, PhosphorIcon> = {
  tray: Tray,
  megaphone: Megaphone,
  newspaper: Newspaper,
  images: Images,
  medal: Medal,
  chalkboard: ChalkboardTeacher,
  buildings: Buildings,
  quotes: Quotes,
  briefcase: Briefcase,
  certificate: Certificate,
  files: Files,
  users: UsersThree,
  house: House,
  info: Info,
  graduation: GraduationCap,
  pencil: PencilSimpleLine,
  clipboard: ClipboardText,
  gear: Gear,
  dashboard: SquaresFour,
  media: ImageSquare,
  bus: Bus,
  download: DownloadSimple,
  list: ListChecks,
}

export function AdminIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Cmp = map[name] ?? SquaresFour
  return <Cmp size={size} weight="duotone" className={className} />
}
