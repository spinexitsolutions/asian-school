/**
 * Default copy for the website. The live site always prefers what staff enter
 * in the admin panel; these values only fill gaps (fresh install, empty field,
 * or the database being briefly unreachable). The seed script also uses them.
 *
 * NOTE: numbers, names and dates below are placeholders — replace them from
 * the admin panel with the school's real details.
 */

export const defaultSettings = {
  schoolName: 'The Asian School',
  location: 'Chomu, Jaipur',
  tagline: 'Rooted in values. Ready for the world.',
  affiliation: '',
  established: '',
  phone: '+91 90000 00000',
  altPhone: '',
  whatsapp: '',
  email: 'info@asianschoolchomu.in',
  address: 'Chomu, Jaipur District, Rajasthan 303702',
  officeHours: 'Mon – Sat · 8:00 AM – 2:30 PM',
  mapEmbedUrl: '',
  facebook: '',
  instagram: '',
  youtube: '',
  x: '',
  announcementEnabled: true,
  announcementText: 'Admissions open for session 2027–28 · Nursery to Class XI',
  announcementLink: '/admissions',
  metaDescription:
    'The Asian School, Chomu — a progressive English-medium school nurturing curious, confident and kind learners from Nursery to Class XII.',
}

export const defaultHome = {
  heroEyebrow: 'Admissions open · Session 2027–28',
  heroTitle: 'Where curious minds *bloom* into confident leaders.',
  heroText:
    'A school in the heart of Chomu where rigorous academics, joyful discovery and timeless Indian values come together — so every child leaves ready for the world, and rooted at home.',
  stats: [
    { value: '1,200+', label: 'Learners on campus' },
    { value: '80+', label: 'Dedicated educators' },
    { value: '100%', label: 'Board results, every year' },
    { value: '25:1', label: 'Student–teacher ratio' },
  ],
  introTitle: 'An education that sees the *whole* child.',
  introText:
    'At The Asian School we believe a great school is measured not only by marks, but by the curiosity it sparks and the character it shapes. Our classrooms are bright, our teachers are mentors, and our campus is a place where children feel safe enough to ask big questions — and brave enough to chase the answers.',
  pillars: [
    {
      title: 'Academic Excellence',
      text: 'A concept-first curriculum, smart classrooms and regular assessments that build deep understanding — not rote learning.',
      icon: 'book',
    },
    {
      title: 'Values & Character',
      text: 'Respect, honesty and empathy are woven into daily life through assemblies, mentoring and community service.',
      icon: 'heart',
    },
    {
      title: 'Sports & Fitness',
      text: 'Spacious grounds, trained coaches and inter-school competitions keep young bodies active and spirits strong.',
      icon: 'trophy',
    },
    {
      title: 'Arts & Expression',
      text: 'Music, dance, theatre and visual arts give every child a stage to discover their voice.',
      icon: 'palette',
    },
    {
      title: 'Future Skills',
      text: 'Computer labs, robotics, public speaking and life skills prepare learners for a fast-changing world.',
      icon: 'computer',
    },
    {
      title: 'Safe Campus',
      text: 'CCTV coverage, GPS-enabled transport and caring staff ensure peace of mind for every parent.',
      icon: 'shield',
    },
  ],
  principalName: 'Principal’s Name',
  principalRole: 'Principal, The Asian School',
  principalMessage:
    'Every child who walks through our gates carries a unique spark. Our role is to protect that spark, feed it with knowledge and give it direction through values. We are proud to partner with parents in raising young people who are capable, compassionate and confident — and who never stop learning.',
  ctaTitle: 'Give your child a *beginning* worth remembering.',
  ctaText: 'Visit our campus, meet our teachers and see the difference for yourself. Our admissions team will be happy to guide you.',
}

export const defaultAbout = {
  title: 'A school with *roots* and wings.',
  intro:
    'Founded with a simple belief — that children from Chomu deserve a world-class education close to home — The Asian School has grown into one of the region’s most trusted names in learning.',
  story:
    'What began as a small school with a handful of classrooms has grown into a vibrant campus that welcomes over a thousand learners each year. Through every stage of that growth, one thing has stayed constant: our promise to know every child by name and nurture them as our own.\n\nToday our students learn in smart classrooms, experiment in well-equipped laboratories, read in a spacious library and play on expansive grounds. Yet the heart of the school remains its people — teachers who mentor, parents who partner, and students who inspire us every day.',
  vision:
    'To be a centre of excellence that nurtures globally competent, ethically grounded and joyful learners who contribute meaningfully to society.',
  mission:
    'To provide a stimulating, safe and inclusive environment where every child is encouraged to think critically, act responsibly, and grow academically, socially and emotionally.',
  values: [
    { title: 'Curiosity', text: 'We ask questions, explore ideas and love learning for its own sake.' },
    { title: 'Integrity', text: 'We are honest in word and deed, even when no one is watching.' },
    { title: 'Respect', text: 'We value every person, every culture and our shared environment.' },
    { title: 'Excellence', text: 'We give our best effort and keep raising our own bar.' },
  ],
  timeline: [
    { year: 'Year 1', title: 'The first bell', text: 'The school opens its doors with a small, determined family of students and teachers.' },
    { year: 'Year 5', title: 'Growing up', text: 'New academic block, science laboratories and a dedicated library are added.' },
    { year: 'Year 10', title: 'Senior wing', text: 'Senior secondary classes introduced with Science, Commerce and Humanities streams.' },
    { year: 'Year 15', title: 'Smart campus', text: 'Every classroom becomes a smart classroom; transport fleet fully GPS-enabled.' },
    { year: 'Today', title: 'Looking ahead', text: 'A thriving community of 1,200+ learners, and the journey has only just begun.' },
  ],
  leaders: [
    {
      name: 'Chairperson’s Name',
      role: 'Chairperson',
      message: 'Education is the most powerful gift we can give a child. We are committed to making that gift exceptional.',
    },
    {
      name: 'Director’s Name',
      role: 'Director',
      message: 'We blend modern pedagogy with Indian values so our children grow with both roots and wings.',
    },
    {
      name: 'Principal’s Name',
      role: 'Principal',
      message: 'Our doors, and our hearts, are always open to every child and every parent.',
    },
  ],
}

