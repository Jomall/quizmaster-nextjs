import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock database for students and teachers
const users = [
  // Students
  { id: "student-1", email: "student1@school.edu", password: "student123", name: "Alice Johnson", role: "student" },
  { id: "student-2", email: "student2@school.edu", password: "student123", name: "Bob Smith", role: "student" },
  { id: "student-3", email: "student3@school.edu", password: "student123", name: "Carol Davis", role: "student" },
  
  // Teachers
  { id: "teacher-1", email: "teacher1@school.edu", password: "teacher123", name: "Dr. Emily Wilson", role: "teacher" },
  { id: "teacher-2", email: "teacher2@school.edu", password: "teacher123", name: "Prof. Michael Brown", role: "teacher" },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };
    },
  },
};
