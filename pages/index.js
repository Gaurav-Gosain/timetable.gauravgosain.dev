import CountrySelector from "@/components/Home/CountrySelector";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const user = useUser();

  const [selectedCountry, setSelectedCountry] = useState({});

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

        <div>Country Selector</div>

        <CountrySelector
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        {selectedCountry.country && (
          <div>
            Selected Country: {selectedCountry.country} ({selectedCountry.zone})
          </div>
        )}
      </div>
    </>
  );
}
