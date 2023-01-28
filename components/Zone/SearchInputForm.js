import { motion } from "framer-motion";
import React from "react";

export default function SearchInputForm({
  showModal,
  openModal,
  subjectType,
  addSubject,
  setFilteredSubject,
  filteredData,
  searchInput,
  searchInputRef,
  setSearchInput,
  selectedSubs,
}) {
  return (
    <>
      <div className="top-[40%] bottom-[50%] left-4 right-4 mb-8 flex flex-col justify-center text-center md:absolute lg:left-[15%] lg:right-[15%]">
        {/** Heading above Search Bar */}
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
          className="mt-4 text-2xl font-[600] text-white sm:text-3xl md:mt-0 lg:text-5xl"
        >
          Search Your Subjects
        </motion.h1>

        {/** Search Bar */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center"
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            width: "100%",
            opacity: 1,
            transition: {
              duration: 0.5,
              type: "spring",
            },
          }}
        >
          <div className="relative flex h-12 w-11/12 items-center overflow-hidden rounded-2xl bg-white focus-within:shadow-lg lg:w-2/3">
            <div className="grid h-full w-12 place-items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/** Search Your Subjects Search Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput !== "" && filteredData.length) {
                  let selectedSubject = filteredData[0];
                  if (showModal) {
                    selectedSubject.group = selectedSubject.group.map(
                      (group) => {
                        return {
                          ...group,
                          // set the selected group to true if the group type includes AS
                          selected: group.type.includes("AS") ? true : false,
                        };
                      }
                    );
                    setFilteredSubject(selectedSubject);
                    openModal();
                  } else {
                    selectedSubject.group = selectedSubject.group.map(
                      (group) => {
                        return {
                          ...group,
                          // set the selected group to true if the group type includes AS
                          selected: true,
                        };
                      }
                    );
                    addSubject(selectedSubject);
                  }
                }
              }}
              className="w-full"
            >
              <motion.input
                className="peer h-full w-full pr-2 text-lg font-[400] text-dark outline-none"
                type="text"
                id="search"
                placeholder="Search something.."
                autoComplete="off"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                ref={searchInputRef}
                autoFocus
              />
              {/* submit hidden button */}
              <input type="submit" hidden />
            </form>
          </div>

          {/** Results Div Below Search Bar, Made Hidden when the search input is none*/}
          <div
            className={`top-[7.5rem] mt-2 w-[95%] items-start rounded-2xl bg-white py-4 text-lg text-dark md:absolute lg:w-[60%] ${
              searchInput === "" ? "hidden" : "visible"
            } `}
          >
            {/**Header inside the div containing two headings */}
            <div className=" flex flex-row justify-between font-[500] text-gray-500 ">
              <h1 className="pl-[5%]">Name</h1>
              <h1 className="pr-[5%]">Code</h1>
            </div>

            {/**divs containing subject name and codes. Shown below the Header. Being Filtered with SearchInput */}
            <div className="max-h-96 overflow-y-auto py-2">
              {filteredData?.map((currVal) => {
                if (
                  selectedSubs.some((arrItem) => arrItem.code == currVal.code)
                )
                  return null;
                return (
                  <button
                    key={currVal.code}
                    className={
                      "min-h-96 duration-300ms flex w-full flex-row justify-between bg-white py-2 text-sm font-[500] transition-colors ease-in-out hover:bg-gray-100 active:bg-primary lg:text-lg"
                    }
                    onClick={() => {
                      let selectedSubject = currVal;
                      if (showModal) {
                        selectedSubject.group = selectedSubject.group.map(
                          (group) => {
                            return {
                              ...group,
                              selected: group.type.includes("AS")
                                ? true
                                : false,
                            };
                          }
                        );
                        setFilteredSubject(selectedSubject);
                        openModal();
                      } else {
                        selectedSubject.group = selectedSubject.group.map(
                          (group) => {
                            return {
                              ...group,
                              selected: true,
                            };
                          }
                        );
                        addSubject(selectedSubject);
                      }
                    }}
                  >
                    <h1 className="flex max-w-[50%] flex-col pl-[5%] text-left">
                      <span>{currVal.commonSubstring}</span>
                      {subjectType === "custom" && (
                        <span className="text-sm text-gray-500">
                          {currVal.group[0].type.replace("AS Level", "A Level")}
                        </span>
                      )}
                    </h1>
                    <h1 className="pr-[5%]">{currVal.code}</h1>
                  </button>
                );
              })}
            </div>
          </div>

          {/**Recommendations Component */}
          {/* <Recommendation
            subjectType={subjectType}
            selectedSubs={selectedSubs}
            setSelectedSubs={setSelectedSubs}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          /> */}
        </motion.div>
      </div>
    </>
  );
}
