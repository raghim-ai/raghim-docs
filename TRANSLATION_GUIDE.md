# Translation Guide for RaghimAI Enterprise Documentation

## Overview
This guide explains how to add translations to the RaghimAI Enterprise documentation pages. The system supports English and French translations using a JSON-based approach with `data-translate` attributes.

## How the Translation System Works

### 1. Translation Files
- **`assets/js/translations.json`** - Contains all English and French translations
- **`assets/js/simple-lang-switcher.js`** - Handles language switching and applies translations

### 2. Translation Structure
The JSON file follows this structure:
```json
{
  "en": {
    "section": {
      "subsection": {
        "key": "English text"
      }
    }
  },
  "fr": {
    "section": {
      "subsection": {
        "key": "French text"
      }
    }
  }
}
```

### 3. HTML Implementation
Elements are marked for translation using `data-translate` attributes:
```html
<h1 data-translate="hero.title">Enterprise RAG System</h1>
<p data-translate="hero.subtitle">Secure AI-Powered Document Intelligence</p>
```

## Step-by-Step Translation Process

### Step 1: Identify Untranslated Content
1. Open the HTML file you want to translate
2. Look for text content that doesn't have `data-translate` attributes
3. Note down all the text that needs translation

### Step 2: Add Translations to JSON File
1. Open `assets/js/translations.json`
2. Add new translation keys following the existing structure
3. Add both English and French versions

**Example:**
```json
{
  "en": {
    "new_section": {
      "title": "New Section Title",
      "description": "This is a description",
      "items": {
        "item1": "First item",
        "item2": "Second item"
      }
    }
  },
  "fr": {
    "new_section": {
      "title": "Titre de Nouvelle Section",
      "description": "Ceci est une description",
      "items": {
        "item1": "Premier élément",
        "item2": "Deuxième élément"
      }
    }
  }
}
```

### Step 3: Add data-translate Attributes to HTML
1. Add `data-translate="key.path"` to each element
2. Keep the original English text as fallback

**Example:**
```html
<h2 data-translate="new_section.title">New Section Title</h2>
<p data-translate="new_section.description">This is a description</p>
<ul>
  <li data-translate="new_section.items.item1">First item</li>
  <li data-translate="new_section.items.item2">Second item</li>
</ul>
```

### Step 4: Test the Translation
1. Open the HTML file in a browser
2. Click the language switcher (🇺🇸 English / 🇫🇷 Français)
3. Verify all content translates correctly
4. Check browser console for any missing translation errors

## Translation Guidelines

### 1. Key Naming Convention
- Use descriptive, hierarchical keys
- Use snake_case for multi-word keys
- Group related content under common sections

**Good Examples:**
- `hero.title`
- `capabilities.document_processing`
- `deployment.offline_features.self_contained`

**Bad Examples:**
- `title1`
- `text`
- `item`

### 2. Content Organization
Group translations logically by page sections:
```json
{
  "hero": { /* Hero section content */ },
  "overview": { /* Overview section content */ },
  "capabilities": { /* Capabilities section content */ },
  "deployment": { /* Deployment section content */ },
  "integration": { /* Integration section content */ },
  "security": { /* Security section content */ },
  "support": { /* Support section content */ },
  "footer": { /* Footer content */ }
}
```

### 3. French Translation Tips
- Use formal, professional French
- Maintain technical accuracy
- Keep acronyms in English when appropriate (JWT, API, etc.)
- Use proper French punctuation (spaces before colons, etc.)

## Files That Still Need Translation

### ✅ Completed Files
- **`index.html`** - ✅ Fully translated (home page)

### ❌ Files Still Needing Translation

#### 1. **`deployment-guide.html`**
- **Status:** Partially translated (navigation only)
- **Missing:** All content sections, deployment steps, requirements, troubleshooting
- **Sections to translate:**
  - Prerequisites
  - System Architecture
  - Offline Deployment steps
  - Cloud Deployment steps
  - Configuration options
  - Verification steps
  - Troubleshooting section

#### 2. **`security-guide.html`**
- **Status:** Partially translated (navigation only)
- **Missing:** All security content
- **Sections to translate:**
  - Authentication & Authorization
  - Data Encryption
  - Network Security
  - Audit Logging
  - Advanced Security
  - Compliance & Standards
  - Security Testing
  - Security Architecture

#### 3. **`api-reference.html`** (if exists)
- **Status:** Unknown - needs audit
- **Likely missing:** API endpoints, parameters, examples, error codes

#### 4. **`troubleshooting.html`** (if exists)
- **Status:** Unknown - needs audit
- **Likely missing:** Common issues, solutions, error messages

#### 5. **`integration-guide.html`** (if exists)
- **Status:** Unknown - needs audit
- **Likely missing:** Integration steps, code examples, configuration

## Quick Translation Checklist

For each file you want to translate:

- [ ] **Audit the file** - Identify all untranslated text
- [ ] **Plan the structure** - Decide how to organize translation keys
- [ ] **Add to JSON** - Add English and French translations
- [ ] **Update HTML** - Add `data-translate` attributes
- [ ] **Test thoroughly** - Verify all content translates
- [ ] **Check console** - Look for missing translation errors
- [ ] **Validate French** - Ensure proper French grammar and terminology

## Common Issues and Solutions

### Issue 1: Translation Not Appearing
**Cause:** Missing `data-translate` attribute or incorrect key path
**Solution:** Check the key path matches exactly in JSON file

### Issue 2: Partial Translation
**Cause:** Some elements missing `data-translate` attributes
**Solution:** Add `data-translate` to all text elements

### Issue 3: Console Errors
**Cause:** Translation key not found in JSON
**Solution:** Add missing keys to translations.json

### Issue 4: Language Switcher Not Working
**Cause:** Missing translation script or incorrect file paths
**Solution:** Ensure `simple-lang-switcher.js` is included in HTML

## Testing Your Translations

### 1. Browser Testing
- Test in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Verify language persistence (refresh page)

### 2. Content Verification
- Check all text translates correctly
- Verify technical terms are accurate
- Ensure proper French grammar

### 3. Functionality Testing
- Test language switcher dropdown
- Verify all links still work
- Check responsive design

## Maintenance

### Adding New Languages
To add a new language (e.g., Spanish):

1. Add new language section to `translations.json`:
```json
{
  "en": { /* existing English */ },
  "fr": { /* existing French */ },
  "es": { /* new Spanish translations */ }
}
```

2. Update language switcher in `simple-lang-switcher.js`
3. Add new language option to HTML

### Updating Existing Translations
1. Modify the JSON file
2. Test thoroughly
3. Update any related documentation

## Resources

- **French Translation Tools:** Google Translate, DeepL, Linguee
- **Technical French:** Use industry-standard terminology
- **Validation:** Have native French speakers review translations

---

**Note:** Always test translations thoroughly before deploying to production. The translation system is designed to be robust, but manual verification ensures quality.
