export interface TimelinePosition {
  title: string
  span?: string
  bullets: string[]
}

export interface TimelineEntry {
  date: string
  logo: string
  url: string
  alt: string
  org: string
  orgDetail?: string
  positions: TimelinePosition[]
}

export const bio =
  'I am an engineer and scientist doing research at the intersection of neurotechnology and artificial intelligence.'

export const timeline: TimelineEntry[] = [
  {
    date: 'Sept 2025 — Present',
    logo: '/about/pennhealthtech_thumbnail.webp',
    url: 'https://healthtech.upenn.edu/',
    alt: 'Penn Health-Tech',
    org: 'Penn Health-Tech, University of Pennsylvania',
    positions: [
      {
        title: 'Student Fellow',
        bullets: [
          "Penn Health-Tech is a university-wide effort to advance Penn's world-class breakthroughs into devices and health technologies.",
        ],
      },
    ],
  },
  {
    date: 'Aug 2024 — Present',
    logo: '/about/penn_thumbnail.webp',
    url: 'https://be.seas.upenn.edu/',
    alt: 'University of Pennsylvania',
    org: 'University of Pennsylvania',
    orgDetail: 'School of Engineering and Applied Science',
    positions: [
      {
        title: 'Bioengineering PhD Candidate',
        bullets: ['Litt Lab under Brian Litt, MD.', 'Ashton Fellow.'],
      },
    ],
  },
  {
    date: 'June 2023 — Present',
    logo: '/about/sociail_thumbnail.webp',
    url: 'https://www.sociail.com/',
    alt: 'Sociail',
    org: 'Sociail',
    positions: [
      { title: 'Advisor', span: 'March 2024 — Present', bullets: [] },
      {
        title: 'Co-Founder, Tech Lead',
        span: 'June 2023 — March 2024',
        bullets: [
          'Led a multinational software development team building our collaborative AI platform, Sociail Chat',
          "Conducted co-founder responsibilities around building the company itself, including interviewing and onboarding team members, establishing our culture, and creating the 'operating system' of Sociail",
        ],
      },
    ],
  },
  {
    date: 'Sept 2024 — Sept 2025',
    logo: '/about/nucleate_thumbnail.webp',
    url: 'https://www.nucleate.xyz/',
    alt: 'Nucleate',
    org: 'Nucleate Philadelphia',
    positions: [
      {
        title: 'Co-Director, Mentorships',
        bullets: [
          "Nucleate is a student-led, non-profit organization that empowers the next generation of biotech leaders by educating today's academic trainees.",
        ],
      },
    ],
  },
  {
    date: 'Sept 2023 — Aug 2024',
    logo: '/about/litt_lab_thumbnail.webp',
    url: 'https://littlab.seas.upenn.edu/',
    alt: 'Litt Lab',
    org: 'Litt Lab, University of Pennsylvania',
    orgDetail: 'Center for Neuroengineering and Therapeutics',
    positions: [
      {
        title: 'Research Specialist',
        bullets: ['Translational neuroengineering research for epilepsy patient care.'],
      },
    ],
  },
  {
    date: 'Dec 2021 — Sept 2023',
    logo: '/about/ayaz_lab_thumbnail.webp',
    url: 'https://ayazlab.com/',
    alt: 'Ayaz Lab',
    org: 'Neuroergonomics and Neuroengineering Lab, Drexel University',
    orgDetail: 'Cognitive Neuroengineering and Quantitative Experimental Research (CONQUER) Collaborative',
    positions: [
      {
        title: 'Research Assistant',
        bullets: [
          "Thesis: 'Evaluation of Cognitive Function using Time-Domain Optical Neuroimaging' under Dr. Hasan Ayaz",
          'Designed and implemented a comprehensive cognitive study time-synchronized with TD-fNIRS data acquisition',
          'Developed neuroimaging data processing, visualization, and analysis tools for TD-fNIRS',
          'Enrolled and recorded behavioral, physiological, and neuroimaging data from 15 participants',
          'Evaluated the neural correlates of cognitive function across a battery of eight cognitive tasks',
        ],
      },
    ],
  },
  {
    date: 'June 2020 — June 2023',
    logo: '/about/moberg_analytics_thumbnail.webp',
    url: 'https://moberganalytics.com/',
    alt: 'Moberg Analytics',
    org: 'Moberg Analytics',
    positions: [
      {
        title: 'Lead Engineer',
        span: 'March 2022 — June 2023',
        bullets: [
          'Led the development of a medical device for validating intracranial pressure recordings from conception through clinical trials at UT Southwestern Medical Center',
          'Managed a project to create contextual neuro-ICU sensors and a data aggregation system in collaboration with Drexel University',
          'Created an evaluation framework and assessed medical devices for performance in Prolonged Casualty Care',
        ],
      },
      {
        title: 'Software Engineer',
        span: 'June 2020 — March 2022',
        bullets: [
          'Developed a cloud-based platform for neurophysiological data harmonization, visualization, and analytics',
          'Established a common data format for a large-scale neurocritical care patient data repository',
          'Published an open-source Python package to aid researchers and developers working with HDF5 files',
        ],
      },
    ],
  },
  {
    date: 'Sept 2019 — March 2020',
    logo: '/about/intact_vascular_thumbnail.webp',
    url: 'https://www.linkedin.com/company/intactvascular/',
    alt: 'Intact Vascular',
    org: 'Intact Vascular',
    positions: [
      {
        title: 'Product Research & Development Engineer',
        bullets: [
          'Performed product verification and validation activities for a novel stent-delivery system',
          'Completed CAD designs and requirement testing',
          'Improved UX aspects of the device and optimized the manufacturing assembly process',
        ],
      },
    ],
  },
  {
    date: 'Sept 2018 — June 2023',
    logo: '/about/drexel_thumbnail.webp',
    url: 'https://drexel.edu/biomed/',
    alt: 'Drexel University',
    org: 'Drexel University',
    orgDetail: 'School of Biomedical Engineering, Science and Health Systems + Pennoni Honors College',
    positions: [
      {
        title: 'Biomedical Engineering Graduate',
        bullets: [
          'BS in Biomedical Engineering — GPA 3.85',
          'MS in Biomedical Engineering — GPA 4.00',
          'Neuroengineering concentration + Neuroscience minor',
          'Graduated with Honors from the Pennoni Honors College',
        ],
      },
    ],
  },
]

