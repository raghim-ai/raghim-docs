// RaghimAI Enterprise Documentation Translation System
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('raghim-language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageSwitcher();
        this.applyTranslations();
        this.bindEvents();
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
        if (!navbar) return;

        // Create language switcher
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" id="language-btn">
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

        // Insert before the last nav item
        navbar.appendChild(languageSwitcher);
    }

    bindEvents() {
        const languageBtn = document.getElementById('language-btn');
        const languageMenu = document.getElementById('language-menu');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageBtn && languageMenu) {
            languageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                languageMenu.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-switcher')) {
                    languageMenu.classList.remove('active');
                }
            });
        }

        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.currentTarget.dataset.lang;
                this.switchLanguage(lang);
                languageMenu.classList.remove('active');
            });
        });
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
