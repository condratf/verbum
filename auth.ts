import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     // Your validation logic
    //     // Return user with role: 'professor' or 'student'
    //   },
    // }),

  ],
  callbacks: {
    // jwt({ token, user }) {
    //   if (user) token.role = user.role
    //   return token
    // },
    // session({ session, token }) {
    //   session.user.role = token.role
    //   return session
    // },
  },

})