/**
 * Content model for the admin panel. Every collection and settings page is
 * described here once; the admin UI (forms, tables) and the save actions are
 * generated from these definitions.
 */

export type Option = { label: string; value: string }

type Base = {
  name: string
  label: string
  help?: string
  required?: boolean
  /** Half-width field in the form grid. */
  half?: boolean
}

export type Field =
  | (Base & { type: 'text' | 'email' | 'url'; placeholder?: string; maxLength?: number })
  | (Base & { type: 'textarea'; rows?: number; placeholder?: string; maxLength?: number })
  | (Base & { type: 'richtext' })
  | (Base & { type: 'number' })
  | (Base & { type: 'date' })
  | (Base & { type: 'checkbox' })
  | (Base & { type: 'select'; options: Option[] })
  | (Base & { type: 'icon' })
  | (Base & { type: 'image' })
  | (Base & { type: 'gallery' })
  | (Base & { type: 'file'; accept?: string })
  | (Base & { type: 'slug'; from: string })
  | (Base & { type: 'password' })
  | (Base & { type: 'array'; fields: Field[]; itemLabel?: string; max?: number })

export type Section = { title: string; description?: string; fields: Field[] }

export type CollectionDef = {
  slug: string
  label: string
  singular: string
  group: string
  icon: string
  description?: string
  titleField: string
  /** Columns in the list table (field names; "createdAt" allowed). */
  columns: string[]
  searchFields: string[]
  sort: Record<string, 1 | -1>
  sections: Section[]
  /** Only admins may open it (e.g. staff users). */
  adminOnly?: boolean
  /** Records come from the website; staff can't create them by hand. */
  noCreate?: boolean
  /** Public website filter (e.g. only published posts). */
  publicFilter?: Record<string, unknown>
}

export type GlobalDef = {
  slug: string
  label: string
  group: string
  icon: string
  description?: string
  sections: Section[]
}

export const iconOptions: Option[] = [
  { label: 'Book', value: 'book' },
  { label: 'Flask (Science)', value: 'flask' },
  { label: 'Computer', value: 'computer' },
  { label: 'Trophy / Sports', value: 'trophy' },
  { label: 'Music', value: 'music' },
  { label: 'Art / Palette', value: 'palette' },
  { label: 'Bus / Transport', value: 'bus' },
  { label: 'Shield / Safety', value: 'shield' },
  { label: 'Plant / Nature', value: 'plant' },
  { label: 'Globe', value: 'globe' },
  { label: 'Graduation Cap', value: 'cap' },
  { label: 'Heart / Care', value: 'heart' },
  { label: 'Users / Community', value: 'users' },
  { label: 'Sparkle', value: 'sparkle' },
  { label: 'Library', value: 'library' },
  { label: 'Camera / CCTV', value: 'camera' },
]

const status: Field = {
  name: 'status',
  label: 'Status',
  type: 'select',
  half: true,
  options: [
    { label: 'Published', value: 'published' },
    { label: 'Draft (hidden)', value: 'draft' },
  ],
}

