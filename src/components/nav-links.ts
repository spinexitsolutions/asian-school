export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About School', href: '/about' },
      { label: "Director's Message", href: '/about#message' },
      { label: 'Our Faculty', href: '/faculty' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  { label: 'Academics', href: '/academics' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Achievements', href: '/achievers' },
  {
    label: 'CBSE Corner',
    href: '/mandatory-disclosure',
    children: [
      { label: 'Mandatory Public Disclosure', href: '/mandatory-disclosure' },
      { label: 'Transfer Certificates', href: '/transfer-certificates' },
      { label: 'Information of the School', href: '/information-of-the-school' },
      { label: 'Affiliation Details', href: '/affiliation-details' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'Admission Process', href: '/admissions' },
      { label: 'Apply Online', href: '/admissions/apply' },
      { label: 'Transport & Bus Routes', href: '/transport' },
      { label: 'Rules, Timings & Uniform', href: '/school-info' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    label: 'Notices',
    href: '/notices',
    children: [
      { label: 'Notice Board', href: '/notices' },
      { label: 'News & Events', href: '/news' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const footerGroups = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About School', href: '/about' },
      { label: 'Academics', href: '/academics' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Apply Online', href: '/admissions/apply' },
      { label: 'Transport', href: '/transport' },
      { label: 'Rules & Uniform', href: '/school-info' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Achievements', href: '/achievers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'CBSE Corner',
    links: [
      { label: 'Mandatory Public Disclosure', href: '/mandatory-disclosure' },
      { label: 'Transfer Certificates', href: '/transfer-certificates' },
      { label: 'Information of the School', href: '/information-of-the-school' },
      { label: 'Affiliation Details', href: '/affiliation-details' },
      { label: 'Notice Board', href: '/notices' },
      { label: 'News & Events', href: '/news' },
      { label: 'Careers', href: '/careers' },
    ],
  },
]
