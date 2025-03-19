This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database Integration

This application now uses a PostgreSQL database via Prisma ORM. The database stores:

- Users and their theme preferences
- Teams with their details
- Games with matchups and betting recommendations

### Database Schema

The database schema is defined in `prisma/schema.prisma` and includes:

- User model for storing theme preferences
- Team model matching the Team interface
- Game model matching the Game interface
- Enums for regions, bet types, and confidence levels

### Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Seed database with initial data
npm run prisma:seed

# Or run all at once
npm run db:init
```

### Reset Database

```bash
npm run db:reset
```

### Explore Database

```bash
npm run prisma:studio
```

This will open Prisma Studio in your browser, allowing you to explore and edit your database data.

## Deployment

This application is set up for easy deployment to Vercel or other platforms.

### Prerequisites

1. Make sure your database is properly set up and accessible from your deployment environment
2. Ensure all environment variables are configured in your deployment platform

### Deploy to Vercel

1. Install Vercel CLI if you haven't already:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy the application:

   ```bash
   vercel
   ```

   Or for production deployment:

   ```bash
   vercel --prod
   ```

### Environment Variables

Ensure the following environment variables are set in your deployment environment:

- `DATABASE_URL`: Your PostgreSQL connection string (including Prisma Accelerate if used)
- Any other environment variables needed for your application

### Build Configuration

The application is configured to automatically generate Prisma client during the build process with these custom scripts:

- `npm run build`: Generates Prisma client and builds the Next.js application
- `npm run build:production`: Same as above but with NODE_ENV set to production

### Manual Deployment

If not using Vercel, you can deploy manually with:

1. Build the application:

   ```bash
   npm run build:production
   ```

2. Start the application:
   ```bash
   npm run start
   ```
