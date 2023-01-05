import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import { Fragment, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      cookieOptions: {
        // check if we are in production
        name: "sb:token",
        domain:
          process.env.NODE_ENV === "production" ? "knowfly.org" : "localhost",
        path: "/",
        sameSite: "lax",
        secure: "secure",
      },
    })
  );

  return (
    <Fragment>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <div className="min-h-screen w-screen overflow-x-hidden bg-dark font-poppins text-white">
          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
      <Analytics />
    </Fragment>
  );
}

export default MyApp;
