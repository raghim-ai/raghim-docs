# Raghim AI Documentation

Professional documentation for Raghim AI Enterprise Platform, built with Jekyll and GitHub Pages.

## Structure

This documentation is organized as follows:

- `_config.yml` - Jekyll configuration
- `_layouts/` - HTML templates
- `_includes/` - Reusable components
- `assets/` - CSS, JavaScript, and images
- `docs/` - Documentation pages
- `api/` - API reference
- `guides/` - Step-by-step guides
- `index.html` - Homepage

## Features

- Clean, professional design
- Responsive layout
- Search functionality
- Navigation sidebar
- Code syntax highlighting
- Mobile-friendly

## Local Development

To run the documentation locally:

1. Install Jekyll:
   ```bash
   gem install jekyll bundler
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open http://localhost:4000

## Deployment

This documentation is designed to be deployed to GitHub Pages:

1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch"
4. Select the main branch
5. Configure custom domain (doc.raghim.com)

## Custom Domain Setup

To use doc.raghim.com:

1. Add CNAME file:
   ```
   echo "doc.raghim.com" > CNAME
   ```

2. Configure DNS:
   - Add CNAME record: doc.raghim.com → username.github.io
   - Or A records pointing to GitHub Pages IPs

3. Enable HTTPS in GitHub Pages settings

## Contributing

To contribute to the documentation:

1. Edit markdown files in appropriate directories
2. Test locally with Jekyll
3. Submit pull request
4. Documentation will be automatically deployed

## License

This documentation is part of the Raghim AI Enterprise Platform.
