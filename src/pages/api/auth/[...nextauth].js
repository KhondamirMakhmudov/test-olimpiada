import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7200, // 2 soat (7200 sekund)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const { phone, password, sms_code = null } = credentials;
          const formData = new FormData();
          let url = "https://test.iq-math.uz/api/v1/student/login/";

          if (sms_code) {
            formData.append("phone", phone);
            formData.append("sms_code", sms_code);
            url = "https://test.iq-math.uz/api/v1/student/verify-sms/";
          } else {
            formData.append("phone", phone);
            formData.append("password", password);
          }

          const response = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          });

          const data = await response.json();
          console.log("Response Data:", data); // Debugging response

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          return {
            token: data.access_token,
            phone,
            login: data.login || phone, // Assuming `login` exists in response
            password: data.password || password, // Assuming `password` exists in response
          };
        } catch (error) {
          console.error("Login Error:", error.message);
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.phone = user.phone;
        token.login = user.login;
        token.password = user.password;
      }
      return token;
    },
    async session({ session, token }) {
      if (Date.now() / 1000 > token.expiresAt) {
        return null; // 2 soat o‘tgach, sessiyani tozalash
      }
      session.accessToken = token.accessToken;
      session.phone = token.phone;
      session.login = token.login;
      session.password = token.password;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "https://iq.iq-math.uz";
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "0bb43cd9f73216be2a5676af4f6b4de5efdcb40443e84b962c6b07267a108f7c",
  pages: {
    signIn: "/",
  },
});
