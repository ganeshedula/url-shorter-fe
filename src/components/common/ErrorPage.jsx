import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { Button } from "./Button";
import { Card } from "./Card";
import { usePageTitle } from "../../hooks/usePageTitle";

/**
 * Reusable full-screen error page component.
 *
 * @param {object}   props
 * @param {string}   props.code            – HTTP status code label (e.g. "404")
 * @param {string}   props.title           – Primary headline
 * @param {string}   props.description     – Supporting explanation text
 * @param {string}   props.pageTitle       – Browser tab title (passed to usePageTitle)
 * @param {React.ElementType} props.icon   – Icon component from react-icons
 * @param {string}   [props.accentColor]   – Tailwind color token for the icon ring (default: "system-blue")
 * @param {Array}    [props.actions]       – Custom action buttons [{label, to, variant, onClick}]
 */
export function ErrorPage({
  code,
  title,
  description,
  pageTitle,
  icon: Icon,
  accentColor = "system-blue",
  actions,
}) {
  usePageTitle(pageTitle);

  const defaultActions = [
    { label: "Back to Home", to: "/", variant: "secondary" },
    { label: "Dashboard", to: "/app/dashboard", variant: "primary" },
  ];

  const resolvedActions = actions || defaultActions;

  /* Map accent token → Tailwind classes */
  const accentMap = {
    "system-blue": { ring: "bg-system-blue/10", icon: "text-system-blue", badge: "text-system-blue" },
    "system-red": { ring: "bg-system-red/10", icon: "text-system-red", badge: "text-system-red" },
    "system-orange": { ring: "bg-system-orange/10", icon: "text-system-orange", badge: "text-system-orange" },
    "system-purple": { ring: "bg-system-purple/10", icon: "text-system-purple", badge: "text-system-purple" },
    "system-gray": { ring: "bg-surface-secondary", icon: "text-label-secondary", badge: "text-label-tertiary" },
  };

  const accent = accentMap[accentColor] || accentMap["system-blue"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-4">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Card className="text-center p-8 shadow-apple-elevated">
          {/* Animated icon container */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${accent.ring}`}
          >
            <Icon size={30} className={accent.icon} />
          </motion.div>

          {/* Status badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className={`text-[11px] font-semibold uppercase tracking-widest ${accent.badge}`}
          >
            {code} Error
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="mt-2 text-2xl font-bold tracking-tight text-label"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="mt-2 text-[13px] leading-relaxed text-label-secondary sm:text-sm"
          >
            {description}
          </motion.p>

          {/* Decorative separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
            className="mx-auto mt-6 mb-6 h-px w-16 bg-separator-opaque origin-center"
          />

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {resolvedActions.map((action) =>
              action.onClick ? (
                <Button
                  key={action.label}
                  variant={action.variant || "primary"}
                  size="md"
                  onClick={action.onClick}
                >
                  {action.icon && <action.icon size={15} />}
                  {action.label}
                </Button>
              ) : (
                <Link key={action.label} to={action.to || "/"}>
                  <Button variant={action.variant || "primary"} size="md">
                    {action.icon && <action.icon size={15} />}
                    {action.label}
                  </Button>
                </Link>
              )
            )}
          </motion.div>

          {/* Subtle home link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-5"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-label-tertiary transition-colors hover:text-label-secondary"
            >
              <FiHome size={12} />
              nexly.app
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
