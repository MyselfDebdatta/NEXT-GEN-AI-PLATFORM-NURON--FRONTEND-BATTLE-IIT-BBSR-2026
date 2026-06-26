<div align="center">

# Nuron — Agentic Data Automation Platform

**A premium, zero-dependency, highly interactive frontend for autonomous data workflows.**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Report Bug](https://github.com/MyselfDebdatta/NEXT-GEN-AI-PLATFORM-NURON--FRONTEND-BATTLE-IIT-BBSR-2026/issues) · [Request Feature](https://github.com/MyselfDebdatta/NEXT-GEN-AI-PLATFORM-NURON--FRONTEND-BATTLE-IIT-BBSR-2026/issues)

</div>

---

**Nuron** is the frontend manifestation of a next-generation AI operating system built for autonomous data workflows. Designed with an obsessive focus on performance and aesthetics, it delivers a stunning glassmorphic UI, dynamic physics-based interactions, and scroll-driven cinematic reveals—all achieved **without relying on heavy third-party animation libraries**. 

---

## 🏆 Competition Context

> [!NOTE]
> This platform was engineered specifically for the **Frontend Battle IIT BBSR 2026**. The primary objective was to craft a visually spectacular, highly interactive, and structurally robust landing page demonstrating mastery over modern web technologies and complex CSS architectures.

> [!IMPORTANT]
> 👤 **Authorship & Technical Constraints:** I am the **sole developer** of this project. To ensure maximum performance and strictly adhere to best practices, all advanced animations (parallax, magnetic pulls, interactive radial gradients, typewriters) were engineered completely from scratch using **pure native browser APIs** (CSS Variables, Web Animations API, and IntersectionObserver) instead of relying on heavy dependencies like Framer Motion or GSAP.

---

## 🎯 Executive Overview

### 🚨 The Problem
Modern SaaS and AI platforms often suffer from bloated frontend architectures. While they promise "lightning-fast" AI, their landing pages are bogged down by megabytes of JavaScript animation libraries, resulting in layout shifts, poor mobile performance, and a generic, template-like feel.

### 💡 The Solution
Nuron's frontend acts as a technical showcase. It proves that a premium, "Vercel-tier" developer-focused aesthetic can be achieved with ultra-lightweight, hardware-accelerated code. It leverages math and native browser APIs to create an interface that feels physically reactive and alive.

### ✨ Tech Innovations & UX Features
- **Global Hardware-Accelerated Parallax:** A custom `mousemove` listener securely updates global CSS variables (`--px`, `--py`) driving a seamless 3D depth shift across the entire Hero section, glowing orbs, and grid backgrounds.
- **Interactive Spotlight Cards:** The Bento Grid features advanced gradient masks that actively track the user's cursor (`--mouse-x`, `--mouse-y`), casting a soft, realistic "spotlight" across the UI elements.
- **Magnetic Buttons:** Custom React hooks apply dampened mathematical translation (`translate3d`) to CTA buttons, pulling them toward the cursor to create a tactile, physical interaction.
- **Interactive Agent Terminal:** A glassmorphic IDE component that utilizes precise React state timeouts to simulate a developer writing and deploying an agent script, complete with dynamic syntax highlighting and a pulsing success terminal.
- **SVG Ecosystem Graph:** A complex network graphic built purely with `<animateMotion>` inside raw SVGs to show data packets traveling seamlessly between interconnected tool nodes.

---

## 🛠️ Tech Stack

| Category | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 18 & Vite | Lightning-fast HMR and highly optimized production builds. |
| **Styling** | Tailwind CSS v4 & Custom CSS | Utilizes the latest Tailwind engine alongside advanced custom CSS `@keyframes` and dynamic variable injection. |
| **Routing** | TanStack Start/Router | Type-safe, high-performance routing architecture. |
| **Interactions** | Native Web APIs | `IntersectionObserver` for scroll reveals, `Web Animations API` for performant transitions, and pure React hooks for physics. |

---

## 📂 Repository Structure

```
NEXT-GEN-AI-PLATFORM-NURON/
├── src/
│   ├── components/         # Modular UI elements (AgentTerminal, BentoAccordion, Ecosystem)
│   ├── routes/             # TanStack Router page configurations
│   ├── styles.css          # Core CSS, Tailwind configuration, and custom animations
│   └── index.tsx           # Main Landing Page assembly
├── package.json            # Strict, zero-animation-library dependency list
├── vite.config.ts          # Build optimization configurations
└── README.md               # Project documentation
```

---

## 💻 Local Setup

Want to run the platform locally and see the physics in action?

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/MyselfDebdatta/NEXT-GEN-AI-PLATFORM-NURON--FRONTEND-BATTLE-IIT-BBSR-2026.git
cd NEXT-GEN-AI-PLATFORM-NURON--FRONTEND-BATTLE-IIT-BBSR-2026
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` (or the port specified in your terminal) to experience the live platform!

---

## 🔒 Performance Notes
Because this project strictly avoids external UI animation libraries, the resulting JavaScript bundle size is incredibly small. All visual heavy-lifting (gradients, masking, translate3d) is offloaded directly to the GPU via the browser's native compositing engine, ensuring a perfectly smooth 60fps experience even on lower-end mobile devices.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE). Copyright (c) 2026 Debdatta Panda

## 👨‍💻 Author
**Debdatta Panda**  
LinkedIn: [https://www.linkedin.com/in/debdatta-panda-dp11](https://www.linkedin.com/in/debdatta-panda-dp11)  
GitHub: [@MyselfDebdatta](https://github.com/MyselfDebdatta)
