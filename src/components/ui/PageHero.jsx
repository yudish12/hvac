import { motion } from 'framer-motion'
import Container from './Container'

export default function PageHero({ subtitle, title, description, image }) {
  return (
    <section className="relative overflow-hidden bg-primary-950 py-20 md:py-28">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-primary-950/85" />
        </div>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-950 to-slate-950" />
      )}
      <Container className="relative z-10 text-center">
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold tracking-wider uppercase text-primary-300 mb-3"
          >
            {subtitle}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  )
}
