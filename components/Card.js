import Image from './Image'
import Link from './Link'
import { motion } from 'framer-motion'

const Card = ({ title, description, imgSrc, href }) => (
  <motion.div 
    className="p-4 md:w-1/2 md" 
    style={{ maxWidth: '544px' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="h-full overflow-hidden border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center lg:h-48 md:h-36 transition-transform duration-300"
              width={544}
              height={306}
            />
          </motion.div>
        </Link>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center lg:h-48 md:h-36 transition-transform duration-300"
            width={544}
            height={306}
          />
        </motion.div>
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">{description}</p>
        {href && (
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  </motion.div>
)

export default Card
