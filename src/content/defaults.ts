/**
 * Default copy for the website. The live site always prefers what staff enter
 * in the admin panel; these values only fill gaps (fresh install, empty field,
 * or the database being briefly unreachable). The seed script also uses them.
 *
 * Contact details, director's message and numbers come from the school's
 * existing site. Items marked "To be updated" need real data from the school.
 */

export const fallbackImages = {
  logo: '/images/logo.png',
  campus: '/images/campus.webp',
  director: '/images/director.webp',
}

export const defaultSettings = {
  schoolName: 'The Asian International School',
  location: 'Radha Swami Bagh, Chomu, Jaipur',
  tagline: 'Nurturing bright minds for a better tomorrow.',
  affiliation: 'CBSE Affiliated',
  established: '2010',
  phone: '+91 98297 51651',
  altPhone: '+91 99296 05547',
  whatsapp: '919829751651',
  email: 'asianchomu@gmail.com',
  address: 'Near Barala Hospital, Radha Swami Bagh, Chomu, Rajasthan – 303704',
  officeHours: 'Mon – Sat · 8:00 AM – 3:00 PM',
  mapEmbedUrl: '',
  facebook: '',
  instagram: '',
  youtube: '',
  x: '',
  topbarText: 'Your Search Will End Here!',
  announcementEnabled: true,
  announcementText: 'Admissions open for session 2027–28 · Nursery to Class XI',
  announcementLink: '/admissions',
  metaDescription:
    'The Asian International School, Chomu (Jaipur) — CBSE affiliated English medium school from Nursery to Class XII with Science, Arts & Commerce. Est. 2010.',
}

export const defaultHome = {
  heroTitle: 'Proud of our *achievers*, ready for _yours._',
  heroPoints: [
    { text: 'CBSE affiliated English medium school' },
    { text: 'Science, Arts & Commerce up to Class XII' },
    { text: 'Smart classes & experienced faculty' },
  ],
  resultsYear: '2025–26',
  stats: [
    { value: '2400+', label: 'Students' },
    { value: '98%', label: 'Board Results' },
    { value: '150+', label: 'Faculty Members' },
    { value: '15+', label: 'Years of Excellence' },
  ],
  aboutTitle: 'Building Future Leaders Through Quality Education',
  aboutText:
    'At The Asian International School, we are committed to providing a nurturing and inspiring learning environment where every student is encouraged to discover their true potential. As a CBSE-affiliated English Medium School, we focus on academic excellence while promoting creativity, critical thinking, discipline, and strong moral values.\n\nWe believe that education goes beyond textbooks. Through modern teaching methodologies, smart classrooms, experienced faculty, co-curricular activities, sports, cultural programs, and a safe campus environment, we ensure the holistic development of every child.',
  whyTitle: 'Why Parents Trust The Asian International School',
  whyText:
    'A safe, inspiring and student-focused environment where every child develops academically, socially and emotionally.',
  pillars: [
    { title: 'CBSE Curriculum', text: 'Structured CBSE curriculum designed to build strong academic foundations and conceptual understanding.', icon: 'book' },
    { title: 'Qualified Faculty', text: "Experienced and passionate educators dedicated to every student's academic and personal growth.", icon: 'users' },
    { title: 'Smart Learning', text: 'Modern digital classrooms equipped with smart technology for interactive and effective learning.', icon: 'computer' },
    { title: 'Safe & Secure Campus', text: 'A disciplined campus with CCTV surveillance, safety measures and a positive learning environment.', icon: 'shield' },
    { title: 'Sports & Activities', text: 'Excellent sports facilities and co-curricular activities that encourage teamwork and leadership.', icon: 'trophy' },
    { title: 'Holistic Development', text: 'Equal focus on academics, life skills, values, creativity and personality development.', icon: 'heart' },
  ],
  messageHeading: "Director's Message",
  messageName: 'Shri Kaajod Mal Revar',
  messageRole: 'Director, The Asian International School',
  messageText:
    'Welcome to The Asian International School. We believe that every child is unique and has the ability to achieve excellence when guided with the right values, knowledge and opportunities. Our aim is to provide an inspiring learning environment where students develop confidence, creativity, discipline and a lifelong love for learning.\n\nAt our school, education goes beyond academics. We focus on the overall development of every child by nurturing intellectual, physical, emotional and moral growth. Through experienced teachers, modern infrastructure and value-based education, we prepare our students to become responsible citizens and future leaders.\n\nI sincerely thank all parents for their trust and support. Together, let us continue to inspire young minds, encourage excellence and build a brighter future for every child.',
  ctaTitle: 'Give Your Child The Best Start For A Bright Future',
  ctaText:
    'Join The Asian International School and provide your child with quality education, modern facilities and holistic development opportunities.',
}

