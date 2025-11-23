# Event Sentinel Bot Website

A modern, responsive website for distributing and promoting the Event Sentinel Discord bot - a professional event logger that tracks all major server events using rich, detailed embeds. This website is designed to be hosted on GitHub Pages.

## Features

- 🎨 Modern, Discord-inspired dark theme
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🚀 Fast loading and optimized
- 📖 Clear installation and usage instructions
- 🔗 Easy integration with GitHub Pages

## Setup for GitHub Pages

### Option 1: Automatic GitHub Pages (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Event Sentinel website"
   git branch -M main
   git remote add origin https://github.com/yourusername/Event-Sentinel-Bot-Website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Site:**
   - Your site will be available at: `https://yourusername.github.io/Event-Sentinel-Bot-Website/`
   - It may take a few minutes for the site to be live

### Option 2: Using GitHub Actions (Advanced)

If you want more control over the deployment process, you can use GitHub Actions. However, for a static HTML site, the automatic method above is sufficient.

## Customization

### Update GitHub Links

Before deploying, make sure to update the GitHub repository links in `index.html`:

1. Replace `yourusername` with your actual GitHub username
2. Update repository name if different from `Event-Sentinel-bot`

Search for these in `index.html`:
- `https://github.com/yourusername/Event-Sentinel-bot`

### Customize Content

- **Bot Name:** Update "Event Sentinel" throughout the site if needed
- **Features:** The features section accurately reflects the bot's event logging categories (Moderation, Voice, Messages, Channels, Roles, Server)
- **Commands:** Currently displays the `/setlogchannel` command - add more if the bot gains additional commands
- **Colors:** Adjust CSS variables in `styles.css` to match your brand
- **GitHub Links:** All GitHub repository links are already updated to `hugsndnugs/Event-Sentinel-bot-main`

### Color Scheme

The website uses a Discord-inspired color scheme. You can customize it by modifying CSS variables in `styles.css`:

```css
:root {
    --primary-color: #5865F2;    /* Discord blurple */
    --secondary-color: #57F287;  /* Discord green */
    --bg-primary: #36393F;       /* Discord dark gray */
    /* ... more variables */
}
```

## File Structure

```
Event-Sentinel-Bot-Website/
│
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

If you'd like to improve the website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This website template is provided as-is. Feel free to modify and use it for your Discord bot distribution.

## Support

For issues or questions:
- Open an issue on GitHub
- Check the bot's main repository for bot-specific support

---

**Note:** The website has been configured with the correct GitHub repository links (`hugsndnugs/Event-Sentinel-bot-main`) and accurately reflects the Event Sentinel bot's functionality as an event logger. All content matches the bot's README.