export const defaultAcademics = {
  title: 'Learning that goes *deeper*.',
  intro:
    'From the first scribble to the final board exam, our curriculum is designed in stages — each one building on the last, each one tuned to how children actually learn at that age.',
  stages: [
    {
      name: 'Foundational Years',
      classes: 'Nursery – UKG',
      text: 'Play-based, activity-rich learning that builds language, numeracy, motor skills and — above all — a love for school.',
      focus: [{ text: 'Phonics & storytelling' }, { text: 'Montessori-inspired play' }, { text: 'Music & movement' }],
    },
    {
      name: 'Primary Years',
      classes: 'Class I – V',
      text: 'Strong fundamentals in English, Hindi, Mathematics and EVS with hands-on projects that make concepts stick.',
      focus: [{ text: 'Concept-based maths' }, { text: 'Reading programme' }, { text: 'Computer literacy' }],
    },
    {
      name: 'Middle Years',
      classes: 'Class VI – VIII',
      text: 'Subject specialists, lab work and inquiry projects help students think independently and connect ideas.',
      focus: [{ text: 'Science labs' }, { text: 'Third language' }, { text: 'Coding & robotics' }],
    },
    {
      name: 'Senior Years',
      classes: 'Class IX – XII',
      text: 'Focused board preparation with Science, Commerce and Humanities streams, career guidance and competitive-exam support.',
      focus: [{ text: 'Board-exam mentoring' }, { text: 'Career counselling' }, { text: 'JEE / NEET foundation' }],
    },
  ],
  approach: [
    { title: 'Smart Classrooms', text: 'Interactive digital boards bring every lesson to life.', icon: 'computer' },
    { title: 'Experiential Learning', text: 'Projects, experiments and field trips over memorisation.', icon: 'flask' },
    { title: 'Personal Mentoring', text: 'Small groups and regular parent–teacher conversations.', icon: 'users' },
    { title: 'Continuous Assessment', text: 'Frequent, low-stress checks that guide teaching.', icon: 'cap' },
  ],
  cocurricular: [
    { name: 'Classical & Western Dance' },
    { name: 'Vocal & Instrumental Music' },
    { name: 'Theatre & Dramatics' },
    { name: 'Art & Craft' },
    { name: 'Debate & Public Speaking' },
    { name: 'Robotics Club' },
    { name: 'Yoga & Meditation' },
    { name: 'Eco Club' },
    { name: 'Quiz Club' },
    { name: 'Athletics' },
    { name: 'Cricket & Football' },
    { name: 'Chess' },
  ],
}

export const defaultAdmissions = {
  title: 'Begin your child’s *journey* with us.',
  intro:
    'We welcome applications from families who share our belief in curious, value-driven education. The process is simple, transparent and personal.',
  session: '2027–28',
  steps: [
    { title: 'Enquire', text: 'Fill the online enquiry form below or visit the school office.' },
    { title: 'Campus visit', text: 'Tour the campus and meet our admissions counsellor.' },
    { title: 'Interaction', text: 'A friendly interaction / assessment appropriate to the class.' },
    { title: 'Confirmation', text: 'Submit documents and fees to confirm the seat.' },
  ],
  eligibility: [
    { className: 'Nursery', age: '3+ years' },
    { className: 'LKG', age: '4+ years' },
    { className: 'UKG', age: '5+ years' },
    { className: 'Class I', age: '6+ years' },
  ],
  documentsRequired: [
    { text: 'Birth certificate (copy)' },
    { text: 'Aadhaar card of student and parents' },
    { text: 'Four passport-size photographs of the student' },
    { text: 'Transfer certificate (Class II onwards)' },
    { text: 'Report card of the previous class' },
  ],
  faqs: [
    {
      question: 'When do admissions open?',
      answer: 'Admissions for the new session usually open in November. Seats are limited, so we recommend enquiring early.',
    },
    {
      question: 'Is school transport available?',
      answer: 'Yes. Our GPS-enabled buses cover Chomu and nearby villages with trained drivers and attendants.',
    },
    {
      question: 'Do you offer sibling or merit concessions?',
      answer: 'Please contact the admissions office for current concession policies.',
    },
  ],
}

