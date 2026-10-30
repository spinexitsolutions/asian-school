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

/** Uploaded-image shape for files bundled with the site (shown in the admin panel too). */
const media = (url: string, alt: string, width: number, height: number, thumb?: string) => ({ url, thumb, alt, width, height })
const stock = (name: string, alt: string, width: number, height: number) =>
  media(`/images/stock/${name}.webp`, alt, width, height, `/images/stock/${name}-thumb.webp`)

export const campusMedia = media('/images/campus.webp', 'The Asian International School campus', 1920, 1080)
export const directorMedia = media('/images/director.webp', 'Shri Kaajod Mal Revar, Director', 800, 982)
export const logoMedia = media('/images/logo.png', 'The Asian International School logo', 383, 383)

/** Free stock photos from Unsplash (unsplash.com/license) used until the school's own photos are uploaded. */
export const stockPhotos = {
  art: stock('art', 'Paint brushes and colours in the art room', 1600, 1067),
  athletics: stock('athletics', 'Athlete at the starting line on a running track', 1600, 1067),
  books: stock('books', 'Books with an apple and alphabet blocks', 1600, 1130),
  circleTime: stock('circle-time', 'Young students sitting together during class', 1600, 1065),
  classroomHands: stock('classroom-hands', 'Students raising hands in class', 1600, 1067),
  classroomKids: stock('classroom-kids', 'Students working in groups in a classroom', 1600, 996),
  computer: stock('computer', 'Laptop in the computer lab', 1600, 1067),
  cricket: stock('cricket', 'Cricket ball on the school ground', 1600, 1071),
  digitalLearning: stock('digital-learning', 'Student learning on a tablet', 1600, 1067),
  kidsWriting: stock('kids-writing', 'Children writing in a classroom', 1600, 1065),
  libraryHall: stock('library-hall', 'Rows of books in the library', 1600, 1479),
  libraryReading: stock('library-reading', 'Young student reading in the library', 1600, 1067),
  library: stock('library', 'Library bookshelves', 1600, 1067),
  littleArtist: stock('little-artist', 'Little girl with paint on her face', 1600, 2409),
  scienceLab: stock('science-lab', 'Glassware in the science laboratory', 1600, 1067),
  seniorStudents: stock('senior-students', 'Senior students studying together', 1600, 1067),
  smartClassroom: stock('smart-classroom', 'Smart classroom with desks and board', 1600, 900),
  yoga: stock('yoga', 'Yoga pose at sunrise', 1600, 1009),
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
  logo: logoMedia,
  popupImage: campusMedia,
  popupEnabled: true,
  popupBadge: 'Session 2027–28',
  popupTitle: 'Admissions Open',
  popupText: 'Nursery to Class XI · Science, Arts & Commerce. Limited seats — enquire today and our team will call you back.',
  announcementEnabled: true,
  announcementText: 'Admissions open for session 2027–28 · Nursery to Class XI',
  announcementLink: '/admissions',
  metaDescription:
    'The Asian International School, Chomu (Jaipur) — CBSE affiliated English medium school from Nursery to Class XII with Science, Arts & Commerce. Est. 2010.',
}

/** Shown in the hero until real toppers are marked "Show in homepage hero" in the admin panel. */
export const defaultHeroToppers = [
  { name: 'Topper Name', score: '96.2%', className: 'XII Science' },
  { name: 'Topper Name', score: '95.4%', className: 'XII Commerce' },
  { name: 'Topper Name', score: '95.0%', className: 'X' },
]

