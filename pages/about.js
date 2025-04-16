import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  // Example social links and skills; replace with dynamic data if available
  const socialLinks = frontMatter.socials || [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '🔗' },
    // Add more as needed
  ]
  const skills = frontMatter.skills || [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'Python'
  ]
  const techStack = frontMatter.techStack || [
    'VSCode', 'Git', 'Docker', 'AWS'
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <img
          src={frontMatter.avatar || '/static/images/avatar.png'}
          alt={frontMatter.name || 'Avatar'}
          className="w-32 h-32 rounded-full mb-4 border-4 border-primary-500 shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">
          {frontMatter.name || 'Your Name'}
        </h1>
        <p className="text-lg text-primary-600 font-medium mb-2">
          {frontMatter.title || 'Software Engineer'}
        </p>
        <p className="text-base text-gray-600 max-w-xl">
          {frontMatter.summary ||
            "I'm a passionate software engineer specializing in building exceptional digital experiences. Welcome to my About page!"}
        </p>
        {/* Contact Info */}
        <div className="mt-4 flex flex-col items-center gap-1">
          {frontMatter.email && (
            <a
              href={`mailto:${frontMatter.email}`}
              className="text-primary-500 hover:underline"
            >
              {frontMatter.email}
            </a>
          )}
          {frontMatter.location && (
            <span className="text-gray-500">{frontMatter.location}</span>
          )}
        </div>
        {/* Social Links */}
        <div className="flex gap-4 mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary-500"
              aria-label={link.name}
            >
              <span>{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Skills Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* Tech Stack Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      {/* MDX Content */}
      <div className="prose prose-lg dark:prose-dark mx-auto">
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
        />
      </div>
    </div>
  )
}
