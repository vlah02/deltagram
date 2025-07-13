module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#F0F0F0',
        'dark-bg': '#161616',
        text: '#262626',
        'dark-text': '#E1E1E1',
        'header-bg': '#E0E0E0',
        'dark-header-bg': '#1f1f1f',
        'sidebar-bg': '#fff',
        'dark-sidebar-bg': '#242526',
        'input-bg': '#F0F0F0',
        'container-bg': '#E0E0E0',
        'dark-container-bg': '#1f1f1f',
        'modal-bg': '#fff',
        'dark-modal-bg': '#333',
        accent: '#405DE6',
        'accent-hover': '#007bbf',
        accent2: '#F56040',
        'accent2-hover': '#e24e0a',
        danger: '#ED4956',
      },
      boxShadow: {
        modal: '0 0 20px rgba(0, 0, 0, 0.15)',
        modalDark: '0 0 20px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
  content: [
    './views/**/*.pug',
    './public/**/*.html',
    './public/**/*.js',
  ],
};