export const defaultHome = {
  heroImage: campusMedia,
  aboutImage: stockPhotos.classroomHands,
  messagePhoto: directorMedia,
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
  heroImage: stockPhotos.seniorStudents,
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
      photo: directorMedia,
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
      image: stockPhotos.littleArtist,
      classes: 'Nursery – UKG',
      text: 'Play-way and activity-based learning that builds language, numbers, motor skills and a love for school.',
      focus: [{ text: 'Phonics & rhymes' }, { text: 'Activity-based learning' }, { text: 'Art, music & play' }],
    },
    {
      name: 'Primary',
      image: stockPhotos.kidsWriting,
      classes: 'Class I – V',
      text: 'Strong foundations in English, Hindi, Mathematics and EVS with projects that make concepts clear.',
      focus: [{ text: 'Reading & writing skills' }, { text: 'Concept-based maths' }, { text: 'Computer basics' }],
    },
    {
      name: 'Middle',
      image: stockPhotos.classroomKids,
      classes: 'Class VI – VIII',
      text: 'Subject teachers, lab work and projects help students think independently and understand deeply.',
      focus: [{ text: 'Science labs' }, { text: 'Sanskrit / third language' }, { text: 'Computer & coding' }],
    },
    {
      name: 'Secondary & Senior Secondary',
      image: stockPhotos.seniorStudents,
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
  { title: 'Smart Classrooms', image: stockPhotos.smartClassroom, summary: 'Spacious classrooms with digital smart boards for interactive learning.', icon: 'computer', points: ['Digital boards', 'Comfortable furniture', 'Well ventilated'] },
  { title: 'Science Labs', image: stockPhotos.scienceLab, summary: 'Well-equipped Physics, Chemistry and Biology laboratories for practical learning.', icon: 'flask', points: ['Physics lab', 'Chemistry lab', 'Biology lab'] },
  { title: 'Computer Lab', image: stockPhotos.computer, summary: 'Modern computer laboratories with the latest technology and high-speed internet.', icon: 'computer', points: ['Latest systems', 'Internet', 'Coding classes'] },
  { title: 'Library', image: stockPhotos.library, summary: 'A rich library with books, journals, magazines and digital learning resources.', icon: 'library', points: ['Reference books', 'Magazines', 'Reading room'] },
  { title: 'Sports Ground', image: stockPhotos.athletics, summary: 'Large playground for cricket, football, athletics and many more games.', icon: 'trophy', points: ['Outdoor games', 'Indoor games', 'Annual sports meet'] },
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
    cbse: true,
    content: '',
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
    cbse: true,
    content: '',
    intro: 'Affiliation details of The Asian International School with CBSE, New Delhi.',
    rows: [
      ['Affiliated to', 'Central Board of Secondary Education, New Delhi'],
      ['Affiliation No.', 'To be updated'],
      ['School Code', 'To be updated'],
      ['Status of affiliation', 'To be updated'],
      ['Affiliation valid up to', 'To be updated'],
    ],
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    cbse: false,
    intro: 'How The Asian International School collects, uses and protects the information you share with us through this website.',
    rows: [] as [string, string][],
    content: `<p><em>Last updated: October 2026</em></p>
<p>The Asian International School, Chomu ("the School", "we", "us") respects the privacy of parents, students and every visitor to this website. This policy explains what information we collect, why we collect it and how we keep it safe.</p>
<h2>1. Information we collect</h2>
<p>We only collect information that you choose to give us when you fill a form on this website:</p>
<ul>
<li><strong>Admission enquiry form:</strong> student's name, parent / guardian's name, mobile number, email address (optional), class applying for and any message you write.</li>
<li><strong>Contact form:</strong> your name, mobile number, email address, subject and message.</li>
</ul>
<p>We do not ask for sensitive information such as Aadhaar numbers, bank details or medical records through this website. Admission documents are collected only at the school office.</p>
<h2>2. How we use your information</h2>
<ul>
<li>To call or message you back about your admission enquiry or question.</li>
<li>To share information about admissions, campus visits and the admission process that you asked for.</li>
<li>To keep a record of enquiries so our admission team can follow up properly.</li>
</ul>
<p>We <strong>do not sell, rent or trade</strong> your information to anyone, and we do not use it for advertising by other companies.</p>
<h2>3. Who can see your information</h2>
<p>Only authorised school staff who handle admissions and enquiries can see the information you submit. It is stored in a secure, password-protected admin panel. We may share information only if required by law or by an education authority.</p>
<h2>4. How long we keep it</h2>
<p>Enquiry details are kept for as long as needed to respond to you and to manage the admission session, normally not more than two academic sessions, after which they are deleted.</p>
<h2>5. Cookies and similar technology</h2>
<ul>
<li>This website does <strong>not</strong> use advertising or tracking cookies.</li>
<li>Your browser's session storage is used only to remember that you have already seen the opening animation and the admission popup during your visit.</li>
<li>Staff who log in to the admin panel receive a secure login cookie.</li>
<li>Pages that show a Google Map or a YouTube video load content from Google, which may set its own cookies under Google's privacy policy.</li>
</ul>
<h2>6. Children's information</h2>
<p>Forms on this website are meant to be filled by parents or guardians. We collect a student's name and class only to respond to the parent's enquiry.</p>
<h2>7. Your choices and rights</h2>
<p>You may ask us at any time to see, correct or delete the information you have shared with us through this website. Contact us using the details below and we will act on your request within a reasonable time, in line with applicable Indian law.</p>
<h2>8. Security</h2>
<p>We use reasonable technical and organisational measures to protect your information, including secure connections (HTTPS), restricted staff access and encrypted passwords. No website can be completely secure, but we take care to protect what you share with us.</p>
<h2>9. Changes to this policy</h2>
<p>We may update this policy from time to time. The latest version will always be available on this page with the date it was last updated.</p>
<h2>10. Contact us</h2>
<p>For any question about this policy or your information, please contact:<br><strong>The Asian International School</strong><br>Near Barala Hospital, Radha Swami Bagh, Chomu, Rajasthan – 303704<br>Phone: <a href="tel:+919829751651">+91 98297 51651</a>, <a href="tel:+919929605547">+91 99296 05547</a><br>Email: <a href="mailto:asianchomu@gmail.com">asianchomu@gmail.com</a></p>`,
  },
]

/* ───────────── Sample records ─────────────
   Shown on the website until staff add their own in the admin panel
   (and inserted by `npm run seed` so they can be edited). */

const campusPhoto = campusMedia

