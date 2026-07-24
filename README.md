# 🔗 LinkCraft - URL Shortener Frontend

An enterprise-grade, modern, and performant URL Shortener web application built with **React 19**, **Vite 6**, **Tailwind CSS**, and **Framer Motion**. Designed for speed, smooth user experiences, and comprehensive link analytics.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.9-0055FF?logo=framer&logoColor=white)](https://framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

- ⚡ **Instant URL Shortening**: Quick and effortless shortening with custom alias support and QR code generation.
- 🔐 **Complete Authentication Flow**:
  - Secure Login & User Registration
  - Email Verification
  - Forgot & Reset Password workflows
  - Automatic JWT Access & Refresh Token rotation via Axios Interceptors
- 📊 **Advanced Analytics Dashboard**:
  - Detailed overview of active links, total clicks, and conversion rates
  - Visual charts for click trends over time
  - Breakdown by geographical location, device types, and referrer sources
- 🔗 **Link Management**:
  - Search, filter, and paginate shortened URLs
  - Copy to clipboard, edit destination, update status (active/expired), or delete links
  - Custom QR Code generation for offline sharing
- 🎨 **Modern Design & Micro-animations**:
  - Sleek dark/light theme options using Tailwind CSS
  - Smooth page transitions and modal animations powered by **Framer Motion**
  - Toast notifications for real-time feedback using **React Hot Toast**
- 🛡️ **Robust Error & Offline Handling**:
  - Custom 404, 500 error pages and auto-detected offline indicator page
  - Form validation powered by **React Hook Form** and **Zod** schema validation

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **State & HTTP** | [Axios](https://axios-http.com/) (with automatic token refresh interceptors) |
| **Form Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Animations** | [Framer Motion](https://framer.com/motion) |
| **UI Utilities** | [React Icons](https://react-icons.github.io/react-icons/) & [React Hot Toast](https://react-hot-toast.com/) |

---

## 📂 Project Structure

```text
url-shorter-fe/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Images, vectors, and brand icons
│   ├── components/         # Reusable UI components
│   │   ├── charts/         # Analytics charts & graphs
│   │   ├── common/         # Buttons, Modals, Loaders, Protected Routes
│   │   ├── forms/          # Form inputs and Zod schemas
│   │   ├── layouts/        # Layout wrappers (Marketing, Auth, Dashboard)
│   │   └── url/            # URL generator cards, lists, & modal components
│   ├── constants/          # Static constants, config values & navigation routes
│   ├── context/            # AuthContext & global state providers
│   ├── hooks/              # Custom React hooks (e.g., useAuth, useUrlManager)
│   ├── layouts/            # Page layout wrappers
│   ├── pages/              # View components
│   │   ├── auth/           # Login, Register, Forgot Password, Reset Password
│   │   ├── dashboard/      # Overview, URL Manager, Analytics, Settings
│   │   └── HomePage.jsx    # Landing Page
│   ├── services/           # Axios API clients & service modules
│   └── utils/              # Helper functions, token storage & date formatters
├── index.html              # Main HTML template
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration & custom design tokens
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/url-shorter-fe.git
   cd url-shorter-fe
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and specify the API base URL:

   ```env
   VITE_API_BASE_URL=http://localhost:8081
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the local development server using Vite.
- `npm run build`: Compiles and bundles the application for production in the `dist` directory.
- `npm run preview`: Previews the production build locally.

---

## 🔌 API Integration

This application interacts with a backend API (by default at `http://localhost:8081`). The HTTP client (`apiClient.js`) is pre-configured with:

- Automatic `Authorization: Bearer <accessToken>` header insertion.
- Axios response interceptors to catch `401 Unauthorized` errors and automatically refresh access tokens using the saved `refreshToken`.
- Centralized error handling and session expiration routing.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the application:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
