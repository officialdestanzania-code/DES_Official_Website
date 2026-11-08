export type SolutionItem = {
  slug: string
  icon: 'learning' | 'ai' | 'ict' | 'creative' | 'software' | 'skills'
  title: string
  summary: string
  overview: string
  focusAreas: string[]
  audiences: string[]
}

export type ProjectItem = {
  slug: string
  title: string
  status: 'Live' | 'Ongoing' | 'In development'
  summary: string
  overview: string
  highlights: string[]
  partners?: string[]
  link?: string
  linkLabel?: string
}

export const solutions: SolutionItem[] = [
  {
    slug: 'digital-learning-platforms',
    icon: 'learning',
    title: 'Digital Learning Platforms',
    summary: 'Digital environments and resources that make teaching and learning more accessible.',
    overview: 'DES explores and develops digital learning experiences that connect educators and learners with useful educational content, tools and technology-enabled activities.',
    focusAreas: [
      'Digital learning platforms and educational websites',
      'Access to notes, revision materials and teaching resources',
      'Technology-supported learning activities',
      'Practical digital tools for teachers and learners',
    ],
    audiences: ['Schools and education institutions', 'Teachers and tutors', 'Learners and families'],
  },
  {
    slug: 'ai-in-education',
    icon: 'ai',
    title: 'AI in Education',
    summary: 'Practical and responsible use of artificial intelligence in education.',
    overview: 'DES explores how artificial intelligence can support lesson preparation, learning activities, educational content development and digital productivity while keeping teachers in control of teaching decisions.',
    focusAreas: [
      'AI-supported lesson and resource preparation',
      'Digital literacy and responsible AI use',
      'Educational content creation and adaptation',
      'Practical AI tools for educators and learners',
    ],
    audiences: ['Teachers and school leaders', 'Learners', 'Education organisations'],
  },
  {
    slug: 'school-ict-transformation',
    icon: 'ict',
    title: 'School ICT & Digital Transformation',
    summary: 'Support for schools developing practical and sustainable ICT learning environments.',
    overview: 'DES works towards practical school ICT environments by connecting equipment, digital learning activities, connectivity and local coordination.',
    focusAreas: [
      'Computer room and ICT laboratory development',
      'Digital equipment planning and utilisation',
      'Connectivity and basic ICT operations',
      'School-based digital learning programmes',
    ],
    audiences: ['Primary and secondary schools', 'Education partners', 'School communities'],
  },
  {
    slug: 'coding-robotics-creative-technology',
    icon: 'creative',
    title: 'Coding, Robotics & Creative Technology',
    summary: 'Hands-on experiences that help learners turn ideas into digital creations.',
    overview: 'DES promotes practical exploration of coding, robotics and creative digital tools to develop problem-solving, design thinking and confidence with technology.',
    focusAreas: [
      'Beginner programming and computational thinking',
      'Robotics and hands-on technology activities',
      'Digital art and visual design',
      '3D design and creative project work',
    ],
    audiences: ['School learners', 'Teachers and facilitators', 'Youth learning groups'],
  },
  {
    slug: 'software-development',
    icon: 'software',
    title: 'Software & Web Development',
    summary: 'Digital platforms and applications designed around real user needs.',
    overview: 'DES develops and improves digital products that help make educational information, learning services and practical online tools easier to access.',
    focusAreas: [
      'Websites and digital platforms',
      'Education-focused applications and tools',
      'User-centred interface and experience design',
      'Continuous improvement and digital support',
    ],
    audiences: ['Education institutions', 'Community initiatives', 'Organisations with digital needs'],
  },
  {
    slug: 'digital-skills-training',
    icon: 'skills',
    title: 'Digital Skills Training',
    summary: 'Practical digital skills for learners, educators and communities.',
    overview: 'DES supports learning activities that build confidence in using computers, digital tools and creative technology for education and everyday problem-solving.',
    focusAreas: [
      'Computer and internet fundamentals',
      'Productivity and digital learning tools',
      'Creative technology workshops',
      'Digital safety and responsible technology use',
    ],
    audiences: ['Learners and youth', 'Teachers', 'Community groups'],
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'des-ai-learning-platform',
    title: 'DES AI Learning Platform',
    status: 'Ongoing',
    summary: 'A developing digital learning platform for teachers and learners.',
    overview: 'The DES AI Learning Platform is being developed to bring educational resources and technology-supported learning experiences together in one digital environment.',
    highlights: [
      'A dedicated online learning destination at learn.des.co.tz',
      'Work on teacher-facing and learner-facing learning resources',
      'Ongoing development of platform features and educational content',
    ],
    link: 'https://learn.des.co.tz/login',
    linkLabel: 'Open Learning Portal',
  },
  {
    slug: 'butimba-digital-learning-computer-room',
    title: 'Butimba Digital Learning & Computer Room',
    status: 'Ongoing',
    summary: 'A school-based initiative to expand access to computer learning at Butimba Primary School in Mwanza.',
    overview: 'The initiative supports the development of a practical computer learning environment where pupils can gain experience with digital technology and structured computer lessons.',
    highlights: [
      'Fourteen Labdoo laptops were handed over in July 2025',
      'Five additional laptops were received on 13 March 2026 at MITzKits – SIDO, Mwanza, bringing the total received from Labdoo to nineteen',
      'Butimba’s two receipt records confirm 19 laptops received against the original request for 20 devices',
      'Twelve tables and twelve benches were completed for the computer room in January 2026',
      'One steel storage cabinet was received through Mwanza e.V.',
      'Herman Tanguye supported the school with a photocopy machine in 2018 and Wi-Fi in 2026',
      'Samwel Tanguye purchased fifteen chairs for the staff room',
      'Dr. Ancyfrida Prosper championed a safe menstrual hygiene room for girls; construction remains paused and incomplete',
      'Further work includes strengthening the room, electricity, connectivity and learning operations',
    ],
    partners: [
      'Mwanza e.V. (Würzburg, Germany) — a direct project partner supporting the Butimba initiative.',
      'The Gundolf Family (Munich, Germany) — Friends of Butimba Primary School and a supporting project partner.',
    ],
  },
  {
    slug: 'des-necta-results-portal',
    title: 'DES NECTA Results Portal',
    status: 'Live',
    summary: 'A public access point helping users navigate to official NECTA examination results.',
    overview: 'The DES Results Portal organises examination information and directs users to the relevant official NECTA results pages. DES does not publish or alter candidates’ official results.',
    highlights: [
      'PSLE 2026 results access page is live',
      'Searchable navigation to the 26 NECTA regional result directories for PSLE 2026',
      'The portal is designed to expand to additional national and local examinations',
    ],
    link: '/matokeo-darasa-la-saba-2026',
    linkLabel: 'Open Results Portal',
  },
]

export const resourceGroups = [
  {
    slug: 'teacher-resources',
    title: 'Teacher Resources',
    description: 'Resources that support lesson preparation, classroom teaching and assessment.',
    items: ['Lesson Plans', 'Schemes of Work', 'Teaching Notes', 'Teaching & Learning Materials', 'Assessment Tools'],
  },
  {
    slug: 'student-resources',
    title: 'Student Resources',
    description: 'Learning and revision materials that help learners practise and prepare.',
    items: ['Subject Notes', 'Revision Exercises', 'Past Papers', 'Practice Activities', 'Learning Guides'],
  },
] as const
