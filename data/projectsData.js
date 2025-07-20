const projectsData = [
  // Enterprise Projects
  

  // Personal Projects
  {
    id: 'resume-pro',
    title: 'Resume Pro',
    description: 'Built an ATS-friendly resume generator using Next.js, React, and Tailwind CSS. Implemented modern UI with real-time preview and multiple professional templates to help job seekers create compelling resumes.',
    shortDescription: 'ATS-friendly resume generator',
    images: ['/static/images/iamjeevan_logo.png'],
    imgSrc: '/static/images/iamjeevan_logo.png',
    techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
    category: 'Web Application',
    type: 'Personal',
    status: 'Live',
    year: 2024,
    duration: '2 months',
    team: ['Solo Developer'],
    metrics: { 
      users: '500+', 
      resumes_generated: '2k+',
      template_satisfaction: '95%' 
    },
    links: { 
      live: 'https://resumepro.iamjeevan.com',
      github: 'https://github.com/jeevan-wijerathna/resume-pro'
    },
    featured: true,
    color: '#10B981',
    tags: ['Next.js', 'TypeScript', 'ATS', 'Resume'],
    href: 'https://resumepro.iamjeevan.com'
  },
  {
    id: 'vanish-notes',
    title: 'Vanish Notes',
    description: 'Developed a self-destructive note sharing application with end-to-end encryption and auto-deletion features. Perfect for sharing sensitive information securely with automatic expiration.',
    shortDescription: 'Self-destructive encrypted note sharing',
    images: ['/static/images/time-machine.jpg'],
    imgSrc: '/static/images/time-machine.jpg',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Crypto.js'],
    category: 'Security Tool',
    type: 'Personal',
    status: 'Live',
    year: 2024,
    duration: '1 month',
    team: ['Solo Developer'],
    metrics: { 
      notes_shared: '1k+', 
      security_incidents: '0',
      user_retention: '75%' 
    },
    links: { 
      live: 'https://vanishnotes.iamjeevan.com',
      github: 'https://github.com/jeevan-wijerathna/vanish-notes'
    },
    featured: true,
    color: '#DC2626',
    tags: ['Encryption', 'Security', 'Self-Destruct', 'MongoDB'],
    href: 'https://vanishnotes.iamjeevan.com'
  },
  {
    id: 'nz-salary-calculator',
    title: 'NZ Salary Calculator',
    description: 'Created a comprehensive salary calculator for New Zealand employees. Includes accurate tax calculations, KiwiSaver contributions, and other deductions based on current NZ tax rates and regulations.',
    shortDescription: 'Comprehensive NZ salary and tax calculator',
    images: ['/static/images/google.png'],
    imgSrc: '/static/images/google.png',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'Utility Tool',
    type: 'Personal',
    status: 'Live',
    year: 2024,
    duration: '3 weeks',
    team: ['Solo Developer'],
    metrics: { 
      calculations: '5k+', 
      accuracy: '99.9%',
      monthly_users: '200+' 
    },
    links: { 
      live: 'https://nzsalarycalculator.iamjeevan.com',
      github: 'https://github.com/jeevan-wijerathna/nz-salary-calculator'
    },
    featured: false,
    color: '#059669',
    tags: ['React', 'TypeScript', 'Tax Calculator', 'NZ'],
    href: 'https://nzsalarycalculator.iamjeevan.com'
  },
  {
    id: 'flash-card-fest',
    title: 'Flash Card Fest',
    description: 'Designed an AI-powered study flash card generator integrated with OpenAI API for automated content generation. Helps students create effective study materials with intelligent question generation.',
    shortDescription: 'AI-powered study flash card generator',
    images: ['/static/images/time-machine.jpg'],
    imgSrc: '/static/images/time-machine.jpg',
    techStack: ['React', 'OpenAI API', 'Node.js', 'Express'],
    category: 'Educational Tool',
    type: 'Personal',
    status: 'Live',
    year: 2023,
    duration: '6 weeks',
    team: ['Solo Developer'],
    metrics: { 
      flashcards_generated: '10k+', 
      study_sessions: '2k+',
      ai_accuracy: '92%' 
    },
    links: { 
      live: 'https://flash-card-fest.netlify.app',
      github: 'https://github.com/jeevan-wijerathna/flash-card-fest'
    },
    featured: false,
    color: '#7C3AED',
    tags: ['AI', 'OpenAI', 'Education', 'Study Tool'],
    href: 'https://flash-card-fest.netlify.app'
  },

  // Content & Guides
  {
    id: 'claude-code-productivity',
    title: 'AI-Powered Development Workflow',
    description: 'Comprehensive guide to supercharging development workflow using Claude Code AI. Includes productivity tips, automation strategies, and best practices for AI-assisted development.',
    shortDescription: 'AI development productivity guide',
    images: ['/static/images/CleanArchitecture.jpg'],
    imgSrc: '/static/images/CleanArchitecture.jpg',
    techStack: ['Claude AI', 'Development Tools', 'Automation'],
    category: 'Educational',
    type: 'Content',
    status: 'Published',
    year: 2024,
    duration: '1 week',
    team: ['Content Creation'],
    metrics: { 
      reads: '5k+', 
      engagement: '92%',
      implementations: '200+' 
    },
    links: { 
      case_study: '/blog/how-i-supercharge-my-workflow-with-claude-code-essential-ai-productivity-tips-for-developers'
    },
    featured: true,
    color: '#06B6D4',
    tags: ['AI', 'Productivity', 'Development', 'Guide'],
    href: '/blog/how-i-supercharge-my-workflow-with-claude-code-essential-ai-productivity-tips-for-developers'
  },
  {
    id: 'clean-architecture-guide',
    title: 'Clean Architecture Implementation',
    description: 'Comprehensive guide and implementation examples for Clean Architecture and Vertical Slice Architecture in .NET applications. Includes best practices, code examples, and architectural patterns.',
    shortDescription: 'Architecture patterns and best practices',
    images: ['/static/images/CleanArchitecture.jpg'],
    imgSrc: '/static/images/CleanArchitecture.jpg',
    techStack: ['.NET', 'C#', 'Clean Architecture', 'DDD'],
    category: 'Educational',
    type: 'Content',
    status: 'Published',
    year: 2024,
    duration: '3 weeks',
    team: ['Software Architecture'],
    metrics: { 
      reads: '2k+', 
      engagement: '85%',
      shares: '100+' 
    },
    links: { 
      case_study: '/blog/clean-architecture-and-vertical-slice-architecture'
    },
    featured: false,
    color: '#8B5CF6',
    tags: ['Architecture', '.NET', 'Best Practices'],
    href: '/blog/clean-architecture-and-vertical-slice-architecture'
  }
]

export default projectsData
