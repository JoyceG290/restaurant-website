# Restaurant Website

A modern restaurant website built with React, Material-UI, and TypeScript. Features include an online ordering system, menu management, and Stripe payment integration.

## Features

- Responsive design for all screen sizes
- Online ordering system with Stripe payment integration
- Beautiful menu presentation with high-quality images
- Reservation system
- Contact form
- Interactive gallery

## Technologies Used

- React 18 (Create React App)
- TypeScript
- Material-UI
- Framer Motion
- React Router
- Stripe Payment Integration

## Deployment to Cloudflare Pages

1. Push your code to a GitHub repository

2. Log in to Cloudflare Dashboard
   - Go to Pages
   - Click "Create a project"
   - Select "Connect to Git"

3. Configure your build settings:
   - Framework preset: Create React App (not Vite or React Static)
   - Build command: `npm run build`
   - Build output directory: `build`
   - Environment variables (if needed):
     - Add your Stripe publishable key as `REACT_APP_STRIPE_PUBLIC_KEY`

4. Deploy settings:
   - Branch: main
   - Build settings: Production

5. After deployment:
   - Your site will be available at `[project-name].pages.dev`
   - Set up a custom domain if desired

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

## Notes

- The site uses client-side routing, which is handled by the `_redirects` file for Cloudflare Pages
- All API keys should be kept secure and never committed to the repository
- Images are served from a CDN for optimal performance
- This project uses Create React App (CRA) for the build system
