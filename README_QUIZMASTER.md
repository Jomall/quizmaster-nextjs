# QuizMaster - Online Quiz Management System

A modern, full-stack quiz management application built with Next.js 15, TypeScript, and Tailwind CSS. Designed for teachers to create and manage quizzes, and for students to take quizzes and track their progress.

## 🚀 Features

### For Teachers
- **Quiz Creation**: Create custom quizzes with multiple question types
- **Content Management**: Upload and share learning resources (notes, videos, links)
- **Student Progress Tracking**: Monitor student performance and quiz results
- **Dashboard Analytics**: View comprehensive statistics and insights

### For Students
- **Quiz Taking**: Take interactive quizzes with real-time feedback
- **Progress Tracking**: View quiz history and performance metrics
- **Learning Resources**: Access teacher-uploaded content and materials
- **Results Analysis**: Detailed feedback on quiz performance

### Technical Features
- **Authentication**: Secure user authentication with NextAuth.js
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript support throughout the application
- **Database**: Prisma ORM with PostgreSQL/SQLite support
- **File Upload**: Support for uploading various content types

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jomall/quizmaster.git
   cd quizmaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXTAUTH_URL=http://localhost:8000
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000)

## 🎯 Demo Credentials

### Student Account
- **Email**: student1@school.edu
- **Password**: student123

### Teacher Account
- **Email**: teacher1@school.edu
- **Password**: teacher123

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── student/           # Student dashboard and features
│   ├── teacher/           # Teacher dashboard and features
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components (Radix UI)
│   ├── auth/             # Authentication components
│   ├── navigation/       # Navigation components
│   └── upload/           # File upload components
├── lib/                  # Utility functions and configurations
├── types/               # TypeScript type definitions
└── middleware.ts        # Next.js middleware
```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Push to GitHub
   - Connect repository to Vercel
   - Deploy automatically on push

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio

## 📱 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=QuizMaster+Landing+Page)

### Teacher Dashboard
![Teacher Dashboard](https://via.placeholder.com/800x400?text=Teacher+Dashboard)

### Student Dashboard
![Student Dashboard](https://via.placeholder.com/800x400?text=Student+Dashboard)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
