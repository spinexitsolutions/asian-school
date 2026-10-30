/**
 * Editable website sections ("blocks") and pages.
 *
 * Every block gets a show/hide switch plus label / heading / intro
 * fields in its admin settings page; the defaults below are what the website
 * shows until staff change them. Every page in `sitePages` can be switched off
 * and given its own banner heading and intro in Settings → Pages & Menu.
 */
import type { Field, Section } from './schema'

export type Block = {
  key: string
  /** Name of the section in the admin form. */
  name: string
  /** Defaults. A field is only offered when it has a default. */
  label?: string
  title?: string
  text?: string
  /** Store the label under another field name (kept for older data). */
  labelField?: string
}

export const pageBlocks: Record<string, Block[]> = {
  'home-page': [
    { key: 'hero', name: 'Hero (top of the page)' },
    { key: 'quick', name: 'Quick link boxes' },
    { key: 'about', name: 'About', label: 'About Our School' },
    { key: 'stats', name: 'Numbers' },
    { key: 'why', name: 'Why choose us', label: 'Why Choose Us' },
    { key: 'message', name: "Director's message", label: "Director's Message", title: 'A Message from Our *Director*', labelField: 'messageHeading' },
    {
      key: 'updates',
      name: 'Notices & activities',
      label: 'Stay Updated',
      title: 'Notices & *Activities*',
      text: 'Important announcements, events and happenings at The Asian International School.',
    },
    {
      key: 'achievers',
      name: 'Achievers',
      label: 'Achievements & Awards',
      title: 'Our *Shining Stars*',
      text: 'Students who made the school proud with their hard work and dedication.',
    },
    {
      key: 'facilities',
      name: 'Facilities',
      label: 'School Facilities',
      title: 'Modern Infrastructure for *Better Learning*',
      text: 'State-of-the-art facilities that support academic excellence, innovation and the overall development of every student.',
    },
    { key: 'gallery', name: 'Gallery', label: 'School Gallery', title: 'Moments That Define *Our Journey*' },
    { key: 'testimonials', name: 'Testimonials', label: 'Testimonials', title: 'What *Parents* Say About Us' },
    {
      key: 'calendar',
      name: 'Calendar',
      label: 'School Calendar',
      title: 'Plan Ahead With Our *Calendar*',
      text: 'Important dates, examinations, holidays and celebrations for every month.',
    },
    { key: 'faq', name: 'FAQ', label: 'FAQ', title: 'Frequently Asked *Questions*' },
    { key: 'cta', name: 'Admission banner (bottom)', label: 'Admissions Open' },
  ],
  'about-page': [
    { key: 'story', name: 'Our story', label: 'Our Story', title: 'Building Future *Leaders* Since 2010' },
    { key: 'vision', name: 'Vision & mission' },
    { key: 'values', name: 'Core values', label: 'Core Values', title: 'What We *Stand For*' },
    { key: 'journey', name: 'Milestones', label: 'Our Journey', title: 'Milestones Along *The Way*' },
    { key: 'message', name: "Director's message", label: "Director's Message", title: 'A Message from Our *Director*' },
    { key: 'leaders', name: 'Leadership', label: 'Leadership', title: 'The People Who *Lead* Us' },
    { key: 'visit', name: 'Visit banner (bottom)', title: 'Want to see the campus?', text: 'Visit us Monday to Saturday, 8:00 AM – 3:00 PM.' },
  ],
  'academics-page': [
    {
      key: 'stages',
      name: 'Curriculum stages',
      label: 'Curriculum',
      title: 'CBSE Curriculum, *Stage by Stage*',
      text: 'Each stage builds on the last, matched to how children learn at that age.',
    },
    { key: 'approach', name: 'Teaching approach', label: 'Teaching Approach', title: 'How We *Teach*' },
    {
      key: 'activities',
      name: 'Co-curricular activities',
      label: 'Beyond Books',
      title: 'Co-Curricular *Activities*',
      text: 'Every child gets a stage to discover talents beyond the classroom.',
    },
  ],
  'admissions-page': [
    {
      key: 'apply',
      name: 'Apply online box',
      title: 'Apply online in 5 minutes',
      text: 'Fill the full admission form, upload documents and print your application.',
    },
    { key: 'steps', name: 'Admission steps', label: 'Admission Process', title: 'Four Simple *Steps*' },
    { key: 'criteria', name: 'Age criteria & documents' },
    {
      key: 'enquiry',
      name: 'Enquiry form',
      label: 'Enquiry Form',
      title: 'Apply *Online*',
      text: 'Fill in the details and our admission team will call you back within one working day.',
    },
    { key: 'faq', name: 'FAQs', label: 'FAQ', title: 'Admission *Questions*' },
  ],
  'transport-page': [
    { key: 'overview', name: 'Photo & highlights' },
    {
      key: 'routes',
      name: 'Bus routes',
      label: 'Routes & Stops',
      title: 'Find Your *Bus Route*',
      text: 'Timings are approximate and may change slightly with traffic and season.',
    },
    { key: 'rules', name: 'Rules & fee', title: 'Transport rules' },
  ],
  'school-info': [
    { key: 'timings', name: 'Timings', label: 'Timings', title: 'School *Timings*' },
    { key: 'uniform', name: 'Uniform', label: 'Uniform', title: 'School *Uniform*' },
    { key: 'rules', name: 'Rules', label: 'Rules', title: 'Rules & *Regulations*' },
    { key: 'faq', name: 'FAQ', label: 'FAQ', title: 'Parents Often *Ask*', text: '' },
  ],
  'site-pages': [
    { key: 'contactCards', name: 'Contact page: address & phone cards' },
    { key: 'contactForm', name: 'Contact page: message form', label: 'Send a Message', title: 'Get in *Touch*' },
    { key: 'contactMap', name: 'Contact page: Google map' },
  ],
}

const fieldName = (b: Block, part: 'Label' | 'Title' | 'Text') => (part === 'Label' && b.labelField) || `${b.key}${part}`

export function blockFields(b: Block): Field[] {
  const fields: Field[] = [{ name: `${b.key}Show`, label: 'Show this section on the website', type: 'checkbox' }]
  if (b.label !== undefined) fields.push({ name: fieldName(b, 'Label'), label: 'Small label above heading', type: 'text', half: true })
  if (b.title !== undefined)
    fields.push({ name: fieldName(b, 'Title'), label: 'Heading', type: 'text', half: true, help: 'Wrap words in *stars* to colour them.' })
  if (b.text !== undefined) fields.push({ name: fieldName(b, 'Text'), label: 'Intro text', type: 'textarea', rows: 2 })
  return fields
}

/** Admin form section for a block, with the block's own content fields after the common ones. */
export function blockSection(slug: string, key: string, extra: Field[] = [], description?: string): Section {
  const b = pageBlocks[slug]?.find((x) => x.key === key)
  if (!b) throw new Error(`Unknown block ${slug}/${key}`)
  return { title: b.name, description, fields: [...blockFields(b), ...extra] }
}

export function blockDefaults(slug: string): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const b of pageBlocks[slug] ?? []) {
    out[`${b.key}Show`] = true
    if (b.label !== undefined) out[fieldName(b, 'Label')] = b.label
    if (b.title !== undefined) out[fieldName(b, 'Title')] = b.title
    if (b.text !== undefined) out[fieldName(b, 'Text')] = b.text
  }
  return out
}

/** Read a block from a settings document (already merged with defaults). */
export function block(doc: Record<string, unknown>, slug: string, key: string) {
  const b = pageBlocks[slug]?.find((x) => x.key === key)
  const str = (part: 'Label' | 'Title' | 'Text') => {
    if (!b) return ''
    const v = doc[fieldName(b, part)]
    return typeof v === 'string' ? v : ''
  }
  return { show: doc[`${key}Show`] !== false, label: str('Label'), title: str('Title'), text: str('Text') }
}

/* ───────────────────────── Pages ───────────────────────── */

export type SitePage = { key: string; path: string; name: string; title: string; intro: string }

