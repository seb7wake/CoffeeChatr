import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppWrapper } from "@/context/state";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AppWrapper>
        <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
          <Component {...pageProps} />
        </main>
      </AppWrapper>
    </UserProvider>
  );
}
