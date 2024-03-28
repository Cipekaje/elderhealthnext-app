import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyAppInner Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function MyAppInner({ Component, pageProps }) {
  const { data: session } = useSession();

  // You can access session token like this:
  const sessionToken = session?.accessToken;

  return <Component {...pageProps} />;
}
