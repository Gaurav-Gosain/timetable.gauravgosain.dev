import React from 'react'
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { HiPencil } from "react-icons/hi2";

export default function SelectedSubsDiv({selectedSubs,setFilteredSubject,setSelectedSubs, openEditModal, defaultVisiblity, responsiveVisiblity}) {
  
  return (
    <>
    <div className={`flex flex-col items-center ${defaultVisiblity} sm:${responsiveVisiblity}`}>
        <h1 className="px-6 font-[500] text-primary pb-2">Selected Subjects :</h1>
        <motion.div
          className="flex max-h-48 flex-wrap justify-center overflow-auto"
          layout="position"
        >
          {
            // map over reversed array to display the latest selected subject on top
            selectedSubs
              .slice()
              .reverse()
              .map((currVal) => {
                return (
                  <motion.div
                    layout="position"
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        type: "spring",
                      },
                    }}
                    className="my-2 mx-6 flex items-center rounded-full bg-white/20 p-2"
                    key={currVal.code}
                  >

                    {/* {showModal && ( */}
                    <motion.button
                      className="mr-2 flex items-center justify-center rounded-full bg-green-500 p-1 font-bold text-white transition-all duration-300 hover:bg-green-500 md:bg-green-500/70 lg:text-xl"
                      onClick={() => {
                        setFilteredSubject(currVal);
                        openEditModal();
                      }}
                    >
                      <HiPencil />
                    </motion.button>

                    <motion.h1
                      id={currVal.code}
                      className="lg:text-md px-2 mx-2 sm:mx-0 sm:px-4 text-center text-xs sm:text-sm font-semibold text-white"
                    >
                      {currVal.commonSubstring}
                    </motion.h1>
                    
                    {/* )} */}
                    <motion.button
                      className="flex items-center justify-center rounded-full bg-red-500 p-1 font-bold text-white transition-all duration-300 hover:bg-red-500 md:bg-red-500/70 lg:text-xl"
                      onClick={() =>
                        setSelectedSubs(
                          selectedSubs.filter((arrItem) => arrItem !== currVal)
                        )
                      }
                    >
                      <HiX />
                    </motion.button>
                  </motion.div>
                );
              })
          }
        </motion.div>
      </div>
    </>
  )
}
