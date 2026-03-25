import { motion } from 'framer-motion'
import { useScrollReveal, fadeUp } from '../../hooks/useScrollReveal'

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}) {
  const { ref, isInView } = useScrollReveal()

  const alignClass = {
    center: 'text-center mx-auto',
    left: 'text-left',
  }

  return (
    <motion.div
      ref={ref}
      className={`max-w-3xl mb-12 md:mb-16 ${alignClass[align]}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {subtitle && (
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className={`inline-block text-sm font-semibold tracking-wider uppercase mb-3 ${
            light ? 'text-primary-200' : 'text-primary-600'
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