export const defaultNotices = [
  { id: 'n1', title: 'Admissions open for session 2027–28 (Nursery to Class XI)', date: '2026-10-28T00:00:00.000Z', category: 'admissions', details: 'Admission forms are available at the school office and online. Limited seats.', pinned: true },
  { id: 'n2', title: 'Half-yearly examinations schedule released', date: '2026-10-20T00:00:00.000Z', category: 'exams', details: 'Students can collect the date sheet from their class teachers.', pinned: true },
  { id: 'n3', title: 'School closed for Diwali holidays', date: '2026-10-15T00:00:00.000Z', category: 'holidays', details: 'The school will reopen after the Diwali break as per the academic calendar.', pinned: true },
  { id: 'n4', title: 'Parent–Teacher Meeting on Saturday', date: '2026-10-10T00:00:00.000Z', category: 'general', details: 'Parents are requested to attend the PTM between 9:00 AM and 12:00 PM.', pinned: false },
]

export const defaultNews = [
  {
    id: 'p1',
    slug: 'admissions-open-2027-28',
    title: 'Admissions Open for Session 2027–28',
    category: 'news',
    date: '2026-10-28T00:00:00.000Z',
    cover: campusPhoto,
    excerpt: 'Admissions are now open from Nursery to Class XI with Science, Arts and Commerce streams.',
    content:
      '<p>The Asian International School, Chomu invites applications for the academic session 2027–28 from Nursery to Class XI.</p><h2>How to apply</h2><ul><li>Fill the online enquiry form on the Admissions page</li><li>Visit the campus and meet our admission counsellor</li><li>Complete the interaction and document verification</li></ul><p>For more details call +91 98297 51651.</p>',
  },
  {
    id: 'p2',
    slug: 'smart-classrooms-on-campus',
    title: 'Smart Classrooms for Interactive Learning',
    category: 'news',
    date: '2026-09-15T00:00:00.000Z',
    cover: stockPhotos.smartClassroom,
    excerpt: 'Every classroom is equipped with digital boards that make lessons visual and engaging.',
    content: '<p>Our smart classrooms bring lessons to life with digital boards, videos and interactive activities, helping students understand concepts better.</p>',
  },
  {
    id: 'p3',
    slug: 'annual-sports-meet',
    title: 'Annual Sports Meet',
    category: 'event',
    date: '2026-12-12T00:00:00.000Z',
    venue: 'School Ground',
    cover: stockPhotos.athletics,
    excerpt: 'Students will compete in athletics, team games and fun events. Parents are welcome.',
    content: '<p>The Annual Sports Meet celebrates fitness, teamwork and sportsmanship. Events include athletics, relay races, kabaddi, kho-kho and fun races for the little ones.</p>',
  },
]

export const defaultAlbums = [
  { id: 'g1', slug: 'our-campus', title: 'Our Campus', category: 'campus', date: '2026-10-01T00:00:00.000Z', photos: [campusPhoto, stockPhotos.smartClassroom, stockPhotos.library, stockPhotos.scienceLab], videos: [] },
  {
    id: 'g2',
    slug: 'classroom-moments',
    title: 'Classroom Moments',
    category: 'academics',
    date: '2026-09-20T00:00:00.000Z',
    photos: [stockPhotos.classroomKids, stockPhotos.classroomHands, stockPhotos.kidsWriting, stockPhotos.circleTime, stockPhotos.seniorStudents, stockPhotos.digitalLearning],
    videos: [],
  },
  {
    id: 'g3',
    slug: 'sports-and-activities',
    title: 'Sports & Activities',
    category: 'sports',
    date: '2026-09-05T00:00:00.000Z',
    photos: [stockPhotos.athletics, stockPhotos.cricket, stockPhotos.yoga, stockPhotos.art, stockPhotos.littleArtist],
    videos: [],
  },
  {
    id: 'g4',
    slug: 'library-and-labs',
    title: 'Library & Labs',
    category: 'academics',
    date: '2026-08-25T00:00:00.000Z',
    photos: [stockPhotos.libraryHall, stockPhotos.libraryReading, stockPhotos.books, stockPhotos.computer, stockPhotos.scienceLab],
    videos: [],
  },
]

export const defaultFaculty = [
  {
    id: 'f1',
    name: 'Shri Kaajod Mal Revar',
    designation: 'Director',
    department: 'Management',
    photo: directorMedia,
    order: 1,
  },
]

export const defaultToppers = defaultHeroToppers.map((t, i) => ({
  id: `t${i + 1}`,
  ...t,
  year: '2025–26',
  featured: true,
  inHero: true,
  rank: i + 1,
}))

export const defaultCareers = [
  {
    id: 'c1',
    title: 'Teachers (PRT / TGT / PGT) — all subjects',
    department: 'Academics',
    type: 'full-time',
    requirements: 'Graduate / Post-graduate with B.Ed. Good communication in English. Freshers with passion for teaching may also apply.',
    open: true,
  },
]

/** Form defaults for each settings page in the admin panel. */
export const globalDefaults: Record<string, Record<string, unknown>> = {
  'site-settings': defaultSettings,
  'home-page': defaultHome,
  'about-page': defaultAbout,
  'academics-page': defaultAcademics,
  'admissions-page': defaultAdmissions,
  disclosure: defaultDisclosure,
}
