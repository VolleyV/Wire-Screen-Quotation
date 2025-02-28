import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        // Replace this with your database check (e.g., PostgreSQL or Supabase)
        const user = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          password: "password123", // In real apps, NEVER store passwords as plain text
        };

        if (email === user.email && password === user.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        // If authentication fails, return null
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Set this in .env.local
  pages: {
    signIn: "/login", // Custom login page (optional)
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
