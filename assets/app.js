document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById('header');
    const navbarMedias = document.getElementById('navbarMedias');

    const updateNavbar = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 991) {
            navbarMedias.classList.remove('menu-responsive');
            navbarMedias.classList.add('menu-normal');
            header.classList.remove('menu-responsive');
        } else {
            navbarMedias.classList.remove('menu-normal');
            navbarMedias.classList.add('menu-responsive');
            header.classList.add('menu-responsive');
        }
    };

    const updateLanguageDisplay = (lang) => {
        const windowWidth = window.innerWidth;
        const textContainers = document.querySelectorAll('.lang-container');

        textContainers.forEach(container => {
            const englishText = container.querySelector('.lang-en');
            const frenchText = container.querySelector('.lang-fr');

            const isInResponsiveMenu = container.closest('#navbarMedias.menu-responsive');

            if (windowWidth < 991 && isInResponsiveMenu) {
                if (lang === 'en') {
                    frenchText.style.transform = 'translateY(-100%)';
                    frenchText.style.opacity = '0';
                    englishText.style.transform = 'translateY(-100%)';
                    englishText.style.opacity = '1';
                } else {
                    frenchText.style.transform = 'translateY(0)';
                    frenchText.style.opacity = '1';
                    englishText.style.transform = 'translateY(0)';
                    englishText.style.opacity = '0';
                }
            } else {
                if (lang === 'en') {
                    frenchText.style.transform = 'translateY(-100%)';
                    frenchText.style.opacity = '0';
                    englishText.style.transform = 'translateY(0)';
                    englishText.style.opacity = '1';
                } else {
                    frenchText.style.transform = 'translateY(0)';
                    frenchText.style.opacity = '1';
                    englishText.style.transform = 'translateY(100%)';
                    englishText.style.opacity = '0';
                }
            }
        });

        updateTitle(lang);
    };

    const initLanguageSwitcher = () => {
        const langButtons = document.querySelectorAll('.lang-nav li a');

        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.id;

                document.querySelector('.lang-nav li.active').classList.remove('active');
                button.parentElement.classList.add('active');

                updateLanguageDisplay(lang);
            });
        });
    };

    const updateTitle = (lang) => {
        const path = window.location.pathname + window.location.hash;
        let title = 'FIPATech';
    
        const titles = {
            'en': {
                '/': ' | Home',
                '/#': ' | Home'
            },
            'fr': {
                '/': ' | Accueil',
                '/#': ' | Accueil'
            }
        };
    
        if (titles[lang] && titles[lang][path]) {
            title += titles[lang][path];
        }
    
        document.title = title;
    };

    const updateTitleNavbarContainerLinks = () => {
        const navbarLinks = document.querySelectorAll('.left-nav a, .right-nav a');

        navbarLinks.forEach(link => {
            link.addEventListener('click', () => {
                const activeLangButton = document.querySelector('.lang-nav li.active a');
                if (activeLangButton) {
                    setTimeout(() => {
                        updateTitle(activeLangButton.id);
                    }, 1);
                }
            });
        });
    };

    updateNavbar();
    initLanguageSwitcher();
    updateTitleNavbarContainerLinks();

    window.addEventListener('resize', () => {
        updateNavbar();
        const activeLangButton = document.querySelector('.lang-nav li.active a');
        if (activeLangButton) {
            updateLanguageDisplay(activeLangButton.id);
        }
    });
});