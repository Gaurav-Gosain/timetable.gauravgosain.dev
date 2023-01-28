import CountrySelector from "@/components/Home/CountrySelector";
import VerifySession from "@/utils/VerifySession";
import { motion } from "framer-motion";
import Head from "next/head";
import React, { useState } from "react";

const SearchPage = () => {
  const [selectedCountry, setSelectedCountry] = useState({});

  return (
    <>
      <Head>
        <title>Timetable</title>
        <meta name="description" content="Knowfly Timetable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_light.png" />
      </Head>
      <div className="flex min-h-screen w-screen items-center justify-center py-8 text-center lg:text-5xl">
        <div className="-mt-28 flex w-full flex-col gap-8">
          <motion.h1
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="z-50 text-2xl font-[600] text-white sm:text-3xl lg:text-5xl"
          >
            Select Your Country
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: "100%",
              transition: {
                duration: 0.5,
                type: "spring",
              },
            }}
          >
            <CountrySelector
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;

export const getServerSideProps = VerifySession;