export const collections: CollectionDef[] = [
  {
    slug: 'enquiries',
    label: 'Enquiries',
    singular: 'Enquiry',
    group: 'Inbox',
    icon: 'tray',
    description: 'Admission and contact form submissions from the website.',
    titleField: 'studentName',
    columns: ['studentName', 'type', 'classApplying', 'phone', 'status', 'createdAt'],
    searchFields: ['studentName', 'parentName', 'phone', 'email'],
    sort: { createdAt: -1 },
    noCreate: true,
    sections: [
      {
        title: 'Enquiry',
        fields: [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            half: true,
            options: [
              { label: 'Admission', value: 'admission' },
              { label: 'Contact', value: 'contact' },
            ],
          },
          {
            name: 'status',
            label: 'Status',
            type: 'select',
            half: true,
            options: [
              { label: 'New', value: 'new' },
              { label: 'Contacted', value: 'contacted' },
              { label: 'Visit scheduled', value: 'visit' },
              { label: 'Admitted', value: 'admitted' },
              { label: 'Closed', value: 'closed' },
            ],
          },
          { name: 'studentName', label: 'Student / visitor name', type: 'text', required: true, half: true },
          { name: 'parentName', label: 'Parent name', type: 'text', half: true },
          { name: 'classApplying', label: 'Class / subject', type: 'text', half: true },
          { name: 'phone', label: 'Phone', type: 'text', required: true, half: true },
          { name: 'email', label: 'Email', type: 'email', half: true },
          { name: 'message', label: 'Message', type: 'textarea' },
          { name: 'notes', label: 'Internal notes (staff only)', type: 'textarea' },
        ],
      },
    ],
  },
  {
    slug: 'notices',
    label: 'Notices',
    singular: 'Notice',
    group: 'Updates',
    icon: 'megaphone',
    description: 'Notice Board items. Pinned notices also appear on the homepage.',
    titleField: 'title',
    columns: ['title', 'category', 'date', 'pinned'],
    searchFields: ['title'],
    sort: { date: -1 },
    sections: [
      {
        title: 'Notice',
        fields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true, half: true },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
            half: true,
            options: [
              { label: 'General', value: 'general' },
              { label: 'Admissions', value: 'admissions' },
              { label: 'Exams / Results', value: 'exams' },
              { label: 'Holidays', value: 'holidays' },
              { label: 'Events', value: 'events' },
            ],
          },
          { name: 'details', label: 'Details', type: 'textarea' },
          { name: 'attachment', label: 'Attachment (PDF / image)', type: 'file', accept: 'application/pdf,image/*' },
          { name: 'pinned', label: 'Pin on homepage', type: 'checkbox' },
        ],
      },
    ],
  },
  {
    slug: 'news',
    label: 'News & Events',
    singular: 'Post',
    group: 'Updates',
    icon: 'newspaper',
    titleField: 'title',
    columns: ['title', 'category', 'date', 'status'],
    searchFields: ['title', 'excerpt'],
    sort: { date: -1 },
    publicFilter: { status: { $ne: 'draft' } },
    sections: [
      {
        title: 'Post',
        fields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
            half: true,
            options: [
              { label: 'News', value: 'news' },
              { label: 'Event', value: 'event' },
              { label: 'Achievement', value: 'achievement' },
            ],
          },
          { name: 'date', label: 'Date', type: 'date', required: true, half: true },
          { name: 'venue', label: 'Venue (for events)', type: 'text', half: true },
          status,
          { name: 'cover', label: 'Cover photo', type: 'image' },
          { name: 'excerpt', label: 'Short summary', type: 'textarea', rows: 3, maxLength: 260 },
          { name: 'content', label: 'Full story', type: 'richtext' },
        ],
      },
      {
        title: 'Search engine & link',
        fields: [
          { name: 'slug', label: 'Page address', type: 'slug', from: 'title', help: 'Created from the title automatically.' },
          { name: 'metaDescription', label: 'Google description', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },
  {
    slug: 'gallery',
    label: 'Gallery',
    singular: 'Album',
    group: 'Updates',
    icon: 'images',
    titleField: 'title',
    columns: ['title', 'category', 'date'],
    searchFields: ['title'],
    sort: { date: -1 },
    sections: [
      {
        title: 'Album',
        fields: [
          { name: 'title', label: 'Album title', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', half: true },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
            half: true,
            options: [
              { label: 'Campus', value: 'campus' },
              { label: 'Events & Celebrations', value: 'events' },
              { label: 'Sports', value: 'sports' },
              { label: 'Academics', value: 'academics' },
              { label: 'Trips', value: 'trips' },
            ],
          },
          { name: 'photos', label: 'Photos', type: 'gallery', help: 'Select many photos at once. The first photo is the album cover.' },
          { name: 'videos', label: 'YouTube videos', type: 'array', itemLabel: 'Video', fields: [{ name: 'url', label: 'YouTube link', type: 'url', required: true }] },
          { name: 'slug', label: 'Page address', type: 'slug', from: 'title' },
        ],
      },
    ],
  },
  {
    slug: 'toppers',
    label: 'Achievers & Toppers',
    singular: 'Achiever',
    group: 'School',
    icon: 'medal',
    description: 'Tick "Show in homepage hero" and set rank 1–3 for the Board Toppers panel.',
    titleField: 'name',
    columns: ['name', 'className', 'score', 'year', 'inHero', 'rank'],
    searchFields: ['name', 'className'],
    sort: { rank: 1, year: -1 },
    sections: [
      {
        title: 'Achiever',
        fields: [
          { name: 'name', label: 'Student name', type: 'text', required: true, half: true },
          { name: 'className', label: 'Class / stream', type: 'text', required: true, half: true, placeholder: 'XII Science' },
          { name: 'score', label: 'Score / award', type: 'text', required: true, half: true, placeholder: '96.2%' },
          { name: 'year', label: 'Year', type: 'text', required: true, half: true, placeholder: '2025–26' },
          { name: 'photo', label: 'Photo', type: 'image' },
          { name: 'inHero', label: 'Show in homepage hero (Board Toppers)', type: 'checkbox', half: true },
          { name: 'featured', label: 'Show in homepage achievers section', type: 'checkbox', half: true },
          { name: 'rank', label: 'Rank (1 = first)', type: 'number', half: true },
        ],
      },
    ],
  },
  {
    slug: 'faculty',
    label: 'Faculty',
    singular: 'Faculty member',
    group: 'School',
    icon: 'chalkboard',
    titleField: 'name',
    columns: ['name', 'designation', 'department', 'order'],
    searchFields: ['name', 'designation', 'department'],
    sort: { order: 1, name: 1 },
    sections: [
      {
        title: 'Faculty member',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true, half: true },
          { name: 'designation', label: 'Designation', type: 'text', required: true, half: true },
          { name: 'department', label: 'Department', type: 'text', half: true },
          { name: 'qualification', label: 'Qualification', type: 'text', half: true },
          { name: 'experience', label: 'Experience', type: 'text', half: true, placeholder: '12 years' },
          { name: 'order', label: 'Display order', type: 'number', half: true, help: 'Lower shows first' },
          { name: 'photo', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    slug: 'facilities',
    label: 'Facilities',
    singular: 'Facility',
    group: 'School',
    icon: 'buildings',
    titleField: 'title',
    columns: ['title', 'order'],
    searchFields: ['title'],
    sort: { order: 1 },
    sections: [
      {
        title: 'Facility',
        fields: [
          { name: 'title', label: 'Title', type: 'text', required: true, half: true },
          { name: 'icon', label: 'Icon', type: 'icon', half: true },
          { name: 'summary', label: 'Summary', type: 'textarea', rows: 3, required: true },
          { name: 'image', label: 'Photo', type: 'image' },
          { name: 'points', label: 'Highlights', type: 'array', itemLabel: 'Highlight', fields: [{ name: 'text', label: 'Text', type: 'text', required: true }] },
          { name: 'order', label: 'Display order', type: 'number', half: true },
        ],
      },
    ],
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    singular: 'Testimonial',
    group: 'School',
    icon: 'quotes',
    titleField: 'name',
    columns: ['name', 'relation'],
    searchFields: ['name', 'quote'],
    sort: { createdAt: -1 },
    sections: [
      {
        title: 'Testimonial',
        fields: [
          { name: 'quote', label: 'Quote', type: 'textarea', required: true },
          { name: 'name', label: 'Name', type: 'text', required: true, half: true },
          { name: 'relation', label: 'Relation', type: 'text', half: true, placeholder: 'Parent of a Class V student' },
          { name: 'photo', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    slug: 'careers',
    label: 'Job Openings',
    singular: 'Job opening',
    group: 'School',
    icon: 'briefcase',
    titleField: 'title',
    columns: ['title', 'department', 'type', 'open'],
    searchFields: ['title', 'department'],
    sort: { createdAt: -1 },
    publicFilter: { open: true },
    sections: [
      {
        title: 'Job opening',
        fields: [
          { name: 'title', label: 'Post', type: 'text', required: true, placeholder: 'PGT Physics' },
          { name: 'department', label: 'Department', type: 'text', half: true },
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            half: true,
            options: [
              { label: 'Full time', value: 'full-time' },
              { label: 'Part time', value: 'part-time' },
              { label: 'Contract', value: 'contract' },
            ],
          },
          { name: 'requirements', label: 'Requirements', type: 'textarea' },
          { name: 'open', label: 'Accepting applications', type: 'checkbox' },
        ],
      },
    ],
  },
  {
    slug: 'transfer-certificates',
    label: 'Transfer Certificates',
    singular: 'Transfer certificate',
    group: 'CBSE Corner',
    icon: 'certificate',
    description: 'Parents search these by admission number on the website.',
    titleField: 'studentName',
    columns: ['studentName', 'admissionNo', 'tcNo', 'issueDate'],
    searchFields: ['studentName', 'admissionNo', 'tcNo'],
    sort: { issueDate: -1 },
    sections: [
      {
        title: 'Transfer certificate',
        fields: [
          { name: 'studentName', label: 'Student name', type: 'text', required: true },
          { name: 'admissionNo', label: 'Admission No.', type: 'text', required: true, half: true },
          { name: 'tcNo', label: 'TC No.', type: 'text', half: true },
          { name: 'issueDate', label: 'Issue date', type: 'date', half: true },
          { name: 'file', label: 'TC (PDF / scan)', type: 'file', required: true, accept: 'application/pdf,image/*' },
        ],
      },
    ],
  },
  {
    slug: 'pages',
    label: 'Extra Pages',
    singular: 'Page',
    group: 'CBSE Corner',
    icon: 'files',
    description: 'Simple pages at /page-address, e.g. Information of the School, Affiliation Details.',
    titleField: 'title',
    columns: ['title', 'slug', 'status'],
    searchFields: ['title'],
    sort: { title: 1 },
    publicFilter: { status: { $ne: 'draft' } },
    sections: [
      {
        title: 'Page',
        fields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'slug', label: 'Page address', type: 'slug', from: 'title', half: true },
          status,
          { name: 'intro', label: 'Intro', type: 'textarea', rows: 3 },
          {
            name: 'infoRows',
            label: 'Information table',
            type: 'array',
            itemLabel: 'Row',
            fields: [
              { name: 'label', label: 'Label', type: 'text', required: true, half: true },
              { name: 'value', label: 'Value', type: 'text', half: true },
              { name: 'file', label: 'Document (optional)', type: 'file', accept: 'application/pdf,image/*' },
            ],
          },
          { name: 'content', label: 'Content', type: 'richtext' },
        ],
      },
    ],
  },
  {
    slug: 'users',
    label: 'Staff Users',
    singular: 'Staff user',
    group: 'Settings',
    icon: 'users',
    titleField: 'name',
    columns: ['name', 'email', 'role'],
    searchFields: ['name', 'email'],
    sort: { name: 1 },
    adminOnly: true,
    sections: [
      {
        title: 'Account',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true, half: true },
          { name: 'email', label: 'Email', type: 'email', required: true, half: true },
          {
            name: 'role',
            label: 'Role',
            type: 'select',
            half: true,
            options: [
              { label: 'Admin (everything incl. staff users)', value: 'admin' },
              { label: 'Editor (website content)', value: 'editor' },
            ],
          },
          { name: 'password', label: 'Password', type: 'password', half: true, help: 'Leave empty to keep the current password.' },
        ],
      },
    ],
  },
]

export const globals: GlobalDef[] = [
  {
    slug: 'home-page',
    label: 'Home Page',
    group: 'Pages',
    icon: 'house',
    sections: [
      {
        title: 'Hero',
        description: 'Top of the homepage. Wrap words in *stars* for blue and _underscores_ for red.',
        fields: [
          { name: 'heroTitle', label: 'Headline', type: 'text', placeholder: 'Proud of our *achievers*, ready for _yours._' },
          { name: 'heroPoints', label: 'Points', type: 'array', itemLabel: 'Point', max: 4, fields: [{ name: 'text', label: 'Text', type: 'text', required: true }] },
          { name: 'resultsYear', label: 'Results year (Board Toppers panel)', type: 'text', half: true, placeholder: '2025–26' },
          { name: 'heroImage', label: 'Background photo', type: 'image' },
        ],
      },
      {
        title: 'Numbers',
        fields: [
          {
            name: 'stats',
            label: 'Counters',
            type: 'array',
            itemLabel: 'Counter',
            max: 4,
            fields: [
              { name: 'value', label: 'Value', type: 'text', required: true, half: true, placeholder: '2400+' },
              { name: 'label', label: 'Label', type: 'text', required: true, half: true },
            ],
          },
        ],
      },
      {
        title: 'About section',
        fields: [
          { name: 'aboutTitle', label: 'Heading', type: 'text' },
          { name: 'aboutText', label: 'Text', type: 'textarea', rows: 6, help: 'Separate paragraphs with an empty line.' },
          { name: 'aboutImage', label: 'Photo', type: 'image' },
        ],
      },
      {
        title: 'Why choose us',
        fields: [
          { name: 'whyTitle', label: 'Heading', type: 'text' },
          { name: 'whyText', label: 'Intro', type: 'textarea', rows: 2 },
          {
            name: 'pillars',
            label: 'Cards',
            type: 'array',
            itemLabel: 'Card',
            max: 8,
            fields: [
              { name: 'title', label: 'Title', type: 'text', required: true, half: true },
              { name: 'icon', label: 'Icon', type: 'icon', half: true },
              { name: 'text', label: 'Text', type: 'textarea', rows: 2, required: true },
            ],
          },
        ],
      },
      {
        title: "Director's message",
        fields: [
          { name: 'messageHeading', label: 'Label', type: 'text', half: true },
          { name: 'messageName', label: 'Name', type: 'text', half: true },
          { name: 'messageRole', label: 'Designation', type: 'text', half: true },
          { name: 'messagePhoto', label: 'Photo', type: 'image' },
          { name: 'messageText', label: 'Message', type: 'textarea', rows: 8 },
        ],
      },
      {
        title: 'Calendar & admission banner',
        fields: [
          { name: 'calendarImage', label: 'Calendar image (this month)', type: 'image' },
          { name: 'calendarFile', label: 'Full calendar (PDF)', type: 'file', accept: 'application/pdf' },
          { name: 'ctaTitle', label: 'Admission banner heading', type: 'text' },
          { name: 'ctaText', label: 'Admission banner text', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },
  {
    slug: 'about-page',
    label: 'About Page',
    group: 'Pages',
    icon: 'info',
    sections: [
      {
        title: 'Content',
        fields: [
          { name: 'intro', label: 'Intro', type: 'textarea', rows: 3 },
          { name: 'heroImage', label: 'Photo', type: 'image' },
          { name: 'story', label: 'Our story', type: 'textarea', rows: 8, help: 'Separate paragraphs with an empty line.' },
          { name: 'vision', label: 'Vision', type: 'textarea', rows: 3, half: true },
          { name: 'mission', label: 'Mission', type: 'textarea', rows: 3, half: true },
        ],
      },
      {
        title: 'Values & milestones',
        fields: [
          { name: 'values', label: 'Core values', type: 'array', itemLabel: 'Value', fields: [{ name: 'title', label: 'Title', type: 'text', required: true, half: true }, { name: 'text', label: 'Text', type: 'text', half: true }] },
          {
            name: 'timeline',
            label: 'Milestones',
            type: 'array',
            itemLabel: 'Milestone',
            fields: [
              { name: 'year', label: 'Year', type: 'text', required: true, half: true },
              { name: 'title', label: 'Title', type: 'text', required: true, half: true },
              { name: 'text', label: 'Text', type: 'textarea', rows: 2 },
            ],
          },
          {
            name: 'leaders',
            label: 'Leadership',
            type: 'array',
            itemLabel: 'Leader',
            fields: [
              { name: 'name', label: 'Name', type: 'text', required: true, half: true },
              { name: 'role', label: 'Role', type: 'text', required: true, half: true },
              { name: 'photo', label: 'Photo', type: 'image' },
              { name: 'message', label: 'Message', type: 'textarea', rows: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'academics-page',
    label: 'Academics Page',
    group: 'Pages',
    icon: 'graduation',
    sections: [
      {
        title: 'Content',
        fields: [
          { name: 'intro', label: 'Intro', type: 'textarea', rows: 3 },
          {
            name: 'stages',
            label: 'Stages',
            type: 'array',
            itemLabel: 'Stage',
            fields: [
              { name: 'name', label: 'Name', type: 'text', required: true, half: true },
              { name: 'classes', label: 'Classes', type: 'text', required: true, half: true },
              { name: 'text', label: 'Text', type: 'textarea', rows: 2 },
              { name: 'image', label: 'Photo', type: 'image' },
              { name: 'focus', label: 'Focus points', type: 'array', itemLabel: 'Point', fields: [{ name: 'text', label: 'Text', type: 'text', required: true }] },
            ],
          },
          {
            name: 'approach',
            label: 'Teaching approach',
            type: 'array',
            itemLabel: 'Item',
            fields: [
              { name: 'title', label: 'Title', type: 'text', required: true, half: true },
              { name: 'icon', label: 'Icon', type: 'icon', half: true },
              { name: 'text', label: 'Text', type: 'text' },
            ],
          },
          { name: 'cocurricular', label: 'Co-curricular activities', type: 'array', itemLabel: 'Activity', fields: [{ name: 'name', label: 'Name', type: 'text', required: true }] },
        ],
      },
    ],
  },
  {
    slug: 'admissions-page',
    label: 'Admissions Page',
    group: 'Pages',
    icon: 'pencil',
    sections: [
      {
        title: 'Content',
        fields: [
          { name: 'session', label: 'Session', type: 'text', half: true, placeholder: '2027–28' },
          { name: 'intro', label: 'Intro', type: 'textarea', rows: 3 },
          { name: 'steps', label: 'Admission steps', type: 'array', itemLabel: 'Step', fields: [{ name: 'title', label: 'Title', type: 'text', required: true, half: true }, { name: 'text', label: 'Text', type: 'text', half: true }] },
          {
            name: 'eligibility',
            label: 'Age criteria',
            type: 'array',
            itemLabel: 'Row',
            fields: [
              { name: 'className', label: 'Class', type: 'text', required: true, half: true },
              { name: 'age', label: 'Age', type: 'text', required: true, half: true },
            ],
          },
          { name: 'documentsRequired', label: 'Documents required', type: 'array', itemLabel: 'Document', fields: [{ name: 'text', label: 'Text', type: 'text', required: true }] },
          { name: 'feeStructure', label: 'Fee structure (PDF)', type: 'file', accept: 'application/pdf', half: true },
          { name: 'prospectus', label: 'Prospectus (PDF)', type: 'file', accept: 'application/pdf', half: true },
          {
            name: 'faqs',
            label: 'FAQs',
            type: 'array',
            itemLabel: 'FAQ',
            fields: [
              { name: 'question', label: 'Question', type: 'text', required: true },
              { name: 'answer', label: 'Answer', type: 'textarea', rows: 2, required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'disclosure',
    label: 'Mandatory Disclosure',
    group: 'CBSE Corner',
    icon: 'clipboard',
    description: 'CBSE Appendix-IX tables.',
    sections: [
      {
        title: 'Disclosure',
        fields: [
          { name: 'enabled', label: 'Show this page on the website', type: 'checkbox' },
          {
            name: 'sections',
            label: 'Tables',
            type: 'array',
            itemLabel: 'Table',
            fields: [
              { name: 'heading', label: 'Heading', type: 'text', required: true },
              {
                name: 'rows',
                label: 'Rows',
                type: 'array',
                itemLabel: 'Row',
                fields: [
                  { name: 'label', label: 'Information', type: 'text', required: true, half: true },
                  { name: 'value', label: 'Details', type: 'text', half: true },
                  { name: 'file', label: 'Document (optional)', type: 'file', accept: 'application/pdf,image/*' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'site-settings',
    label: 'Site Settings',
    group: 'Settings',
    icon: 'gear',
    sections: [
      {
        title: 'School',
        fields: [
          { name: 'schoolName', label: 'School name', type: 'text', required: true, half: true },
          { name: 'location', label: 'Location line', type: 'text', half: true },
          { name: 'tagline', label: 'Tagline', type: 'text', half: true },
          { name: 'affiliation', label: 'Affiliation', type: 'text', half: true },
          { name: 'established', label: 'Established (year)', type: 'text', half: true },
          { name: 'logo', label: 'Logo', type: 'image', help: 'Square PNG works best.' },
        ],
      },
      {
        title: 'Contact',
        fields: [
          { name: 'phone', label: 'Phone', type: 'text', half: true },
          { name: 'altPhone', label: 'Second phone', type: 'text', half: true },
          { name: 'whatsapp', label: 'WhatsApp number', type: 'text', half: true, help: 'With country code, e.g. 919829751651' },
          { name: 'email', label: 'Email', type: 'email', half: true },
          { name: 'notificationEmail', label: 'Send new enquiries to', type: 'email', half: true },
          { name: 'officeHours', label: 'Office hours', type: 'text', half: true },
          { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
          { name: 'mapEmbedUrl', label: 'Google Maps embed link', type: 'url', help: 'Google Maps → Share → Embed a map → copy only the src link.' },
        ],
      },
      {
        title: 'Social media',
        fields: [
          { name: 'facebook', label: 'Facebook', type: 'url', half: true },
          { name: 'instagram', label: 'Instagram', type: 'url', half: true },
          { name: 'youtube', label: 'YouTube', type: 'url', half: true },
          { name: 'x', label: 'X (Twitter)', type: 'url', half: true },
        ],
      },
      {
        title: 'Admission popup',
        description: 'Shown once per visit when someone opens the website.',
        fields: [
          { name: 'popupEnabled', label: 'Show admission popup', type: 'checkbox' },
          { name: 'popupTitle', label: 'Title', type: 'text', half: true },
          { name: 'popupBadge', label: 'Badge', type: 'text', half: true, placeholder: 'Session 2027–28' },
          { name: 'popupText', label: 'Text', type: 'textarea', rows: 2 },
          { name: 'popupImage', label: 'Image (optional)', type: 'image' },
        ],
      },
      {
        title: 'Top bar & SEO',
        fields: [
          { name: 'topbarText', label: 'Top bar slogan', type: 'text', half: true },
          { name: 'metaDescription', label: 'Google description', type: 'textarea', rows: 2 },
          { name: 'ogImage', label: 'Share image (WhatsApp / Facebook preview)', type: 'image' },
        ],
      },
    ],
  },
]

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug)
export const getGlobal = (slug: string) => globals.find((g) => g.slug === slug)
export const fieldsOf = (def: { sections: Section[] }) => def.sections.flatMap((s) => s.fields)
