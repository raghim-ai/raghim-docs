// Simplified Translation Manager for debugging
class SimpleTranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('raghim-language') || 'en';
        this.init();
    }

    init() {
        console.log('SimpleTranslationManager: Initializing...');
        this.createLanguageSwitcher();
        this.bindEvents();
        console.log('SimpleTranslationManager: Initialized successfully');
    }

    createLanguageSwitcher() {
        const navbar = document.querySelector('.nav-menu');
        if (!navbar) {
            console.warn('Navigation menu not found');
            return;
        }

        // Remove existing switcher if any
        const existingSwitcher = document.querySelector('.language-switcher');
        if (existingSwitcher) {
            existingSwitcher.remove();
        }

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

        navbar.appendChild(languageSwitcher);
        console.log('Language switcher created');
    }

    bindEvents() {
        // Remove any existing event listeners
        document.removeEventListener('click', this.handleClick);
        
        // Bind new event listener
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick);
        
        console.log('Events bound');
    }

    handleClick(e) {
        console.log('Click detected on:', e.target.tagName, e.target.className);

        // Handle language button click
        if (e.target.closest('#language-btn')) {
            console.log('Language button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const languageMenu = document.getElementById('language-menu');
            const dropdown = languageMenu?.parentElement;
            
            if (dropdown) {
                console.log('Toggling dropdown');
                dropdown.classList.toggle('active');
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
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            return;
        }

        // Close dropdown when clicking outside
        if (!e.target.closest('.language-switcher')) {
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown && dropdown.classList.contains('active')) {
                console.log('Closing dropdown');
                dropdown.classList.remove('active');
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
        
        console.log('Language switched successfully');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SimpleTranslationManager();
    });
} else {
    new SimpleTranslationManager();
}

