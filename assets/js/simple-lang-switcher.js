// Simple Language Switcher - Guaranteed to Work
console.log('Simple Language Switcher: Loading...');

function createSimpleLanguageSwitcher() {
    console.log('Creating simple language switcher...');
    
    const navbar = document.querySelector('.nav-menu');
    if (!navbar) {
        console.error('Navbar not found!');
        return;
    }

    // Remove existing switcher
    const existing = document.querySelector('.language-switcher');
    if (existing) {
        existing.remove();
    }

    // Create switcher HTML
    const switcherHTML = `
        <div class="language-switcher" style="margin-left: 1rem;">
            <div class="language-dropdown" style="position: relative; display: inline-block;">
                <button id="lang-btn" type="button" style="
                    background: white; 
                    border: 1px solid #ccc; 
                    padding: 8px 12px; 
                    cursor: pointer; 
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                ">
                    <span id="lang-flag">🇺🇸</span>
                    <span id="lang-text">English</span>
                    <span id="lang-arrow">▼</span>
                </button>
                <div id="lang-menu" style="
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    min-width: 120px;
                    z-index: 1000;
                    display: none;
                ">
                    <a href="#" data-lang="en" style="
                        display: flex; 
                        align-items: center; 
                        gap: 8px; 
                        padding: 8px 12px; 
                        text-decoration: none; 
                        color: #333;
                    ">
                        <span>🇺🇸</span>
                        <span>English</span>
                    </a>
                    <a href="#" data-lang="fr" style="
                        display: flex; 
                        align-items: center; 
                        gap: 8px; 
                        padding: 8px 12px; 
                        text-decoration: none; 
                        color: #333;
                    ">
                        <span>🇫🇷</span>
                        <span>Français</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    navbar.insertAdjacentHTML('beforeend', switcherHTML);
    console.log('Language switcher HTML added');

    // Bind events
    const btn = document.getElementById('lang-btn');
    const menu = document.getElementById('lang-menu');
    const options = document.querySelectorAll('[data-lang]');

    if (btn && menu) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language button clicked');
            
            const isVisible = menu.style.display !== 'none';
            menu.style.display = isVisible ? 'none' : 'block';
            console.log('Menu visibility toggled to:', menu.style.display);
        });

        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = this.dataset.lang;
                console.log('Language option clicked:', lang);
                
                // Update button
                const flag = document.getElementById('lang-flag');
                const text = document.getElementById('lang-text');
                
                if (lang === 'en') {
                    flag.textContent = '🇺🇸';
                    text.textContent = 'English';
                } else {
                    flag.textContent = '🇫🇷';
                    text.textContent = 'Français';
                }
                
                // Close menu
                menu.style.display = 'none';
                
                // Save preference
                localStorage.setItem('raghim-language', lang);
                console.log('Language switched to:', lang);
                
                // Apply translations
                applyTranslations(lang);
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                menu.style.display = 'none';
            }
        });

        console.log('Events bound successfully');
    } else {
        console.error('Failed to find button or menu elements');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSimpleLanguageSwitcher);
} else {
    createSimpleLanguageSwitcher();
}

// Fallback initialization
setTimeout(() => {
    if (!document.querySelector('.language-switcher')) {
        console.log('Fallback initialization...');
        createSimpleLanguageSwitcher();
    }
}, 1000);

// Translation application function
async function applyTranslations(lang) {
    console.log('Applying translations for language:', lang);
    
    try {
        const response = await fetch('assets/js/translations.json');
        const translations = await response.json();
        
        const elements = document.querySelectorAll('[data-translate]');
        console.log('Found', elements.length, 'elements to translate');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = getTranslation(translations[lang], key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
                console.log('Translated', key, 'to', translation);
            } else {
                console.log('No translation found for', key);
            }
        });
        
        console.log('Translation application complete');
    } catch (error) {
        console.error('Failed to apply translations:', error);
    }
}

function getTranslation(obj, key) {
    const keys = key.split('.');
    let result = obj;
    
    for (const k of keys) {
        if (result && result[k]) {
            result = result[k];
        } else {
            return null;
        }
    }
    
    return result;
}

// Apply translations on page load
const savedLang = localStorage.getItem('raghim-language');
if (savedLang && savedLang !== 'en') {
    console.log('Applying saved language:', savedLang);
    applyTranslations(savedLang);
}

console.log('Simple Language Switcher: Loaded');
