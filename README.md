# The Scholars' Home Website

A modern, responsive website for The Scholars' Home educational institution built with React, TypeScript, and Supabase.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- A Supabase account and project

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

Required dependencies:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.7",
    "framer-motion": "^11.0.8",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## Environment Setup

1. Create a `.env.local` file in the root directory with your environment variables:

```env
# Supabase Configuration (Client-side - accessible in browser)
# Required: These variables must be prefixed with NEXT_PUBLIC_ for client-side access
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Configuration (Server-side - NOT exposed to browser)
# Required for admin operations
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Notion API Configuration (for sports interest form)
NOTION_TOKEN=your_notion_integration_token
NOTION_SPORTS_DATABASE_ID=your_notion_database_id

# Google Calendar API (optional)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key_with_escaped_newlines
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your_google_calendar_id

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important Notes:**
- Use `.env.local` (not `.env`) for local development - it's automatically ignored by git
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Server-side variables (without prefix) are only available in API routes and server components

2. Set up Supabase:
   - Create a new Supabase project
   - Run the migration files from the `supabase/migrations` directory
   - Set up storage buckets for images
   - Configure authentication settings

## Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/      # React context providers
│   ├── data/          # Static data and configurations
│   ├── lib/           # Utility functions and libraries
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── supabase/
    └── migrations/    # Database migration files
```

## Important Notes

1. **Database Migrations**
   - Never modify existing migration files
   - Create new migration files for any schema changes
   - Follow the naming convention for migration files

2. **Environment Variables**
   - Never commit the `.env` file
   - Keep sensitive data in environment variables
   - Use the provided example `.env.example` as a template

3. **Image Assets**
   - Use Unsplash URLs for images
   - Store user-uploaded images in Supabase storage
   - Follow the image optimization guidelines

4. **Authentication**
   - Email/password authentication is enabled by default
   - Configure additional providers in Supabase dashboard
   - Follow the security best practices

5. **Performance**
   - Optimize images before upload
   - Use lazy loading for images
   - Implement proper caching strategies

## Security Considerations

1. **Database Access**
   - Use Row Level Security (RLS) policies
   - Never expose sensitive data
   - Validate user permissions

2. **Authentication**
   - Implement proper session management
   - Use secure password policies
   - Enable email verification

3. **API Security**
   - Use HTTPS for all requests
   - Implement rate limiting
   - Validate all user inputs

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   - Clear the `node_modules` and reinstall dependencies
   - Check for TypeScript errors
   - Verify environment variables

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Review RLS policies

3. **Authentication Problems**
   - Clear browser cache
   - Check Supabase authentication settings
   - Verify email configurations

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.