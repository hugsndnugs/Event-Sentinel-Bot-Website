# Event Sentinel Bot Website

A modern, responsive website for distributing and promoting the Event Sentinel Discord bot - a professional event logger that tracks all major server events using rich, detailed embeds. This website is designed to be hosted on GitHub Pages.

## Features

- 🎨 Modern, Discord-inspired dark theme
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🚀 Fast loading and optimized
- 📖 Clear installation and usage instructions
- 🔗 Easy integration with GitHub Pages
- 👤 Subscriber portal with authentication
- 💳 Subscription management system
- 🤖 Bot token submission and tracking
- ✉️ Modmail system documentation

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

### Setting Up a Custom Domain

To use a custom domain (e.g., `eventsentinel.com` or `www.eventsentinel.com`) with GitHub Pages:

1. **Update the CNAME file:**
   - Edit the `CNAME` file in the root of your repository
   - Replace `example.com` with your actual domain name
   - For a subdomain (e.g., `www`), use: `www.yourdomain.com`
   - For the apex domain (e.g., `yourdomain.com`), use: `yourdomain.com`
   - **Important:** The CNAME file should contain ONLY your domain name, nothing else (no `http://` or `https://`)

2. **Configure DNS Records:**
   
   **For a subdomain (www.yourdomain.com):**
   - Add a `CNAME` record:
     - **Name:** `www` (or your subdomain)
     - **Value:** `yourusername.github.io`
     - **TTL:** 3600 (or default)

   **For an apex domain (yourdomain.com):**
   - Option A: Use ALIAS/ANAME record (if your DNS provider supports it):
     - **Name:** `@` or leave blank
     - **Value:** `yourusername.github.io`
   - Option B: Use A records (if ALIAS not available):
     - Add 4 A records pointing to GitHub Pages IPs:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`

3. **Enable Custom Domain in GitHub:**
   - Go to your repository **Settings** → **Pages**
   - In the **Custom domain** field, enter your domain (e.g., `www.yourdomain.com`)
   - Check **Enforce HTTPS** (GitHub will automatically provision SSL certificate)
   - Click **Save**

4. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate globally
   - You can check propagation status using tools like `whatsmydns.net`
   - GitHub will verify your domain and provision SSL automatically

5. **Verify Setup:**
   - Once DNS has propagated, your site will be accessible at your custom domain
   - GitHub Pages will automatically redirect from `yourusername.github.io` to your custom domain
   - SSL certificate will be automatically provisioned (may take a few hours)

**Note:** If you're using both `www` and apex domain, you'll need to choose one as the primary in the CNAME file. GitHub Pages supports one custom domain per repository.

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
- **Features:** The features section accurately reflects the bot's event logging categories (Moderation, Voice, Messages, Channels, Roles, Server) and modmail system
- **Commands:** Displays `/setlogchannel`, `/setmodmailchannel`, and `/modmail close` commands - add more if the bot gains additional commands
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
├── index.html          # Main HTML file (landing page)
├── portal.html         # Subscriber portal page
├── styles.css          # All styling
├── portal.css          # Portal-specific styles
├── script.js           # JavaScript for main site interactivity
├── portal.js           # Portal authentication and dashboard logic
├── CNAME               # Custom domain configuration
├── TODOS.md            # Project TODO list and status
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

## Subscriber Portal

The website includes a fully functional subscriber portal (`portal.html`) that allows users to:

- **Register/Login**: Create an account or sign in to existing accounts
- **Subscription Management**: View subscription status, plan details, and billing information
- **Bot Token Submission**: Submit Discord bot tokens for bot instance setup
- **Status Tracking**: Monitor bot instance setup progress with visual indicators
- **Invite Link Management**: Receive and copy bot invite links when bot is ready

### Portal Features

- **Authentication System**: LocalStorage-based user authentication (for demo purposes)
- **Dashboard**: Comprehensive dashboard showing subscription and bot status
- **Token Validation**: Basic validation for Discord bot tokens
- **Progress Tracking**: Visual progress indicators for bot setup stages
- **Responsive Design**: Fully responsive portal matching main site design

### Subscription Flow

1. User clicks "Subscribe Now" on pricing cards → Redirects to portal
2. User registers with email, password, and selects a plan
3. User is logged in and sees dashboard
4. User submits Discord bot token through portal
5. System tracks bot setup progress (pending → configuring → ready)
6. User receives invite link when bot is ready

**Note:** The current implementation uses localStorage for demo purposes. In production, this should be replaced with a proper backend API and database.

## Analytics Integration

The website includes a placeholder for analytics integration in `index.html`. To add analytics:

1. Uncomment the appropriate analytics code block
2. Replace placeholder values with your actual analytics IDs
3. Options include:
   - Google Analytics (gtag.js)
   - Plausible Analytics
   - Other privacy-focused analytics services

## Deployment URL

After deploying to GitHub Pages, update the canonical URL and Open Graph meta tags in `index.html` with your actual deployment URL.

**Note:** The website has been configured with the correct GitHub repository links (`hugsndnugs/Event-Sentinel`) and accurately reflects the Event Sentinel bot's functionality as an event logger. All content matches the bot's README.

