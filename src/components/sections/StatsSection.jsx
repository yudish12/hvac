import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Users, Briefcase, Clock, ThumbsUp } from 'lucide-react'
import Container from '../ui/Container'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const stats = [
  { value: 50000, suffix: '+', label: 'AC Installations', icon: Users, prefix: '' },
  { value: 412, suffix: '+', label: 'Projects Delivered', icon: Briefcase, prefix: '' },
  { value: 20, suffix: '+', label: 'Years of Experience', icon: Clock, prefix: '' },
  { value: 99, suffix: '%', label: 'Customer Satisfaction', icon: ThumbsUp, prefix: '' },
]

function AnimatedCounter({ value, suffix, prefix, isInView }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2200
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  const formatted = display >= 1000
    ? display.toLocaleString('en-IN')
    : display

  return (
    <span>{prefix}{formatted}{suffix}</span>
  )
}

export default function StatsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="relative -mt-16 z-20 pb-8">
      <Container>
        <motion.div
          ref={ref}
          className="bg-white rounded-2xl shadow-elevated border border-slate-100 px-6 py-8 md:px-10 md:py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isInView={isInView}
                  />
                </div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-slate-100" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