export const defaultAbout = {
  title: 'About Our School',
  intro:
    'The Asian International School, Chomu is a CBSE-affiliated English medium school established in 2010, offering education from Nursery to Class XII in Science, Arts and Commerce.',
  story:
    'Since 2010, The Asian International School has been committed to providing a nurturing and inspiring learning environment where every student is encouraged to discover their true potential. Today more than 2,400 students learn on our campus at Radha Swami Bagh, Chomu.\n\nAs a CBSE-affiliated English Medium School, we focus on academic excellence while promoting creativity, critical thinking, discipline and strong moral values. Our goal is to empower students with the knowledge, confidence and life skills required to become responsible global citizens and future leaders.\n\nThrough modern teaching methodologies, smart classrooms, experienced faculty, co-curricular activities, sports, cultural programmes and a safe campus, we ensure the holistic development of every child — creating lifelong learners prepared to meet an ever-changing world with confidence, integrity and compassion.',
  vision: 'To empower young minds to be lifelong learners and responsible global citizens.',
  mission:
    'To provide quality, value-based education in a safe and inspiring environment where every child grows academically, socially, emotionally and morally.',
  values: [
    { title: 'Excellence', text: 'We give our best in academics, sports and every activity.' },
    { title: 'Discipline', text: 'Good habits and self-control shape strong character.' },
    { title: 'Integrity', text: 'We are honest in word and deed.' },
    { title: 'Respect', text: 'We value every person, every culture and our environment.' },
  ],
  timeline: [
    { year: '2010', title: 'Foundation', text: 'The Asian International School opens its doors in Chomu.' },
    { year: 'CBSE', title: 'Affiliation', text: 'Affiliated to the Central Board of Secondary Education, New Delhi.' },
    { year: 'XII', title: 'Senior Secondary', text: 'Science, Arts and Commerce streams introduced up to Class XII.' },
    { year: 'Today', title: '2400+ students', text: 'A thriving community of students, teachers and parents.' },
  ],
  leaders: [
    {
      name: 'Shri Kaajod Mal Revar',
      role: 'Director',
      message:
        'Every child is unique and has the ability to achieve excellence when guided with the right values, knowledge and opportunities.',
    },
  ],
}

export const defaultAcademics = {
  title: 'Academics',
  intro:
    'We follow the CBSE curriculum from Nursery to Class XII, with Science, Arts and Commerce streams at the senior secondary level.',
  stages: [
    {
      name: 'Pre-Primary',
      classes: 'Nursery – UKG',
      text: 'Play-way and activity-based learning that builds language, numbers, motor skills and a love for school.',
      focus: [{ text: 'Phonics & rhymes' }, { text: 'Activity-based learning' }, { text: 'Art, music & play' }],
    },
    {
      name: 'Primary',
      classes: 'Class I – V',
      text: 'Strong foundations in English, Hindi, Mathematics and EVS with projects that make concepts clear.',
      focus: [{ text: 'Reading & writing skills' }, { text: 'Concept-based maths' }, { text: 'Computer basics' }],
    },
    {
      name: 'Middle',
      classes: 'Class VI – VIII',
      text: 'Subject teachers, lab work and projects help students think independently and understand deeply.',
      focus: [{ text: 'Science labs' }, { text: 'Sanskrit / third language' }, { text: 'Computer & coding' }],
    },
    {
      name: 'Secondary & Senior Secondary',
      classes: 'Class IX – XII',
      text: 'Focused CBSE board preparation with Science, Arts and Commerce streams and career guidance.',
      focus: [{ text: 'Board exam preparation' }, { text: 'Science · Arts · Commerce' }, { text: 'Career counselling' }],
    },
  ],
  approach: [
    { title: 'Smart Classrooms', text: 'Digital boards make every lesson visual and interactive.', icon: 'computer' },
    { title: 'Practical Learning', text: 'Labs, projects and activities over rote learning.', icon: 'flask' },
    { title: 'Personal Attention', text: 'Regular tests and parent–teacher meetings.', icon: 'users' },
    { title: 'Values Education', text: 'Discipline, manners and moral values every day.', icon: 'heart' },
  ],
  cocurricular: [
    { name: 'Dance' },
    { name: 'Music' },
    { name: 'Art & Craft' },
    { name: 'Debate & Elocution' },
    { name: 'Yoga' },
    { name: 'Quiz' },
    { name: 'Science Exhibition' },
    { name: 'Athletics' },
    { name: 'Cricket' },
    { name: 'Football' },
    { name: 'Kabaddi' },
    { name: 'Chess' },
  ],
}

