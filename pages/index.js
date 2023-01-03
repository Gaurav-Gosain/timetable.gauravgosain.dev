import zone4 from "@/data/zone4.json";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Timetable</title>
        <meta name="description" content="Knowfly Timetable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_light.png" />
      </Head>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 py-8 text-center lg:text-4xl">
        {user ? (
          <div>Logged into the dashboard! ({user?.email})</div>
        ) : (
          <>
            Not Authorized
            <span>
              (login on{" "}
              <a
                className="text-blue-500 underline"
                href="https://www.knowfly.org"
              >
                https://www.knowfly.org
              </a>
              )
            </span>
          </>
        )}

        <pre className="max-w-screen max-h-[50vh] overflow-scroll text-left text-xs">
          <code>{JSON.stringify(zone4, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}
