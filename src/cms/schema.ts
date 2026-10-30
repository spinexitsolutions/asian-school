/**
 * Content model for the admin panel. Every collection and settings page is
 * described here once; the admin UI (forms, tables) and the save actions are
 * generated from these definitions.
 */

import { blockSection, sitePageSections } from './blocks'

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
    slug: 'applications',
    label: 'Admission Applications',
    singular: 'Application',
    group: 'Inbox',
    icon: 'clipboard',
    description: 'Full online admission forms with documents. Open one to view, print or update its status.',
    titleField: 'studentName',
    columns: ['applicationNo', 'studentName', 'classApplying', 'fatherPhone', 'status', 'createdAt'],
    searchFields: ['applicationNo', 'studentName', 'fatherName', 'fatherPhone', 'motherName'],
    sort: { createdAt: -1 },
    noCreate: true,
    sections: [
      {
        title: 'Application',
        fields: [
          { name: 'applicationNo', label: 'Application No.', type: 'text', half: true },
          {
            name: 'status',
            label: 'Status',
            type: 'select',
            half: true,
            options: [
              { label: 'Received', value: 'received' },
              { label: 'Under review', value: 'review' },
              { label: 'Interaction scheduled', value: 'interaction' },
              { label: 'Admitted', value: 'admitted' },
              { label: 'Waiting list', value: 'waiting' },
              { label: 'Not admitted', value: 'rejected' },
            ],
          },
          { name: 'session', label: 'Session', type: 'text', half: true },
          { name: 'classApplying', label: 'Class applying for', type: 'text', half: true },
          { name: 'notes', label: 'Internal notes (staff only)', type: 'textarea', rows: 3 },
        ],
      },
      {
        title: 'Student',
        fields: [
          { name: 'studentName', label: 'Student name', type: 'text', required: true, half: true },
          { name: 'dob', label: 'Date of birth', type: 'date', half: true },
          {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            half: true,
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ],
          },
          { name: 'bloodGroup', label: 'Blood group', type: 'text', half: true },
          { name: 'category', label: 'Category', type: 'text', half: true },
          { name: 'religion', label: 'Religion', type: 'text', half: true },
          { name: 'previousSchool', label: 'Previous school', type: 'text', half: true },
          { name: 'previousClass', label: 'Previous class / result', type: 'text', half: true },
          { name: 'transport', label: 'Needs school transport', type: 'checkbox', half: true },
          { name: 'transportStop', label: 'Preferred bus stop', type: 'text', half: true },
        ],
      },
      {
        title: 'Parents',
        fields: [
          { name: 'fatherName', label: "Father's name", type: 'text', required: true, half: true },
          { name: 'fatherOccupation', label: "Father's occupation", type: 'text', half: true },
          { name: 'fatherPhone', label: "Father's mobile", type: 'text', required: true, half: true },
          { name: 'motherName', label: "Mother's name", type: 'text', half: true },
          { name: 'motherOccupation', label: "Mother's occupation", type: 'text', half: true },
          { name: 'motherPhone', label: "Mother's mobile", type: 'text', half: true },
          { name: 'email', label: 'Email', type: 'email', half: true },
          { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
        ],
      },
      {
        title: 'Documents',
        fields: [
          { name: 'photo', label: 'Student photo', type: 'file', half: true },
          { name: 'birthCertificate', label: 'Birth certificate', type: 'file', half: true },
          { name: 'reportCard', label: 'Previous report card', type: 'file', half: true },
          { name: 'transferCertificate', label: 'Transfer certificate', type: 'file', half: true },
          { name: 'aadhaarCard', label: 'Aadhaar card', type: 'file', half: true },
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
    slug: 'downloads',
    label: 'Downloads',
    singular: 'Download',
    group: 'Updates',
    icon: 'download',
    description: 'PDFs on the Downloads page: syllabus, book lists, uniform list, holiday list, forms.',
    titleField: 'title',
    columns: ['title', 'category', 'classes', 'date'],
    searchFields: ['title', 'classes'],
    sort: { order: 1, date: -1 },
    sections: [
      {
        title: 'Download',
        fields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
            half: true,
            options: [
              { label: 'Syllabus', value: 'syllabus' },
              { label: 'Book list', value: 'books' },
              { label: 'Uniform', value: 'uniform' },
              { label: 'Holiday list / Calendar', value: 'holidays' },
              { label: 'Forms', value: 'forms' },
              { label: 'Circulars', value: 'circulars' },
              { label: 'Other', value: 'other' },
            ],
          },
          { name: 'classes', label: 'Classes', type: 'text', half: true, placeholder: 'e.g. Class I – V' },
          { name: 'date', label: 'Date', type: 'date', half: true },
          { name: 'order', label: 'Display order', type: 'number', half: true },
          { name: 'file', label: 'File (PDF)', type: 'file', accept: 'application/pdf,image/*' },
          { name: 'link', label: 'Or a link (instead of a file)', type: 'text', help: 'e.g. /admissions/apply or a Google Drive link' },
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
          {
            name: 'videos',
            label: 'YouTube videos',
            type: 'array',
            itemLabel: 'Video',
            fields: [{ name: 'url', label: 'YouTube link', type: 'url', required: true }],
          },
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
          {
            name: 'points',
            label: 'Highlights',
            type: 'array',
            itemLabel: 'Highlight',
            fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
          },
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
    slug: 'site-pages',
    label: 'Pages & Menu',
    group: 'Pages',
    icon: 'list',
    description:
      'Turn whole pages on or off and change their heading and intro. A page that is off returns "Page not found" and disappears from the menu, footer and homepage links.',
    sections: sitePageSections(),
  },
  {
    slug: 'home-page',
    label: 'Home Page',
    group: 'Pages',
    icon: 'house',
    description: 'Every homepage section in order. Use the switch on a section to show or hide it on the website. Wrap words in *stars* to colour them.',
    sections: [
      blockSection(
        'home-page',
        'hero',
        [
          {
            name: 'heroTitle',
            label: 'Headline',
            type: 'text',
            placeholder: 'Proud of our *achievers*, ready for _yours._',
            help: '*stars* = blue, _underscores_ = red.',
          },
          {
            name: 'heroPoints',
            label: 'Points',
            type: 'array',
            itemLabel: 'Point',
            max: 4,
            fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
          },
          { name: 'resultsYear', label: 'Results year (Board Toppers panel)', type: 'text', half: true, placeholder: '2025–26' },
          { name: 'heroImage', label: 'Background photo', type: 'image' },
        ],
        'Board toppers shown here come from School → Achievers & Toppers ("Show in homepage hero").',
      ),
      blockSection('home-page', 'quick', [
        {
          name: 'quickBoxes',
          label: 'Boxes',
          type: 'array',
          itemLabel: 'Box',
          max: 4,
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            {
              name: 'links',
              label: 'Links',
              type: 'array',
              itemLabel: 'Link',
              max: 5,
              fields: [
                { name: 'label', label: 'Text', type: 'text', required: true, half: true },
                { name: 'href', label: 'Link', type: 'text', required: true, half: true, placeholder: '/about' },
              ],
            },
          ],
        },
      ]),
      blockSection('home-page', 'about', [
        { name: 'aboutTitle', label: 'Heading', type: 'text', help: 'Wrap words in *stars* to colour them.' },
        { name: 'aboutText', label: 'Text', type: 'textarea', rows: 6, help: 'Separate paragraphs with an empty line.' },
        {
          name: 'aboutPoints',
          label: 'Tick points',
          type: 'array',
          itemLabel: 'Point',
          max: 6,
          fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
        },
        { name: 'aboutImage', label: 'Photo', type: 'image' },
      ]),
      blockSection('home-page', 'stats', [
        {
          name: 'stats',
          label: 'Counters (also shown in the hero)',
          type: 'array',
          itemLabel: 'Counter',
          max: 4,
          fields: [
            { name: 'value', label: 'Value', type: 'text', required: true, half: true, placeholder: '2400+' },
            { name: 'label', label: 'Label', type: 'text', required: true, half: true },
          ],
        },
      ]),
      blockSection('home-page', 'why', [
        { name: 'whyTitle', label: 'Heading', type: 'text', help: 'Wrap words in *stars* to colour them.' },
        { name: 'whyText', label: 'Intro text', type: 'textarea', rows: 2 },
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
      ]),
      blockSection(
        'home-page',
        'message',
        [
          { name: 'messageName', label: 'Name', type: 'text', half: true },
          { name: 'messageRole', label: 'Designation', type: 'text', half: true },
          { name: 'messagePhoto', label: 'Photo', type: 'image' },
          { name: 'messageText', label: 'Message', type: 'textarea', rows: 8 },
        ],
        'The same message is shown on the About page.',
      ),
      blockSection('home-page', 'updates', [], 'Notices come from Updates → Notices, activities from Updates → News & Events.'),
      blockSection('home-page', 'achievers', [], 'Shows achievers ticked "Featured" in School → Achievers & Toppers.'),
      blockSection('home-page', 'facilities', [], 'Cards come from School → Facilities.'),
      blockSection('home-page', 'gallery', [], 'Photos come from Updates → Gallery.'),
      blockSection('home-page', 'testimonials', [], 'Quotes come from School → Testimonials.'),
      blockSection('home-page', 'calendar', [
        { name: 'calendarImage', label: 'Calendar image (this month)', type: 'image' },
        { name: 'calendarFile', label: 'Full calendar (PDF)', type: 'file', accept: 'application/pdf' },
      ]),
      blockSection('home-page', 'faq', [], 'Questions come from Pages → Admissions Page → FAQs.'),
      blockSection(
        'home-page',
        'cta',
        [
          { name: 'ctaTitle', label: 'Heading', type: 'text' },
          { name: 'ctaText', label: 'Text', type: 'textarea', rows: 2 },
        ],
        'The admission session (e.g. 2027–28) is added after the label automatically.',
      ),
    ],
  },
  {
    slug: 'about-page',
    label: 'About Page',
    group: 'Pages',
    icon: 'info',
    description: 'Page heading and intro are in Settings → Pages & Menu.',
    sections: [
      blockSection('about-page', 'story', [
        { name: 'heroImage', label: 'Photo', type: 'image' },
        { name: 'story', label: 'Our story', type: 'textarea', rows: 8, help: 'Separate paragraphs with an empty line.' },
      ]),
      blockSection('about-page', 'vision', [
        { name: 'vision', label: 'Vision', type: 'textarea', rows: 3, half: true },
        { name: 'mission', label: 'Mission', type: 'textarea', rows: 3, half: true },
      ]),
      blockSection('about-page', 'values', [
        {
          name: 'values',
          label: 'Core values',
          type: 'array',
          itemLabel: 'Value',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, half: true },
            { name: 'text', label: 'Text', type: 'text', half: true },
          ],
        },
      ]),
      blockSection('about-page', 'journey', [
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
      ]),
      blockSection('about-page', 'message', [], "Name, photo and message are edited in Pages → Home Page → Director's message."),
      blockSection(
        'about-page',
        'leaders',
        [
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
        'Shown only when more than one leader is listed.',
      ),
      blockSection('about-page', 'visit'),
    ],
  },
  {
    slug: 'academics-page',
    label: 'Academics Page',
    group: 'Pages',
    icon: 'graduation',
    description: 'Page heading and intro are in Settings → Pages & Menu.',
    sections: [
      blockSection('academics-page', 'stages', [
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
            {
              name: 'focus',
              label: 'Focus points',
              type: 'array',
              itemLabel: 'Point',
              fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
            },
          ],
        },
      ]),
      blockSection('academics-page', 'approach', [
        {
          name: 'approach',
          label: 'Cards',
          type: 'array',
          itemLabel: 'Item',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, half: true },
            { name: 'icon', label: 'Icon', type: 'icon', half: true },
            { name: 'text', label: 'Text', type: 'text' },
          ],
        },
      ]),
      blockSection('academics-page', 'activities', [
        {
          name: 'cocurricular',
          label: 'Activities',
          type: 'array',
          itemLabel: 'Activity',
          fields: [{ name: 'name', label: 'Name', type: 'text', required: true }],
        },
      ]),
    ],
  },
  {
    slug: 'admissions-page',
    label: 'Admissions Page',
    group: 'Pages',
    icon: 'pencil',
    description: 'Page heading and intro are in Settings → Pages & Menu.',
    sections: [
      {
        title: 'Session',
        fields: [
          {
            name: 'session',
            label: 'Admission session',
            type: 'text',
            half: true,
            placeholder: '2027–28',
            help: 'Shown in the page heading, popup banner and online form.',
          },
        ],
      },
      blockSection('admissions-page', 'apply'),
      blockSection('admissions-page', 'steps', [
        {
          name: 'steps',
          label: 'Steps',
          type: 'array',
          itemLabel: 'Step',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, half: true },
            { name: 'text', label: 'Text', type: 'text', half: true },
          ],
        },
      ]),
      blockSection('admissions-page', 'criteria', [
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
        {
          name: 'documentsRequired',
          label: 'Documents required',
          type: 'array',
          itemLabel: 'Document',
          fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
        },
        { name: 'feeStructure', label: 'Fee structure (PDF)', type: 'file', accept: 'application/pdf', half: true },
        { name: 'prospectus', label: 'Prospectus (PDF)', type: 'file', accept: 'application/pdf', half: true },
      ]),
      blockSection('admissions-page', 'enquiry'),
      blockSection(
        'admissions-page',
        'faq',
        [
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
        'These questions are also shown on the homepage and the Rules page.',
      ),
    ],
  },
  {
    slug: 'disclosure',
    label: 'Mandatory Disclosure',
    group: 'CBSE Corner',
    icon: 'clipboard',
    description: 'CBSE Appendix-IX tables. Turn the page on/off in Settings → Pages & Menu.',
    sections: [
      {
        title: 'Disclosure',
        fields: [
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
    slug: 'transport-page',
    label: 'Transport Page',
    group: 'Pages',
    icon: 'bus',
    description: 'Page heading and intro are in Settings → Pages & Menu.',
    sections: [
      blockSection('transport-page', 'overview', [{ name: 'image', label: 'Photo', type: 'image' }]),
      blockSection('transport-page', 'routes', [
        {
          name: 'routes',
          label: 'Bus routes',
          type: 'array',
          itemLabel: 'Route',
          fields: [
            { name: 'routeNo', label: 'Route No.', type: 'text', required: true, half: true, placeholder: 'Route 1' },
            { name: 'name', label: 'Route name / area', type: 'text', required: true, half: true },
            { name: 'stops', label: 'Stops (one per line)', type: 'textarea', rows: 4 },
            { name: 'pickup', label: 'Morning pickup starts', type: 'text', half: true, placeholder: '6:45 AM' },
            { name: 'drop', label: 'Afternoon drop', type: 'text', half: true, placeholder: '2:00 PM' },
            { name: 'contact', label: 'Route in-charge phone', type: 'text', half: true },
          ],
        },
      ]),
      blockSection('transport-page', 'rules', [
        { name: 'rules', label: 'Transport rules', type: 'array', itemLabel: 'Rule', fields: [{ name: 'text', label: 'Rule', type: 'text', required: true }] },
        { name: 'feeNote', label: 'Fee note', type: 'textarea', rows: 2 },
      ]),
    ],
  },
  {
    slug: 'school-info',
    label: 'Rules, Timings & Uniform',
    group: 'Pages',
    icon: 'info',
    description: 'Page heading and intro are in Settings → Pages & Menu.',
    sections: [
      blockSection('school-info', 'timings', [
        {
          name: 'timings',
          label: 'Timings table',
          type: 'array',
          itemLabel: 'Row',
          fields: [
            { name: 'label', label: 'Item', type: 'text', required: true },
            { name: 'summer', label: 'Summer', type: 'text', half: true },
            { name: 'winter', label: 'Winter', type: 'text', half: true },
          ],
        },
        { name: 'timingNote', label: 'Note', type: 'textarea', rows: 2 },
      ]),
      blockSection('school-info', 'uniform', [
        {
          name: 'uniforms',
          label: 'Uniform',
          type: 'array',
          itemLabel: 'Uniform set',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Summer uniform' },
            { name: 'boys', label: 'Boys (one item per line)', type: 'textarea', rows: 4, half: true },
            { name: 'girls', label: 'Girls (one item per line)', type: 'textarea', rows: 4, half: true },
          ],
        },
        { name: 'uniformNote', label: 'Note', type: 'textarea', rows: 2 },
      ]),
      blockSection('school-info', 'rules', [
        {
          name: 'ruleGroups',
          label: 'Rules',
          type: 'array',
          itemLabel: 'Rule group',
          fields: [
            { name: 'title', label: 'Heading', type: 'text', required: true },
            { name: 'items', label: 'Rules (one per line)', type: 'textarea', rows: 5 },
          ],
        },
      ]),
      blockSection('school-info', 'faq', [], 'Questions come from Pages → Admissions Page → FAQs.'),
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
