import { motion } from "framer-motion";
import { ArrowRight, Award, Users, ShieldCheck, Zap } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import {
  useScrollReveal,
  fadeUp,
  slideInLeft,
} from "../../hooks/useScrollReveal";

const highlights = [
  {
    icon: Award,
    label: "Authorized Dealer",
    desc: "Official Blue Star HVAC Systems",
  },
  { icon: Users, label: "50,000+ Installs", desc: "Across Uttar Pradesh" },
  {
    icon: ShieldCheck,
    label: "Genuine Products",
    desc: "100% authentic with warranty",
  },
  { icon: Zap, label: "Expert Team", desc: "Certified technicians" },
];

export default function AboutPreview() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <Container>
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Grid */}
          <motion.div
            className="relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80&auto=format"
                    alt="HVAC installation in commercial building"
                    className="w-full h-48 md:h-56 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80&auto=format"
                    alt="Modern air conditioning system"
                    className="w-full h-32 md:h-40 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format"
                    alt="Office with professional HVAC"
                    className="w-full h-32 md:h-40 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=500&q=80&auto=format"
                    alt="Commercial workspace"
                    className="w-full h-48 md:h-56 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:-bottom-6 bg-white rounded-2xl shadow-elevated px-6 py-4 border border-slate-100"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Blue Star HVAC Systems
                  </p>
                  <p className="text-xs text-slate-500">
                    Official Authorized Dealer
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3"
            >
              About Unitech Aircon
            </motion.span>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight"
            >
              20+ Years of Trusted HVAC Excellence in Lucknow
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-slate-500 text-lg leading-relaxed mb-4"
            >
              Unitech Aircon is a professionally managed HVAC engineering and
              service company based in Hanumant Vihar, Lucknow. We specialize
              in advanced air conditioning, ventilation, and refrigeration
              systems for commercial, institutional, and government clients.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-slate-500 leading-relaxed mb-8"
            >
              As an{" "}
              <strong className="text-slate-700">
                authorized Blue Star partner
              </strong>
              , we deliver end-to-end HVAC solutions — from consultation and
              system design to installation, commissioning, and long-term
              maintenance — with genuine products and factory-backed warranty.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-primary-600" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">
                      {label}
                    </span>
                    <span className="text-[11px] text-slate-400">{desc}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button icon={ArrowRight} iconPosition="right" href="#contact">
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
