document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const iconImg = document.getElementById('themeIcon');

    const icons = {
        moon:  '/images/moon.svg',
        moonFill: '/images/moon-fill.svg',
        sun:   '/images/sun.svg',
        sunFill:  '/images/sun-fill.svg'
    };

    let darkMode = localStorage.getItem('theme') === 'dark';

    function updateIcon(filled = false) {
        if (darkMode) {
            iconImg.src = filled ? icons.sunFill : icons.sun;
        } else {
            iconImg.src = filled ? icons.moonFill : icons.moon;
        }
    }

    function updateTheme() {
        document.documentElement.classList.toggle('dark', darkMode);
        updateIcon();
    }

    updateTheme();

    toggleBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        updateTheme();
    });

    toggleBtn.addEventListener('mouseenter', () => updateIcon(true));
    toggleBtn.addEventListener('mouseleave', () => updateIcon(false));
});
