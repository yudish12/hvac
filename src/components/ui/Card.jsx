import { motion } from 'framer-motion'

const cardVariants = {
  default: 'bg-white border border-slate-100',
  elevated: 'bg-white shadow-card',
  outlined: 'bg-white border-2 border-slate-200',
  glass: 'glass border border-white/20',
  gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100',
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  hoverable = true,
  padding = 'p-6 md:p-8',
  ...props
}) {
  return (
    <motion.div
      className={`rounded-2xl ${padding} ${cardVariants[variant]} ${
        hoverable
          ? 'hover:shadow-elevated transition-shadow duration-300'
          : ''
      } ${className}`}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