export const defaultFacilities = [
  {
    title: 'Smart Classrooms',
    summary: 'Airy, well-lit classrooms with interactive digital boards that make every lesson visual and engaging.',
    icon: 'computer',
    points: ['Interactive panels', 'Ergonomic furniture', 'Natural ventilation'],
  },
  {
    title: 'Science Laboratories',
    summary: 'Fully equipped Physics, Chemistry and Biology labs where students learn by doing.',
    icon: 'flask',
    points: ['Separate labs for each science', 'Safety-first design', 'Regular practicals'],
  },
  {
    title: 'Library',
    summary: 'A calm reading space with thousands of books, magazines and reference titles for every age.',
    icon: 'library',
    points: ['Reading programme', 'Reference section', 'Periodicals'],
  },
  {
    title: 'Computer Lab',
    summary: 'Modern computers and high-speed internet for coding, research and digital literacy.',
    icon: 'computer',
    points: ['1:1 systems', 'Coding & robotics', 'Supervised internet'],
  },
  {
    title: 'Sports Grounds',
    summary: 'Expansive outdoor fields and courts for cricket, football, athletics, basketball and more.',
    icon: 'trophy',
    points: ['Trained coaches', 'Annual sports meet', 'Indoor games'],
  },
  {
    title: 'Safe Transport',
    summary: 'GPS-enabled buses with trained drivers and attendants covering Chomu and nearby areas.',
    icon: 'bus',
    points: ['GPS tracking', 'Female attendants', 'Wide route network'],
  },
  {
    title: 'Music & Arts Studio',
    summary: 'Dedicated spaces for music, dance and visual arts where creativity takes centre stage.',
    icon: 'music',
    points: ['Instruments', 'Dance studio', 'Art room'],
  },
  {
    title: 'Security & Care',
    summary: 'CCTV coverage, controlled entry and an infirmary for complete peace of mind.',
    icon: 'shield',
    points: ['CCTV campus', 'First-aid room', 'Visitor management'],
  },
]

export const defaultTestimonials = [
  {
    quote:
      'The teachers genuinely know my daughter — her strengths and the things she finds hard. That personal attention has made all the difference in her confidence.',
    name: 'Parent',
    relation: 'Parent of a Class IV student',
  },
  {
    quote:
      'From the annual day to science exhibitions, my son gets a stage to try everything. He comes home excited about school every single day.',
    name: 'Parent',
    relation: 'Parent of a Class VII student',
  },
  {
    quote:
      'The school prepared me not just for boards but for life — public speaking, discipline and the habit of asking questions.',
    name: 'Alumnus',
    relation: 'Class XII graduate',
  },
]

export const defaultDisclosure = {
  enabled: true,
  sections: [
    {
      heading: 'General Information',
      rows: [
        { label: 'Name of the school', value: 'The Asian School' },
        { label: 'Affiliation number', value: 'To be updated' },
        { label: 'School code', value: 'To be updated' },
        { label: 'Complete address with pin code', value: 'Chomu, Jaipur District, Rajasthan 303702' },
        { label: 'Principal name & qualification', value: 'To be updated' },
        { label: 'School email ID', value: 'info@asianschoolchomu.in' },
        { label: 'Contact details', value: '+91 90000 00000' },
      ],
    },
    {
      heading: 'Documents and Information',
      rows: [
        { label: 'Copies of affiliation / upgradation letter', value: 'To be uploaded' },
        { label: 'Society / Trust registration certificate', value: 'To be uploaded' },
        { label: 'No Objection Certificate (NOC)', value: 'To be uploaded' },
        { label: 'Recognition certificate under RTE Act', value: 'To be uploaded' },
        { label: 'Building safety certificate', value: 'To be uploaded' },
        { label: 'Fire safety certificate', value: 'To be uploaded' },
        { label: 'Water, health and sanitation certificates', value: 'To be uploaded' },
      ],
    },
    {
      heading: 'Staff (Teaching)',
      rows: [
        { label: 'Principal', value: '1' },
        { label: 'Total number of teachers', value: 'To be updated' },
        { label: 'Teacher–student ratio', value: 'To be updated' },
        { label: 'Details of special educator', value: 'To be updated' },
      ],
    },
    {
      heading: 'School Infrastructure',
      rows: [
        { label: 'Total campus area (sq. m.)', value: 'To be updated' },
        { label: 'Number and size of classrooms', value: 'To be updated' },
        { label: 'Number and size of laboratories', value: 'To be updated' },
        { label: 'Internet facility', value: 'Yes' },
        { label: 'Number of girls’ toilets', value: 'To be updated' },
        { label: 'Number of boys’ toilets', value: 'To be updated' },
      ],
    },
  ],
}