export const sitePages: SitePage[] = [
  {
    key: 'about',
    path: '/about',
    name: 'About Us',
    title: 'About Us',
    intro:
      'The Asian International School, Chomu is a CBSE-affiliated English medium school established in 2010, offering education from Nursery to Class XII in Science, Arts and Commerce.',
  },
  {
    key: 'faculty',
    path: '/faculty',
    name: 'Our Faculty',
    title: 'Our Faculty',
    intro: "Experienced and passionate educators dedicated to every student's growth.",
  },
  { key: 'careers', path: '/careers', name: 'Careers', title: 'Careers', intro: 'Join a team of passionate educators shaping young minds in Chomu.' },
  {
    key: 'academics',
    path: '/academics',
    name: 'Academics',
    title: 'Academics',
    intro: 'We follow the CBSE curriculum from Nursery to Class XII, with Science, Arts and Commerce streams at the senior secondary level.',
  },
  {
    key: 'facilities',
    path: '/facilities',
    name: 'Facilities',
    title: 'Campus & Facilities',
    intro: 'Modern infrastructure that supports academic excellence, safety and the all-round development of every child.',
  },
  {
    key: 'gallery',
    path: '/gallery',
    name: 'Gallery',
    title: 'Photo Gallery',
    intro: 'Moments of learning, celebration and achievement at The Asian International School.',
  },
  {
    key: 'achievers',
    path: '/achievers',
    name: 'Achievements',
    title: 'Achievements',
    intro: 'Our toppers and award winners — the pride of The Asian International School.',
  },
  {
    key: 'admissions',
    path: '/admissions',
    name: 'Admissions',
    title: 'Admissions',
    intro: 'Admissions are open from Nursery to Class XI. Fill the enquiry form and our admission team will call you back.',
  },
  {
    key: 'apply',
    path: '/admissions/apply',
    name: 'Online Admission Form',
    title: 'Online Admission Form',
    intro: 'Nursery to Class XI. Fill the form, upload documents and print your application.',
  },
  {
    key: 'transport',
    path: '/transport',
    name: 'Transport',
    title: 'School Transport',
    intro:
      'Safe and comfortable school buses cover Chomu and nearby villages. Every bus has a trained driver and a lady attendant, and the routes are planned so that young children spend the least time on the road.',
  },
  {
    key: 'schoolInfo',
    path: '/school-info',
    name: 'Rules, Timings & Uniform',
    title: 'Rules, Timings & Uniform',
    intro: 'Everything parents and students need to know for a smooth school day.',
  },
  {
    key: 'downloads',
    path: '/downloads',
    name: 'Downloads',
    title: 'Downloads',
    intro: 'Syllabus, book lists, uniform details, holiday list and forms — all in one place.',
  },
  { key: 'notices', path: '/notices', name: 'Notice Board', title: 'Notice Board', intro: 'Circulars, holidays, examination schedules and announcements.' },
  { key: 'news', path: '/news', name: 'News & Events', title: 'News & Events', intro: 'Stories, events and achievements from our school community.' },
  { key: 'contact', path: '/contact', name: 'Contact Us', title: 'Contact Us', intro: 'We would love to hear from you. Visit, call or send us a message.' },
  {
    key: 'disclosure',
    path: '/mandatory-disclosure',
    name: 'Mandatory Public Disclosure',
    title: 'Mandatory Public Disclosure',
    intro: 'Information as required under the CBSE affiliation bye-laws (Appendix IX).',
  },
  {
    key: 'tc',
    path: '/transfer-certificates',
    name: 'Transfer Certificates',
    title: 'Transfer Certificates',
    intro: "Search and download a Transfer Certificate using the student's admission number.",
  },
]

export function sitePageSections(): Section[] {
  return sitePages.map((p) => ({
    title: `${p.name}  ·  ${p.path}`,
    fields: [
      { name: `${p.key}Enabled`, label: 'Show this page (and its menu links)', type: 'checkbox' },
      { name: `${p.key}Title`, label: 'Page heading', type: 'text', half: true },
      { name: `${p.key}Intro`, label: 'Intro under the heading', type: 'textarea', rows: 2 },
      ...pageBlocks['site-pages'].filter((b) => b.key.startsWith(p.key) && b.key !== p.key).flatMap((b) => relabel(blockFields(b), b.name)),
    ],
  }))
}

/** Prefix field labels with the block name when several blocks share one form section. */
function relabel(fields: Field[], name: string): Field[] {
  const short = name.split(': ').pop()
  return fields.map((f) => ({ ...f, label: f.type === 'checkbox' ? `Show ${short}` : `${short} – ${f.label.toLowerCase()}` }))
}

export function sitePageDefaults(): Record<string, unknown> {
  const out: Record<string, unknown> = blockDefaults('site-pages')
  for (const p of sitePages) {
    out[`${p.key}Enabled`] = true
    out[`${p.key}Title`] = p.title
    out[`${p.key}Intro`] = p.intro
  }
  return out
}
