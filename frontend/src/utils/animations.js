// Animation utilities for consistent microinteractions across the website
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Common hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
  transition: { duration: 0.2, ease: 'easeOut' }
};

// Common styles for consistent UI
export const commonStyles = {
  container: {
    section: 'py-16 sm:py-24',
    card: 'bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6',
    button: {
      primary: 'px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
      secondary: 'px-6 py-3 bg-white/10 text-white rounded-lg font-semibold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300',
    },
    text: {
      heading: 'text-3xl sm:text-4xl font-bold text-white mb-6',
      subheading: 'text-xl sm:text-2xl text-purple-100 mb-4',
      body: 'text-base sm:text-lg text-purple-100',
    },
  },
  
  // Interactive elements
  interactive: {
    link: 'text-purple-200 hover:text-white transition-colors duration-300',
    icon: 'w-6 h-6 text-purple-200 hover:text-white transition-colors duration-300',
    focus: 'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]'
  }
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Animation keyframes
export const keyframes = {
  gradientShift: `
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `,
  fadeInUp: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `
};

// Global styles to be added to your CSS
export const globalStyles = `
  @keyframes grid-shift {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 4rem 4rem;
    }
  }

  .animate-grid-shift {
    animation: grid-shift 20s linear infinite;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Better touch targets */
  button, a {
    min-height: 44px;
    min-width: 44px;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid rgba(168, 85, 247, 0.5);
    outline-offset: 2px;
  }

  /* Improved text contrast */
  .text-purple-100 {
    color: rgba(243, 232, 255, 1);
  }

  /* Better mobile tap targets */
  @media (max-width: 640px) {
    button, a {
      padding: 0.75rem 1rem;
    }
  }
`; 