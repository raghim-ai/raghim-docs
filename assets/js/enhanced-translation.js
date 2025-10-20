// Enhanced Translation Manager with better debugging
class EnhancedTranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('raghim-language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        console.log('EnhancedTranslationManager: Starting initialization...');
        
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        console.log('EnhancedTranslationManager: DOM ready, proceeding...');
        
        await this.loadTranslations();
        this.createLanguageSwitcher();
        this.bindEvents();
        this.applyTranslations();
        
        console.log('EnhancedTranslationManager: Initialization complete');
    }

    async loadTranslations() {
        try {
            const response = await fetch('assets/js/translations.json');
            this.translations = await response.json();
            console.log('Translations loaded:', Object.keys(this.translations));
        } catch (error) {
            console.warn('Translation file not found, using empty translations');
            this.translations = { en: {}, fr: {} };
        }
    }

    createLanguageSwitcher() {
        console.log('Creating language switcher...');
        
        const navbar = document.querySelector('.nav-menu');
        if (!navbar) {
            console.error('Navigation menu not found!');
            return;
        }

        // Remove existing switcher if any
        const existingSwitcher = document.querySelector('.language-switcher');
        if (existingSwitcher) {
            console.log('Removing existing language switcher');
            existingSwitcher.remove();
        }

        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" id="language-btn" type="button" style="pointer-events: auto;">
                    <span class="flag">${this.currentLanguage === 'en' ? '🇺🇸' : '🇫🇷'}</span>
                    <span class="lang-text">${this.currentLanguage === 'en' ? 'English' : 'Français'}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="language-menu" id="language-menu" style="display: none;">
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

        navbar.appendChild(languageSwitcher);
        console.log('Language switcher created and added to navbar');
        
        // Verify it was added
        const addedSwitcher = document.querySelector('.language-switcher');
        if (addedSwitcher) {
            console.log('✓ Language switcher successfully added to DOM');
        } else {
            console.error('✗ Failed to add language switcher to DOM');
        }
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Remove any existing event listeners
        if (this.handleClick) {
            document.removeEventListener('click', this.handleClick);
        }
        
        // Bind new event listener
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick);
        
        console.log('Events bound successfully');
    }

    handleClick(e) {
        console.log('Click detected on:', e.target.tagName, e.target.className || e.target.id);

        // Handle language button click
        if (e.target.closest('#language-btn')) {
            console.log('Language button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const languageMenu = document.getElementById('language-menu');
            if (languageMenu) {
                const isVisible = languageMenu.style.display !== 'none';
                console.log('Toggling language menu, currently visible:', isVisible);
                
                if (isVisible) {
                    languageMenu.style.display = 'none';
                } else {
                    languageMenu.style.display = 'block';
                }
            } else {
                console.error('Language menu not found');
            }
            return;
        }

        // Handle language option clicks
        if (e.target.closest('.language-option')) {
            console.log('Language option clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const option = e.target.closest('.language-option');
            const lang = option.dataset.lang;
            console.log('Selected language:', lang);
            
            if (lang && lang !== this.currentLanguage) {
                this.switchLanguage(lang);
            }
            
            // Close menu
            const languageMenu = document.getElementById('language-menu');
            if (languageMenu) {
                languageMenu.style.display = 'none';
            }
            return;
        }

        // Close dropdown when clicking outside
        if (!e.target.closest('.language-switcher')) {
            const languageMenu = document.getElementById('language-menu');
            if (languageMenu && languageMenu.style.display !== 'none') {
                console.log('Closing language menu');
                languageMenu.style.display = 'none';
            }
        }
    }

    switchLanguage(lang) {
        console.log('Switching language to:', lang);
        this.currentLanguage = lang;
        localStorage.setItem('raghim-language', lang);
        
        // Update button
        const btn = document.getElementById('language-btn');
        if (btn) {
            const flag = btn.querySelector('.flag');
            const langText = btn.querySelector('.lang-text');
            
            if (lang === 'en') {
                flag.textContent = '🇺🇸';
                langText.textContent = 'English';
            } else {
                flag.textContent = '🇫🇷';
                langText.textContent = 'Français';
            }
        }
        
        this.applyTranslations();
        console.log('Language switched successfully');
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        console.log('Applying translations to', elements.length, 'elements');
        
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

// Initialize with multiple fallbacks
function initializeTranslation() {
    console.log('Initializing translation manager...');
    try {
        new EnhancedTranslationManager();
    } catch (error) {
        console.error('Failed to initialize translation manager:', error);
    }
}

// Multiple initialization attempts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslation);
} else {
    initializeTranslation();
}

// Fallback initialization after a delay
setTimeout(() => {
    if (!document.querySelector('.language-switcher')) {
        console.log('Language switcher not found, attempting fallback initialization...');
        initializeTranslation();
    }
}, 1000);
