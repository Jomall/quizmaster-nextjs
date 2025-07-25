# 🚀 Complete Deployment Guide for Quiz Management System

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git installed
- Supabase account (free tier works)
- Vercel account (for hosting)

## 🔧 Step 1: Environment Setup

### 1.1 Clone the Repository
```bash
git clone [your-repository-url]
cd quiz-management-system
npm install --legacy-peer-deps
```

### 1.2 Set Up Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Navigate to Project Settings → API
4. Copy your project URL and anon key
5. Go to Storage → Create a new bucket named `content-files`

### 1.3 Configure Environment Variables
Create `.env.local` file:
```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:8000"  # Change for production
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 🗄️ Step 2: Database Setup

### 2.1 Run Database Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 2.2 Seed Database (Optional)
```bash
npx prisma db seed
```

## 🚀 Step 3: Deploy to Vercel

### 3.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 3.2 Deploy to Vercel
```bash
vercel --prod
```

### 3.3 Configure Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add all variables from `.env.local`

## 🔄 Step 4: Production Database Setup

### 4.1 Connect Production Database
1. In Vercel dashboard, go to Storage → Create Database
2. Choose PostgreSQL (powered by Supabase)
3. Copy the connection string to `DATABASE_URL`

### 4.2 Run Production Migrations
```bash
npx prisma migrate deploy
```

## 📱 Step 5: Share with Other Users

### 5.1 Direct Sharing
Share the deployed URL with other users:
```
https://your-project.vercel.app
```

### 5.2 User Registration
Users can:
1. Visit the URL
2. Click "Sign Up" to create accounts
3. Choose "Teacher" or "Student" role
4. Start using the application immediately

### 5.3 Teacher Onboarding
New teachers can:
1. Register as "Teacher"
2. Upload content using the local file upload feature
3. Create quizzes with questions
4. Share quiz links with students

### 5.4 Student Onboarding
New students can:
1. Register as "Student"
2. Browse available content
3. Take quizzes created by teachers
4. View their results and progress

## 🔐 Step 6: Security Configuration

### 6.1 Supabase Storage Policies
Add these policies to your `content-files` bucket:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'content-files');

-- Allow public read access
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'content-files');
```

### 6.2 Database Row Level Security
The Prisma schema includes RLS policies for:
- User-specific content access
- Teacher content management
- Student quiz attempts

## 🎯 Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain in Vercel
1. Go to Vercel project settings
2. Add custom domain
3. Configure DNS as instructed

### 7.2 Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain:
```bash
NEXTAUTH_URL="https://yourdomain.com"
```

## 📊 Step 8: Monitoring & Analytics

### 8.1 Add Analytics
```bash
npm install @vercel/analytics
```

### 8.2 Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'
// Add <Analytics /> to the body
```

## 🔄 Step 9: Continuous Deployment

### 9.1 GitHub Integration
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployments on push

### 9.2 Environment Branches
- `main` branch → Production
- `develop` branch → Preview deployments

## 🎉 Quick Start for New Users

### For Teachers:
1. Visit your deployed URL
2. Sign up as "Teacher"
3. Upload content using local file upload
4. Create quizzes with questions
5. Share quiz links with students

### For Students:
1. Visit your deployed URL
2. Sign up as "Student"
3. Browse available content
4. Take quizzes
5. View results and progress

## 📞 Support & Troubleshooting

### Common Issues:
- **Database connection**: Check DATABASE_URL format
- **Supabase storage**: Ensure bucket exists and policies are set
- **Authentication**: Verify NEXTAUTH_SECRET is set
- **File uploads**: Check Supabase storage bucket permissions

### Debug Commands:
```bash
# Check database connection
npx prisma db pull

# Test file upload
curl -X POST -F "file=@test.mp4" https://your-app.vercel.app/api/upload

# Check environment variables
vercel env ls
```

## 🚀 Deployment Complete!

Your quiz management system is now deployed and ready for use. Share the URL with teachers and students to start using the cloud-based platform immediately!