export const defaultAdmissions = {
  title: 'Admissions',
  intro:
    'Admissions are open from Nursery to Class XI. Fill the enquiry form and our admission team will call you back.',
  session: '2027–28',
  steps: [
    { title: 'Enquiry', text: 'Fill the online enquiry form or visit the school office.' },
    { title: 'Campus Visit', text: 'Visit the campus and meet our admission counsellor.' },
    { title: 'Interaction / Test', text: 'A simple interaction or test as per the class.' },
    { title: 'Admission', text: 'Submit the documents and fee to confirm the seat.' },
  ],
  eligibility: [
    { className: 'Nursery', age: '3+ years' },
    { className: 'LKG', age: '4+ years' },
    { className: 'UKG', age: '5+ years' },
    { className: 'Class I', age: '6+ years' },
  ],
  documentsRequired: [
    { text: 'Birth certificate' },
    { text: 'Aadhaar card of student and parents' },
    { text: '4 passport-size photographs of the student' },
    { text: 'Transfer Certificate (Class II onwards)' },
    { text: 'Previous class report card' },
  ],
  faqs: [
    { question: 'Which board is the school affiliated to?', answer: 'The school is affiliated to CBSE, New Delhi, and follows the CBSE curriculum.' },
    { question: 'Which classes are available?', answer: 'Nursery to Class XII. Class XI and XII offer Science, Arts and Commerce streams.' },
    { question: 'Is school transport available?', answer: 'Yes, school buses cover Chomu and nearby areas. Please contact the office for routes.' },
    { question: 'What are the school timings?', answer: 'Monday to Saturday, 8:00 AM to 3:00 PM (office hours).' },
  ],
}

export const defaultFacilities = [
  { title: 'Smart Classrooms', summary: 'Spacious classrooms with digital smart boards for interactive learning.', icon: 'computer', points: ['Digital boards', 'Comfortable furniture', 'Well ventilated'] },
  { title: 'Science Labs', summary: 'Well-equipped Physics, Chemistry and Biology laboratories for practical learning.', icon: 'flask', points: ['Physics lab', 'Chemistry lab', 'Biology lab'] },
  { title: 'Computer Lab', summary: 'Modern computer laboratories with the latest technology and high-speed internet.', icon: 'computer', points: ['Latest systems', 'Internet', 'Coding classes'] },
  { title: 'Library', summary: 'A rich library with books, journals, magazines and digital learning resources.', icon: 'library', points: ['Reference books', 'Magazines', 'Reading room'] },
  { title: 'Sports Ground', summary: 'Large playground for cricket, football, athletics and many more games.', icon: 'trophy', points: ['Outdoor games', 'Indoor games', 'Annual sports meet'] },
  { title: 'Transport', summary: 'Safe school buses covering Chomu and nearby villages with trained staff.', icon: 'bus', points: ['Wide routes', 'Trained drivers', 'Attendants'] },
  { title: 'CCTV Security', summary: 'Complete campus under CCTV surveillance for safety of every child.', icon: 'camera', points: ['CCTV campus', 'Guarded entry', 'Visitor register'] },
  { title: 'Music & Dance', summary: 'Dedicated activity rooms for music, dance and cultural programmes.', icon: 'music', points: ['Instruments', 'Dance room', 'Annual function'] },
]

export const defaultTestimonials = [
  { quote: 'The teachers give personal attention to every child. My son’s confidence and results have improved a lot.', name: 'Parent', relation: 'Parent of a Class VI student' },
  { quote: 'Clean campus, smart classes and very caring staff. We are very happy with the school.', name: 'Parent', relation: 'Parent of a Class II student' },
  { quote: 'Discipline and values along with studies — this is what we wanted for our daughter.', name: 'Parent', relation: 'Parent of a Class IX student' },
]