export interface SimpleEntry {
  title: string
  detail: string
}

export const teaching: SimpleEntry[] = [
  { title: 'Co-Head TA — Brain-Computer Interfaces', detail: 'University of Pennsylvania BE 5210 (Jan 2024 — Present)' },
  { title: 'Physics Tutor — Electricity & Magnetism', detail: 'Private (March 2023 — June 2023)' },
  { title: 'Peer Mentor — Brain Technology Convergence', detail: 'Drexel University BMES T580 (Sept 2022 — Dec 2022)' },
  { title: 'Peer Mentor — Medical Technology Innovation', detail: 'Drexel University BMES 585 (Jan 2021 — March 2021)' },
  {
    title: 'Physics Tutor — Newtonian Mechanics',
    detail: 'Drexel Center for Learning and Academic Success (April 2020 — March 2021)',
  },
]

export const volunteering: SimpleEntry[] = [
  { title: 'Alumni Board', detail: 'Drexel BIOMED Alumni Network (July 2024 — Present)' },
  { title: 'Event Manager, Philadelphia', detail: 'Pint of Science US (May 2024 — Present)' },
  { title: 'Peer Reviewer', detail: 'PeerJ Computer Science (2025), Epilepsia Open (2024 — 2025)' },
  {
    title: 'Student Advisory Board',
    detail: 'Drexel University School of Biomedical Engineering, Science and Health Systems (Aug 2022 — June 2023)',
  },
  {
    title: 'Student Ambassador',
    detail: 'Drexel University School of Biomedical Engineering, Science and Health Systems (April 2022 — June 2023)',
  },
]

export const courses: SimpleEntry[] = [
  { title: 'NeuroAI - A Principled Understanding of the Human Brain', detail: 'Dr. Konrad Kording, University of Pennsylvania, 2025' },
  { title: 'Clinical Research Informatics in the Cloud', detail: 'Dr. Joost Wagenaar, University of Pennsylvania, 2025' },
  { title: 'Applied Medical Innovation', detail: 'Dr. Katie Reuther, University of Pennsylvania, 2024' },
  { title: 'Brain-Computer Interfaces', detail: 'Dr. Brian Litt, University of Pennsylvania, 2024' },
  { title: 'Brain-Computer Interface Lab', detail: 'Dr. Jaimie Dougherty, Drexel University, 2023' },
  { title: 'Neuroengineering I and II', detail: 'Dr. Catherine von Reyn, Drexel University, 2022' },
  { title: 'Medical Technology Innovation', detail: 'Dr. Banu Onaral, Drexel University, 2022' },
  { title: 'Brain Technology Convergence', detail: 'Dr. Banu Onaral, Drexel University, 2022' },
  { title: 'Neural Networks', detail: 'Dr. Hualou Liang, Drexel University, 2021' },
  { title: 'Biomedical Signal Processing', detail: 'Dr. Kurtulus Izzetoglu, Drexel University, 2021' },
]

export interface Affiliation {
  name: string
  url: string
  logo: string
}

export const affiliations: Affiliation[] = [
  { name: 'Penn Engineering', url: 'https://seas.upenn.edu/', logo: '/about/penn_engineering.webp' },
  { name: 'Center for Neuroengineering and Therapeutics', url: 'https://cnt.upenn.edu/', logo: '/about/cnt.webp' },
  { name: 'Sociail', url: 'https://sociail.com/', logo: '/about/sociail.webp' },
  { name: 'Litt Lab', url: 'https://littlab.seas.upenn.edu/', logo: '/about/littlab.webp' },
  { name: 'Penn Health-Tech', url: 'https://healthtech.upenn.edu/', logo: '/about/pennhealthtech.webp' },
  { name: 'Drexel Biomed Alumni Network', url: 'https://drexel.edu/biomed/resources/alumni/', logo: '/about/dban.webp' },
  { name: 'Pint of Science', url: 'https://pintofscience.com/', logo: '/about/pint_of_science.webp' },
]

export const fieldRecords = [
  { src: '/index/slides1.webp', caption: 'fNIRS study · Longwood Gardens' },
  { src: '/index/slides2.webp', caption: 'Kernel Flow study' },
  { src: '/index/slides3.webp', caption: 'OpenBCI headset' },
  { src: '/index/slides4.webp', caption: 'fNIRS study' },
  { src: '/index/slides5.webp', caption: 'EEG headset' },
]
