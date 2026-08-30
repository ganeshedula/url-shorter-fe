import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCheck, FiClock, FiGlobe, FiLock, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { urlService } from "../services/urlService";
import { usePageTitle } from "../hooks/usePageTitle";

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
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Badge variant="primary" className="mb-2">
            Engineered for clarity
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-label leading-[1.1]">
            Links made simple.
          </h1>
          <p className="mx-auto max-w-xl text-base sm:text-lg text-label-secondary leading-relaxed">
            Shorten, manage, and inspect your links in a calm, modern workspace designed for effortless navigation.
          </p>

          {/* Interactive URL Shortener Card */}
          <div className="mx-auto mt-8 max-w-xl">
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
                <Button type="submit" size="lg" className="h-[42px] shrink-0">
                  <span>Shorten</span>
                  <FiArrowRight size={15} />
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
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-label-secondary">
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> Click telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheck className="text-system-green" /> QR ready
            </span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="section-shell">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-system-blue">Features</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-label">
            Everything you need. Nothing you don't.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="h-full p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-apple-md bg-system-blue/10 text-system-blue">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-label tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-label-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Social Proof & Preview */}
      <section id="preview" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <Badge variant="primary">Control Center</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-label">
              A single dashboard for all your link assets.
            </h2>
            <p className="text-sm sm:text-base text-label-secondary leading-relaxed">
              Track link activity, manage expiration states, generate QR codes, and monitor performance trends across platforms with zero setup friction.
            </p>
            <div className="pt-2">
              <Link to="/register">
                <Button size="lg">
                  Create free workspace
                  <FiArrowRight size={15} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-4 sm:p-5">
                <p className="text-sm text-label italic leading-relaxed">“{t.quote}”</p>
                <div className="mt-3 flex items-center justify-between border-t border-separator/60 pt-2.5 text-xs">
                  <span className="font-semibold text-label">{t.name}</span>
                  <span className="text-label-tertiary">{t.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-shell">
        <div className="mb-6 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-system-blue">Questions</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-label">Frequently Asked Questions</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-5">
              <h3 className="text-sm font-semibold text-label">{faq.question}</h3>
              <p className="mt-2 text-xs sm:text-sm text-label-secondary leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
