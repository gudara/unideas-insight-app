import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_B2C_TENANT_ID as string,
      
      authorization: {
        params: {
          scope: 'openid profile email offline_access',
          p: process.env.AZURE_AD_B2C_CLIENT_PRIMARY_USER_FLOW,
        },
        // url: `https://${process.env.AZURE_AD_B2C_CLIENT_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_CLIENT_TENANT_ID}/oauth2/v2.0/authorize?p=${process.env.AZURE_AD_B2C_CLIENT_PRIMARY_USER_FLOW}`,
      },
    //   token: {
    //     url: `https://${process.env.AZURE_AD_B2C_CLIENT_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_CLIENT_TENANT_ID}/oauth2/v2.0/token?p=${process.env.AZURE_AD_B2C_CLIENT_PRIMARY_USER_FLOW}`,
    //   },
      idToken: true,  // Retrieve ID token for user info
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token; // Save ID token to token
        token.accessToken = account.access_token; // Save access token
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string, // Secret for JWT encryption
  session: {
    strategy: 'jwt', // Store session as JWT
  },
  pages: {
    signIn: '/auth/signin', // Optional: custom sign-in page
    error: '/auth/error',   // Optional: custom error page
  },
});

export { handler as GET, handler as POST };
