import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { PageSeo } from '@/components/SEO'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const skillsRef = useRef(null)
  const techRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 })
  const skillsInView = useInView(skillsRef, { once: true, threshold: 0.2 })
  const techInView = useInView(techRef, { once: true, threshold: 0.2 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: frontMatter.github || 'https://github.com/jeevan-vj', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-800 dark:hover:text-gray-200'
    },
    { 
      name: 'LinkedIn', 
      url: frontMatter.linkedin || 'https://www.linkedin.com/in/jeevanwijerathna/', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      url: frontMatter.twitter || 'https://twitter.com/iamjeevanvj', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      url: `mailto:${frontMatter.email || 'Jeevan90wijerathna@gmail.com'}`, 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:text-red-500'
    },
    { 
      name: 'Website', 
      url: 'https://iamjeevan.com', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: 'hover:text-green-500'
    }
  ]
  
  const skills = frontMatter.skills || ['C#', '.NET Core', 'ASP.NET', 'React', 'Angular', 'TypeScript', 'JavaScript', 'Flutter', 'Java', 'Azure', 'AWS', 'Docker', 'Kubernetes', 'Microservices', 'Terraform', 'Infrastructure as Code']
  const techStack = frontMatter.techStack || ['Visual Studio', 'VSCode', 'Git', 'Docker', 'Kubernetes', 'Azure DevOps', 'GitHub Actions', 'Jenkins', 'TeamCity', 'Azure Pipelines', 'Terraform', 'Azure Portal']
  const certifications = frontMatter.certifications || ['AWS Certified Solution Architect Associate', 'AWS Certified Developer', 'Azure Certified Developer', 'Sitecore 9 Certified Developer', 'SAFe 4.0 Practitioner']
  const personalProjects = frontMatter.personalProjects || []
  const experiences = frontMatter.experience || [
    {
      title: 'Technical Lead',
      company: 'Datacom',
      period: '2023 - Present',
      location: 'Auckland, New Zealand',
      description: 'Leading technical initiatives and mentoring development teams in enterprise solutions'
    },
    {
      title: 'Senior Software Engineer',
      company: 'Kinesso',
      period: '2020 - 2022',
      location: 'Kuala Lumpur, Malaysia',
      description: 'Designed and implemented modernized legacy applications using microservices architecture'
    },
    {
      title: 'Software Engineer',
      company: 'Sitecore',
      period: '2017 - 2020',
      location: 'Malaysia',
      description: 'Worked on Sitecore Azure Marketplace, Azure Blob Storage provider, CDN module project, and various enterprise solutions'
    },
    {
      title: 'Software Engineer',
      company: 'CMS LK',
      period: '2015 - 2017',
      location: 'Colombo, Sri Lanka',
      description: 'Developed Redcorp E-commerce web site using ASP.NET MVC5, SQL Server 2014, Dapper ORM, and other modern technologies'
    },
    {
      title: 'Software Engineer',
      company: 'Bileeta pvt ltd',
      period: '2013 - 2015',
      location: 'Colombo, Sri Lanka',
      description: 'Worked on Enterprise Resource Planning (ERP) software development project as a backend developer using SQL Server and C# .NET'
    }
  ]

  return (
    <>
      <PageSeo title={`About - ${frontMatter.name}`} description={`About ${frontMatter.name} - Technical Lead and Principal Developer with 10+ years of experience in .NET, Azure cloud technologies, React frontend development, and mobile applications. Leading technical architecture at Datacom, Auckland.`} />
      
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />
      </div>

      <div ref={containerRef} className="min-h-screen">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ y, opacity }}
          className="relative px-4 pt-20 pb-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Avatar and Social */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  className="relative mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full blur opacity-75 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-full">
                    <Image
                      src={frontMatter.avatar || '/static/images/jeevan.jpg'}
                      alt={frontMatter.name || 'Jeevan Wijerathna'}
                      className="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover bg-white dark:bg-gray-800"
                      width={224}
                      height={224}
                      priority
                    />
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-blue-400/30 rounded-full"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse" />
                </motion.div>
                
                {/* Social Links */}
                <div className="flex gap-6 mb-8">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 ${link.color} group`}
                      aria-label={link.name}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.icon}
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
                  >
                    {frontMatter.name || 'Jeevan Wijerathna'}
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        {frontMatter.occupation || 'Technical Lead | Principal Developer'}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                      {frontMatter.company || 'Datacom'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-lg text-green-600 dark:text-green-400 font-medium">
                      {frontMatter.location || 'Auckland, New Zealand'}
                    </span>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="prose prose-lg dark:prose-dark max-w-none"
                >
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Principal Developer with 10+ years of experience leading technical architecture and cross-platform development. Expert in .NET, Azure cloud technologies, React frontend development, and mobile applications. Proven track record in modernizing legacy systems and delivering scalable solutions.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <motion.a
                    href={`mailto:${frontMatter.email || 'Jeevan90wijerathna@gmail.com'}`}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get In Touch
                  </motion.a>
                  <motion.a
                    href="/blog"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    View My Blog
                  </motion.a>
                  <motion.a
                    href="https://iamjeevan.com/resume.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    View Resume
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section className="px-4 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
            >
              By the Numbers
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10+', label: 'Years of Experience', icon: '🚀' },
                { number: '5+', label: 'Major Projects Led', icon: '🎯' },
                { number: '20+', label: 'Technologies Mastered', icon: '⚡' },
                { number: '100%', label: 'Client Satisfaction', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="text-center group"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          ref={skillsRef}
          className="px-4 py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
            >
              Skills & Expertise
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="text-base font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section 
          ref={techRef}
          className="px-4 py-16"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent"
            >
              Tech Stack
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={techInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {tech.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {tech}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section className="px-4 py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent"
            >
              Certifications
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cert}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Personal Projects Section */}
        <motion.section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent"
            >
              Personal Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {personalProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <motion.a
                        href={`https://${project.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">{project.url}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section className="px-4 py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
            >
              Experience
            </motion.h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{exp.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">{exp.company}</p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">{exp.location}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.period}</p>
                      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* MDX Content */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-dark max-w-none prose-blue">
              <MDXLayoutRenderer
                layout={frontMatter.layout || DEFAULT_LAYOUT}
                mdxSource={mdxSource}
                frontMatter={frontMatter}
              />
            </div>
          </div>
        </motion.section>

        {/* Floating Action Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.a
            href="#top"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </>
  )
}
