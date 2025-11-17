# WhatsApp Expense Tracker - Landing Page & Registration

This directory contains the landing page and registration flow for the WhatsApp Expense Tracking bot.

## Features

- **Mobile-first responsive design** - Optimized for all devices
- **RTL support** - Full Hebrew and English language support
- **Modern UI** - Clean, professional design with WhatsApp green accent
- **Registration flow** - Complete user onboarding with phone validation
- **Legal pages** - Privacy policy and terms of service in both languages

## Structure

```
web/
├── index.html          # Landing page
├── register.html       # Registration form
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── main.js        # Language switching and shared functionality
│   └── register.js    # Registration form handling
├── images/            # (Future: icons and illustrations)
├── vercel.json        # Vercel deployment configuration
└── README.md          # This file
```

## Deployment to Vercel

### Prerequisites

- Vercel account ([sign up](https://vercel.com/signup))
- Vercel CLI installed: `npm i -g vercel`

### Deploy Steps

1. **Navigate to the web directory:**
   ```bash
   cd web
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to your Vercel account
   - Set up and deploy
   - Choose project name
   - Confirm settings

4. **Update API endpoint:**
   - After deployment, update the `API_BASE_URL` in `js/register.js` if needed
   - By default, it points to your Cloud Run backend

### Production Deployment

For production deployment:

```bash
vercel --prod
```

## Backend Integration

The frontend connects to the Go backend API for user registration:

- **Registration endpoint:** `POST /api/register`
- **Health check:** `GET /api/health`

### Backend Configuration

Make sure your Go backend (deployed on Cloud Run) has:

1. **CORS enabled** - Already configured in `cmd/main.go`
2. **Migration applied** - Run migration `004_user_registration.sql`
3. **API endpoints active** - The new handlers are registered

### Testing Backend Connection

Update `js/register.js` to point to your backend:

```javascript
const API_BASE_URL = 'https://your-backend.run.app';
```

## Local Development

To test locally:

1. **Start a simple HTTP server:**
   ```bash
   # Python 3
   python3 -m http.server 8000

   # OR Node.js
   npx http-server -p 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Start the Go backend:**
   ```bash
   cd ..
   go run cmd/main.go
   ```

4. **Update API endpoint in `js/register.js`:**
   ```javascript
   const API_BASE_URL = 'http://localhost:8080';
   ```

## Customization

### Colors

Edit `css/style.css` CSS variables:

```css
:root {
  --primary-color: #0066cc;      /* Main brand color */
  --secondary-color: #00a884;    /* Secondary color */
  --whatsapp-green: #25D366;     /* WhatsApp accent */
}
```

### Content

- **Landing page:** Edit `index.html` and update translations in `js/main.js`
- **Registration:** Modify `register.html` and `js/register.js`
- **Legal pages:** Update `privacy.html` and `terms.html`

### Adding Images/Icons

Place images in the `images/` directory and reference them:

```html
<img src="/images/hero-image.png" alt="Hero">
```

## Israeli Payment Integration (TODO)

The registration flow currently has placeholder for payment integration.

Recommended Israeli payment providers:
- **Meshulam** - https://www.meshulam.co.il/
- **Tranzila** - https://www.tranzila.com/
- **PayPlus** - https://www.payplus.co.il/
- **Cardcom** - https://www.cardcom.solutions/

### Implementation Steps:

1. Choose a payment provider
2. Add payment provider SDK to registration page
3. Update `js/register.js` to handle payment flow
4. Add webhook endpoints in backend for payment confirmation
5. Update user subscription status upon successful payment

## Security Notes

- All forms validate input on both client and server side
- Israeli phone number format validation included
- HTTPS enforced on Vercel by default
- Security headers configured in `vercel.json`
- No sensitive data stored in frontend
- Registration tokens generated securely on backend

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL layout support for Hebrew

## Performance

- Minimal JavaScript (vanilla JS, no frameworks)
- Optimized CSS with mobile-first approach
- Static files cached for 1 year on Vercel
- No external dependencies (except fonts)

## Next Steps

1. **Domain Configuration:**
   - Add custom domain in Vercel dashboard
   - Update CORS settings in backend if needed

2. **Payment Integration:**
   - Implement Israeli payment provider
   - Add payment webhook handlers

3. **Analytics:**
   - Add Google Analytics or similar
   - Track registration conversion rates

4. **A/B Testing:**
   - Test different CTAs
   - Optimize pricing presentation

5. **SEO:**
   - Add meta tags for social sharing
   - Create sitemap
   - Add structured data

## Support

For issues or questions:
- Check backend logs in Cloud Run
- Verify CORS settings
- Test API endpoints with curl/Postman
- Check browser console for frontend errors