export const defaultDisclosure = {
  enabled: true,
  sections: [
    {
      heading: 'A. General Information',
      rows: [
        { label: 'Name of the school', value: 'The Asian International School' },
        { label: 'Affiliation No. (if applicable)', value: 'To be updated' },
        { label: 'School code (if applicable)', value: 'To be updated' },
        { label: 'Complete address with pin code', value: 'Near Barala Hospital, Radha Swami Bagh, Chomu, Rajasthan – 303704' },
        { label: 'Principal name & qualification', value: 'To be updated' },
        { label: 'School email ID', value: 'asianchomu@gmail.com' },
        { label: 'Contact details (landline / mobile)', value: '+91 98297 51651, +91 99296 05547' },
      ],
    },
    {
      heading: 'B. Documents and Information',
      rows: [
        { label: 'Copies of affiliation / upgradation letter and recent extension of affiliation', value: 'To be uploaded' },
        { label: 'Copies of societies / trust / company registration / renewal certificate', value: 'To be uploaded' },
        { label: 'Copy of No Objection Certificate (NOC) issued by the state government / UT', value: 'To be uploaded' },
        { label: 'Copies of recognition certificate under RTE Act, 2009', value: 'To be uploaded' },
        { label: 'Copy of valid building safety certificate as per the national building code', value: 'To be uploaded' },
        { label: 'Copy of valid fire safety certificate issued by the competent authority', value: 'To be uploaded' },
        { label: 'Copy of the DEO certificate submitted by the school for affiliation / upgradation', value: 'To be uploaded' },
        { label: 'Copies of valid water, health and sanitation certificates', value: 'To be uploaded' },
      ],
    },
    {
      heading: 'C. Result and Academics',
      rows: [
        { label: 'Fee structure of the school', value: 'To be uploaded' },
        { label: 'Annual academic calendar', value: 'To be uploaded' },
        { label: 'List of School Management Committee (SMC)', value: 'To be uploaded' },
        { label: 'List of Parents Teachers Association (PTA) members', value: 'To be uploaded' },
        { label: 'Last three-year result of the board examination', value: 'To be uploaded' },
      ],
    },
    {
      heading: 'D. Staff (Teaching)',
      rows: [
        { label: 'Principal', value: 'To be updated' },
        { label: 'Total no. of teachers (PGT / TGT / PRT)', value: 'To be updated' },
        { label: 'Teachers section ratio', value: 'To be updated' },
        { label: 'Details of special educator', value: 'To be updated' },
        { label: 'Details of counsellor and wellness teacher', value: 'To be updated' },
      ],
    },
    {
      heading: 'E. School Infrastructure',
      rows: [
        { label: 'Total campus area of the school (in sq. mtr.)', value: 'To be updated' },
        { label: 'No. and size of the classrooms (in sq. mtr.)', value: 'To be updated' },
        { label: 'No. and size of laboratories including computer labs (in sq. mtr.)', value: 'To be updated' },
        { label: 'Internet facility', value: 'Yes' },
        { label: 'No. of girls toilets', value: 'To be updated' },
        { label: 'No. of boys toilets', value: 'To be updated' },
        { label: 'Link of YouTube video of the inspection of school covering the infrastructure', value: 'To be updated' },
      ],
    },
  ],
}

/** Extra pages created by the seed script (editable in admin → Extra Pages). */
export const defaultPages = [
  {
    title: 'Information of the School',
    slug: 'information-of-the-school',
    intro: 'Key information about The Asian International School, Chomu.',
    rows: [
      ['Name of the school', 'The Asian International School'],
      ['Board', 'Central Board of Secondary Education (CBSE), New Delhi'],
      ['Medium', 'English'],
      ['Classes', 'Nursery to Class XII'],
      ['Streams (XI–XII)', 'Science, Arts & Commerce'],
      ['Established', '2010'],
      ['Type', 'Co-educational'],
      ['Address', 'Near Barala Hospital, Radha Swami Bagh, Chomu, Rajasthan – 303704'],
      ['Phone', '+91 98297 51651, +91 99296 05547'],
      ['Email', 'asianchomu@gmail.com'],
    ],
  },
  {
    title: 'Affiliation Details',
    slug: 'affiliation-details',
    intro: 'Affiliation details of The Asian International School with CBSE, New Delhi.',
    rows: [
      ['Affiliated to', 'Central Board of Secondary Education, New Delhi'],
      ['Affiliation No.', 'To be updated'],
      ['School Code', 'To be updated'],
      ['Status of affiliation', 'To be updated'],
      ['Affiliation valid up to', 'To be updated'],
    ],
  },
]
