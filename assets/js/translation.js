// RaghimAI Enterprise Documentation Translation System
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('raghim-language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        console.log('Initializing TranslationManager...');
        await this.loadTranslations();
        this.createLanguageSwitcher();
        this.bindEvents();
        this.applyTranslations();
        console.log('TranslationManager initialized successfully');
    }

    async loadTranslations() {
        try {
            const response = await fetch('assets/js/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.warn('Translation file not found, using English as default');
            this.translations = { en: {}, fr: {} };
        }
    }

    createLanguageSwitcher() {
        // Find the navbar container
        const navbar = document.querySelector('.nav-menu');
        if (!navbar) {
            console.warn('Navigation menu not found, language switcher not created');
            return;
        }

        // Check if language switcher already exists
        if (document.querySelector('.language-switcher')) {
            console.log('Language switcher already exists');
            return;
        }

        // Create language switcher
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" id="language-btn" type="button">
                    <span class="flag">${this.currentLanguage === 'en' ? '🇺🇸' : '🇫🇷'}</span>
                    <span class="lang-text">${this.currentLanguage === 'en' ? 'English' : 'Français'}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="language-menu" id="language-menu">
                    <a href="#" data-lang="en" class="language-option">
                        <span class="flag">🇺🇸</span>
                        <span class="lang-text">English</span>
                    </a>
                    <a href="#" data-lang="fr" class="language-option">
                        <span class="flag">🇫🇷</span>
                        <span class="lang-text">Français</span>
                    </a>
                </div>
            </div>
        `;

        // Insert at the end of the navbar
        navbar.appendChild(languageSwitcher);
        console.log('Language switcher created successfully');
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Use event delegation for better reliability
        document.addEventListener('click', (e) => {
            console.log('Click event detected on:', e.target);
            
            // Handle language button click
            if (e.target.closest('#language-btn')) {
                console.log('Language button clicked');
                e.preventDefault();
                e.stopPropagation();
                const languageMenu = document.getElementById('language-menu');
                if (languageMenu) {
                    console.log('Toggling language menu');
                    languageMenu.classList.toggle('active');
                } else {
                    console.error('Language menu not found');
                }
                return;
            }

            // Handle language option clicks
            if (e.target.closest('.language-option')) {
                console.log('Language option clicked');
                e.preventDefault();
                e.stopPropagation();
                const option = e.target.closest('.language-option');
                const lang = option.dataset.lang;
                console.log('Selected language:', lang);
                if (lang) {
                    this.switchLanguage(lang);
                    const languageMenu = document.getElementById('language-menu');
                    if (languageMenu) {
                        languageMenu.classList.remove('active');
                    }
                }
                return;
            }

            // Close dropdown when clicking outside
            if (!e.target.closest('.language-switcher')) {
                const languageMenu = document.getElementById('language-menu');
                if (languageMenu && languageMenu.classList.contains('active')) {
                    console.log('Closing language menu');
                    languageMenu.classList.remove('active');
                }
            }
        });
        
        console.log('Events bound successfully');
    }

    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('raghim-language', lang);
        this.applyTranslations();
        this.updateLanguageSwitcher();
    }

    updateLanguageSwitcher() {
        const languageBtn = document.getElementById('language-btn');
        if (languageBtn) {
            const flag = languageBtn.querySelector('.flag');
            const langText = languageBtn.querySelector('.lang-text');
            
            if (this.currentLanguage === 'en') {
                flag.textContent = '🇺🇸';
                langText.textContent = 'English';
            } else {
                flag.textContent = '🇫🇷';
                langText.textContent = 'Français';
            }
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title
        const titleKey = document.querySelector('title')?.dataset.translate;
        if (titleKey) {
            const titleTranslation = this.getTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        const descKey = metaDesc?.dataset.translate;
        if (descKey) {
            const descTranslation = this.getTranslation(descKey);
            if (descTranslation) {
                metaDesc.content = descTranslation;
            }
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }
}

// Initialize translation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TranslationManager();
});

// Fallback initialization in case DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    new TranslationManager();
}
