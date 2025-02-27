'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

const SignInPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  console.log("___________>>>>>>>>>>>>>>>>>>>>>>", session)

  if (!session) {
    return (
      <button onClick={() => signIn('azure-ad')}>
        Sign in with Azure AD B2C
      </button>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default SignInPage;
