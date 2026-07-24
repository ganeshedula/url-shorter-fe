import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiClock, FiCommand, FiLock, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Badge } from "../components/common/Badge";
import { featureHighlights } from "../constants/navigation";
import { useAuth } from "../context/AuthContext";
import { urlService } from "../services/urlService";
import { usePageTitle } from "../hooks/usePageTitle";

const testimonials = [
  { name: "Mina Patel", role: "Growth Lead", quote: "The redesign feels like a real product dashboard, not a bolt-on tool." },
  { name: "Arjun Rao", role: "Product Designer", quote: "Fast, calm, and incredibly legible. We finally enjoy checking link analytics." },
  { name: "Ava Turner", role: "Operations Manager", quote: "The creation flow is effortless, and the dashboard has zero wasted space." },
];

const faqs = [
  {
    question: "Can I keep using the existing backend?",
    answer: "Yes. This frontend is designed around the current authentication and URL APIs without changing backend contracts.",
  },
  {
    question: "Does it support team workflows?",
    answer: "The UI is structured like a SaaS product, so adding teams, billing, or richer analytics later will fit naturally.",
  },
  {
    question: "What about dark mode?",
    answer: "Dark and light themes are built into the design system through shared CSS variables.",
  },
];

export default function HomePage() {
  usePageTitle("Premium URL Shortener");
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { url: "" },
  });

  const liveUrl = watch("url");

  const onSubmit = async ({ url }) => {
    if (!url) {
      return;
    }

    if (!isAuthenticated) {
      toast("Create an account to generate a live short link.");
      return;
    }

    try {
      const response = await urlService.create({ url });
      toast.success(`Short link created: ${response.data.shortCode}`);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to shorten this URL right now.");
    }
  };

  return (
    <div className="space-y-20 pt-10">
      <section className="section-shell">
        <div className="hero-grid glass-panel relative overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute right-8 top-8 hidden h-24 w-24 rounded-full bg-primary/20 blur-3xl lg:block" />
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <Badge variant="primary">Premium SaaS-style redesign</Badge>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl leading-tight sm:text-6xl">
                  Shorten links with a{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    cleaner product experience
                  </span>
                  .
                </h1>
                <p className="max-w-2xl text-lg">
                  Nexly turns your URL shortener into a modern workspace with sharper analytics, calmer workflows, and a portfolio-grade interface.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-[1fr_auto]">
                <Input
                  id="landing-url"
                  aria-label="Enter a URL to shorten"
                  placeholder="Paste a long URL to preview the experience"
                  {...register("url")}
                />
                <Button type="submit" size="lg">
                  Shorten now
                  <FiArrowRight />
                </Button>
              </form>

              <div className="flex flex-wrap gap-6 text-sm">
                {["Fast creation flow", "Dark + light mode", "Analytics dashboard", "Refresh-token auth"].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-semibold text-text">
                    <FiCheckCircle className="text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 animate-float rounded-[36px] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
              <Card className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Live product preview</p>
                    <h2 className="mt-2 text-2xl">Control center</h2>
                  </div>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-border bg-surface-alt/40 p-4">
                    <p className="text-sm font-semibold text-muted">Projected short link</p>
                    <h3 className="mt-3 text-xl text-primary">
                      {liveUrl ? `nex.ly/${btoa(liveUrl).replace(/=/g, "").slice(0, 8)}` : "nex.ly/launch24"}
                    </h3>
                    <p className="mt-2 text-sm">Generated with the current backend once you sign in.</p>
                  </div>
                  <div className="rounded-[24px] border border-border bg-surface-alt/40 p-4">
                    <p className="text-sm font-semibold text-muted">Click velocity</p>
                    <div className="mt-4 h-24 rounded-[20px] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[FiZap, FiBarChart2, FiCommand].map((Icon, index) => (
                    <div key={index} className="rounded-[24px] border border-border p-4">
                      <Icon className="text-primary" size={20} />
                      <p className="mt-4 text-sm font-semibold text-text">
                        {["Faster creation", "Actionable analytics", "QR-ready sharing"][index]}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="section-shell">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Badge variant="secondary">Feature set</Badge>
            <h2 className="mt-3 text-4xl">Built to feel like a serious SaaS product</h2>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {featureHighlights.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel rounded-[28px] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon size={22} />
              </div>
              <h3 className="mt-6 text-xl">{feature.title}</h3>
              <p className="mt-3">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { icon: FiZap, title: "Fast", text: "Create branded short links with one focused action." },
            { icon: FiLock, title: "Secure", text: "JWT sessions, refresh rotation, and consistent protected routes." },
            { icon: FiClock, title: "History-aware", text: "Track recency, expiration, and momentum at a glance." },
          ].map((item) => (
            <Card key={item.title}>
              <item.icon className="text-primary" size={22} />
              <h3 className="mt-5 text-2xl">{item.title}</h3>
              <p className="mt-3">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <Badge variant="primary">How it works</Badge>
            <div className="mt-8 space-y-6">
              {[
                "Create an account and authenticate with the existing backend.",
                "Generate short links, manage lifecycle status, and search your library.",
                "Review analytics and recent click events in a focused dashboard.",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <Badge variant="secondary">Social proof</Badge>
            <div className="mt-8 grid gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-[24px] border border-border p-5">
                  <p className="text-base text-text">“{testimonial.quote}”</p>
                  <div className="mt-4">
                    <p className="font-semibold text-text">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="pricing" className="section-shell">
        <Card className="text-center">
          <Badge>Pricing coming soon</Badge>
          <h2 className="mt-4 text-4xl">The interface is ready for a billing layer when the backend is.</h2>
          <p className="mx-auto mt-4 max-w-2xl">
            The current release focuses on premium product feel, URL workflows, and dashboard analytics while keeping API compatibility intact.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button size="lg">Start for free</Button>
            </Link>
          </div>
        </Card>
      </section>

      <section id="faq" className="section-shell">
        <div className="grid gap-5 lg:grid-cols-3">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-xl">{faq.question}</h3>
              <p className="mt-3">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
