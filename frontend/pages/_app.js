import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppWrapper } from "@/context/state";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </UserProvider>
  );
}
