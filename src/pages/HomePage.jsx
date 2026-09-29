import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCheck, FiClock, FiGlobe, FiLock, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { urlService } from "../services/urlService";
import { usePageTitle } from "../hooks/usePageTitle";

function Counter({ value, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        spring.set(value);
      }, delay);
    }
  }, [inView, spring, value, delay]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const metrics = [
  { label: "Links Shortened", value: 25400 },
  { label: "Clicks Tracked", value: 1420500 },
  { label: "Active Users", value: 3200 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};


const features = [
  {
    icon: FiZap,
    title: "Instant Routing",
    description: "Generate compact, memorable short links with zero latency and high availability.",
  },
  {
    icon: FiBarChart2,
    title: "Clear Analytics",
    description: "Inspect daily volume, browser, platform, and regional breakdowns at a glance.",
  },
  {
    icon: FiClock,
    title: "Lifecycle & Expiry",
    description: "Set expiration dates or deactivate links anytime with complete management control.",
  },
  {
    icon: FiLock,
    title: "Secure Sessions",
    description: "Protected endpoints backed by reliable JWT authentication and session management.",
  },
];

const testimonials = [
  {
    name: "Mina Patel",
    role: "Product Lead",
    quote: "The interface is calm, fast, and obvious. It feels like an authentic system tool.",
  },
  {
    name: "Arjun Rao",
    role: "Design Engineer",
    quote: "No visual noise. Links shorten instantly and analytics give the exact metrics I care about.",
  },
];

const faqs = [
  {
    question: "How fast is link redirection?",
    answer: "Short links are resolved directly with low overhead and instant HTTP 302 redirection.",
  },
  {
    question: "Can I set custom link expiration?",
    answer: "Yes, you can specify an exact expiration date and time when creating or editing any short link.",
  },
  {
    question: "Is link tracking included?",
    answer: "Yes, click counts, daily activity trends, and client telemetry are recorded for each short link.",
  },
];

export default function HomePage() {
  usePageTitle("Nexly — Clean, Modern URL Shortener");
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { url: "" },
  });

  const liveUrl = watch("url");

  const onSubmit = async ({ url }) => {
    if (!url) return;

    if (!isAuthenticated) {
      toast("Please sign in or create an account to shorten URLs.");
      return;
    }

    try {
      const response = await urlService.create({ url });
      toast.success(`Short link created: ${response.data.shortCode}`);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create short link.");
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="section-shell">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="primary" className="mb-2">
              Engineered for clarity
            </Badge>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-label leading-[1.1]"
          >
            Links made simple.
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mx-auto max-w-xl text-base sm:text-lg text-label-secondary leading-relaxed"
          >
            Shorten, manage, and inspect your links in a calm, modern workspace designed for effortless navigation.
          </motion.p>

          {/* Interactive URL Shortener Card */}
          <motion.div 
            variants={itemVariants}
            className="mx-auto mt-8 max-w-xl"
          >
            <Card className="p-4 sm:p-5 shadow-apple-elevated">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1">
                  <Input
                    id="hero-url"
                    aria-label="URL to shorten"
                    placeholder="Paste a link to preview (e.g. https://apple.com)"
                    icon={FiGlobe}
                    {...register("url")}
                  />
                </div>
                <Button type="submit" size="lg" className="h-[42px] shrink-0 group">
                  <span>Shorten</span>
                  <motion.div
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <FiArrowRight size={15} />
                  </motion.div>
                </Button>
              </form>

              {/* Dynamic Live Preview */}
              <div className="mt-3.5 flex items-center justify-between border-t border-separator pt-3 text-xs">
                <span className="text-label-secondary font-medium">Projected link:</span>
                <span className="font-mono font-semibold text-system-blue">
                  {liveUrl
                    ? `nex.ly/${btoa(liveUrl).replace(/=/g, "").slice(0, 7)}`
                    : "nex.ly/preview"}
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-label-secondary"
          >
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> Click telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> QR ready
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-separator border border-separator rounded-apple-xl bg-surface/30 p-6 sm:p-8"
        >
          {metrics.map((metric, idx) => (
            <motion.div key={metric.label} variants={itemVariants} className="flex flex-col items-center justify-center pt-6 sm:pt-0 first:pt-0">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-label">
                <Counter value={metric.value} delay={idx * 150} />+
              </span>
              <span className="mt-2 text-sm font-medium text-label-secondary uppercase tracking-wider">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="section-shell">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mb-8 text-center sm:text-left"
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-wider text-system-blue">Features</motion.p>
          <motion.h2 variants={itemVariants} className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-label">
            Everything you need. Nothing you don't.
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
              >
                <Card className="h-full p-5 flex flex-col justify-between group">
                  <div>
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex h-9 w-9 items-center justify-center rounded-apple-md bg-system-blue/10 text-system-blue"
                    >
                      <Icon size={18} />
                    </motion.div>
                    <h3 className="mt-4 text-base font-semibold text-label tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-label-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Social Proof & Preview */}
      <section id="preview" className="section-shell overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="primary">Control Center</Badge>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold tracking-tight text-label">
              A single dashboard for all your link assets.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-label-secondary leading-relaxed">
              Track link activity, manage expiration states, generate QR codes, and monitor performance trends across platforms with zero setup friction.
            </motion.p>
            <motion.div variants={itemVariants} className="pt-2">
              <Link to="/register">
                <Button size="lg" className="group">
                  Create free workspace
                  <motion.div className="group-hover:translate-x-1 transition-transform">
                    <FiArrowRight size={15} />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-3"
          >
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
              >
                <Card className="p-4 sm:p-5">
                  <p className="text-sm text-label italic leading-relaxed">“{t.quote}”</p>
                  <div className="mt-3 flex items-center justify-between border-t border-separator/60 pt-2.5 text-xs">
                    <span className="font-semibold text-label">{t.name}</span>
                    <span className="text-label-tertiary">{t.role}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-shell">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mb-6 text-center sm:text-left"
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-wider text-system-blue">Questions</motion.p>
          <motion.h2 variants={itemVariants} className="mt-1 text-2xl font-bold tracking-tight text-label">Frequently Asked Questions</motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid gap-3 sm:grid-cols-3"
        >
          {faqs.map((faq) => (
            <motion.div key={faq.question} variants={itemVariants}>
              <Card className="p-5 h-full">
                <h3 className="text-sm font-semibold text-label">{faq.question}</h3>
                <p className="mt-2 text-xs sm:text-sm text-label-secondary leading-relaxed">{faq.answer}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
