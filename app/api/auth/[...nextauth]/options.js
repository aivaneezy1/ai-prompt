import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: `Credentials`,

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter a username",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "Enter a Password",
        },
      },
      async authorize(credentials, req) {
        try {
          await connectDB();

          // Find user by username
          const user = await User.findOne({ username: credentials.username });

          // Check if user exists and verify password
          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            // Return user information if authenticated
            return {
              id: user._id.toString(),
              name: user.username,
              email: user.email,
              role: user.role,
            };
          } else {
            // Return null or false if authentication fails
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Return null on error
        }
      },
    }),

    GoogleProvider({
      profile(profile) {
        let userRole = "Google User"; 
        if (profile?.email == process.env.ADMIN) userRole = "admin";

        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      profile(profile) {
        let userRole = "Github User";
        if (profile?.email == process.env.ADMIN) userRole = "admin";

        return {
          ...profile,
          role: userRole,
          id: profile.id,
          image: profile.avatar_url,
        };
      },

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectDB();  
        if (profile?.email) {
          const userExists = await User.findOne({ email: profile.email });
          if (!userExists) {
            await User.create({
              username: profile.name.toLowerCase(),
              email: profile.email,
              userId: profile.id || profile.sub,
              role: profile.email == process.env.ADMIN ? "admin" : "user",
            });
          }
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
