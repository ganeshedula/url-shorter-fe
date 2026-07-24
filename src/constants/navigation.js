import {
  FiActivity,
  FiBarChart2,
  FiGrid,
  FiHome,
  FiLink2,
  FiLock,
  FiSettings,
  FiStar,
} from "react-icons/fi";

export const marketingNav = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/app/dashboard" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing", disabled: true, badge: "Soon" },
  { label: "About", href: "#about" },
];

export const dashboardNav = [
  { label: "Dashboard", href: "/app/dashboard", icon: FiGrid },
  { label: "My URLs", href: "/app/urls", icon: FiLink2 },
  { label: "Analytics", href: "/app/analytics", icon: FiBarChart2 },
  { label: "Settings", href: "/app/settings", icon: FiSettings },
];

export const featureHighlights = [
  {
    icon: FiStar,
    title: "Faster launches",
    description: "Ship short links, vanity tracking, and team-ready workflows in seconds.",
  },
  {
    icon: FiLock,
    title: "Secure by default",
    description: "JWT sessions, scoped access, and visibility into every click event.",
  },
  {
    icon: FiActivity,
    title: "Analytics that tell a story",
    description: "Understand trends, referrers, browsers, and activity without leaving the dashboard.",
  },
  {
    icon: FiHome,
    title: "Built like a product",
    description: "Thoughtful empty states, polished micro-interactions, and premium responsiveness.",
  },
];
