import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const ExaminationTypeSelectionScreen = ({ zone, clickHandler }) => {
  const router = useRouter();

  return (
    <div className="h-auto w-screen">
      <div className="flex w-full flex-row p-4">
        <button
          className="z-50 bg-dark text-6xl text-white transition-all duration-300 hover:text-primary"
          onClick={() => router.push("/search")}
        >
          <IoMdArrowRoundBack />
        </button>
        <motion.div
          className="absolute right-4 z-30 flex justify-center"
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
            transition: {
              duration: 0.6,
              type: "spring",
            },
          }}
        >
          <button className="rounded-2xl bg-primary px-4 py-3 text-2xl font-[600] text-dark">
            Zone-{zone}
          </button>
        </motion.div>
      </div>

      {/** Absolute Positioned Main Div */}
      <div className="absolute top-[50%] bottom-[50%] left-[15%] right-[15%] flex flex-col justify-center text-center">
        {/** Responsive Buttons Grid */}
        <motion.div className="absolute my-8 grid h-[50vh] grid-cols-1 gap-y-6 text-xl sm:mx-16 sm:text-2xl md:h-[10vh] lg:my-16 lg:mx-6 lg:gap-x-4 lg:text-3xl xl:grid-cols-3">
          {/** Main Heading */}
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
            className="col-span-1 text-2xl font-[600] text-white sm:text-3xl lg:text-5xl xl:col-span-3"
          >
            Select Your Examination Type
          </motion.h1>
          {/** IGCSE Button */}
          <motion.div
            initial={{
              x: -100,
              width: 0,
            }}
            animate={{
              x: 0,
              width: "100%",
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="flex justify-center"
            layoutId="igcse"
          >
            <motion.button
              layoutId="igcse-button"
              className="rounded-2xl bg-primary px-14 py-3 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("igcse")}
            >
              Cambridge IGCSE
            </motion.button>
          </motion.div>

          {/** O-Level Button */}
          <motion.div
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
            className="flex justify-center"
            layoutId="olevel"
          >
            <motion.button
              layoutId="olevel-button"
              className="rounded-2xl bg-primary px-12 py-3 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("olevel")}
            >
              Cambridge O-Level
            </motion.button>
          </motion.div>

          {/** A-Level Button */}
          <motion.div
            initial={{
              x: 100,
              width: 0,
            }}
            animate={{
              x: 0,
              width: "100%",
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="flex justify-center"
            layoutId="alevel"
          >
            <motion.button
              layoutId="alevel-button"
              className="rounded-2xl bg-primary px-12 py-3 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("alevel")}
            >
              Cambridge A-Level
            </motion.button>
          </motion.div>
          <motion.div
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
            className="flex justify-center xl:col-span-3"
            layoutId="custom"
          >
            <motion.button
              layoutId="custom-button"
              className="rounded-2xl bg-primary px-12 py-3 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("custom")}
            >
              Custom (Multiple Exam Types)
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExaminationTypeSelectionScreen;
