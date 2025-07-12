document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const iconImg = document.getElementById('themeIcon');

    const icons = {
        moon: '/images/moon.svg',
        moonFill: '/images/moon-fill.svg',
        sun: '/images/sun.svg',
        sunFill: '/images/sun-fill.svg'
    };

    let darkMode = localStorage.getItem('theme') === 'dark';

    function updateTheme() {
        document.documentElement.classList.toggle('dark', darkMode);
        iconImg.src = darkMode ? icons.sun : icons.moon;
        iconImg.style.filter = darkMode ? '' : '';
    }

    updateTheme();

    toggleBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        updateTheme();
    });
});
