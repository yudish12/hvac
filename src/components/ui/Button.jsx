import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 shadow-md hover:shadow-lg',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
  ghost:
    'text-primary-600 hover:bg-primary-50',
  white:
    'bg-white text-primary-700 hover:bg-slate-50 shadow-md hover:shadow-lg',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap'
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </>
  )

  const Component = href ? motion.a : motion.button

  return (
    <Component
      className={classes}
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </Component>
  )
}
