import { Switch } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { HiLightBulb } from "react-icons/hi";
import Recommendation from "./Recommendation";
import SubjectListContainer from "./SubjectListContainer";

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
  setSelectedSubs,
  data,
}) {
  const [showRecommendation, setShowRecommendation] = React.useState(true);

  const RecommendedSubjects =
    subjectType === "Custom"
      ? []
      : Recommendation({
          subjectType,
          selectedSubs,
          data,
        });

  return (
    <>
      <motion.div
        className={`flex flex-col text-center ${
          selectedSubs.length === 0 && searchInput === ""
            ? "md:absolute md:top-1/2 md:-mt-24 md:w-full"
            : "md:mt-0"
        }`}
        layout="position"
      >
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
          className={`mt-10 flex flex-col items-center justify-center md:relative ${
            searchInput !== ""
              ? "fixed top-0 z-50 mt-0 bg-dark md:mt-10"
              : "mt-10"
          }`}
          id="search-bar"
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
          <div className="relative flex h-12 w-11/12 items-center overflow-hidden rounded-2xl bg-white focus-within:shadow-lg lg:w-[48%]">
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
                placeholder="Search a subject..."
                autoComplete="off"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                ref={searchInputRef}
                autoFocus
              />
              {/* submit hidden button */}
              <input type="submit" hidden />
            </form>
            {subjectType !== "custom" && RecommendedSubjects.length > 0 && (
              <motion.div
                className="flex items-center gap-1 text-2xl text-gray-600"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <Switch
                  checked={showRecommendation}
                  onChange={setShowRecommendation}
                  className={`${
                    showRecommendation
                      ? "border-green-600 bg-primary"
                      : "border-gray-600 bg-gray-400"
                  } relative mr-2 inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2  transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Show Recommendations</span>
                  <span
                    className={`${
                      showRecommendation ? "translate-x-9" : "translate-x-0"
                    } pointer-events-none flex h-[34px] w-[34px] transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  >
                    <HiLightBulb
                      className={`${
                        showRecommendation ? "text-dark" : "text-gray-400"
                      }`}
                    />
                  </span>
                </Switch>
              </motion.div>
            )}
          </div>

          {/** Results Div Below Search Bar, Made Hidden when the search input is none*/}
          <AnimatePresence mode="popLayout">
            {((showRecommendation &&
              RecommendedSubjects.length > 0 &&
              searchInput === "") ||
              (filteredData.length > 0 && searchInput !== "")) && (
              <motion.div
                className={`mt-1 w-[95%] items-start rounded-2xl bg-white py-4 text-lg text-dark lg:w-[50%] `}
                initial={{
                  y: 100,
                }}
                animate={{
                  y: 0,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.2,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {RecommendedSubjects.length > 0 &&
                  searchInput === "" &&
                  showRecommendation && (
                    <div className="text-xs text-gray-400">Recommended</div>
                  )}
                {/**Header inside the div containing two headings */}
                <div className="flex flex-row justify-between text-sm text-gray-500 md:text-lg md:font-[500]">
                  <h1 className="pl-[5%]">Name</h1>
                  <h1 className="pr-[5%]">Code</h1>
                </div>
                {/**divs containing subject name and codes. Shown below the Header. Being Filtered with SearchInput */}
                <SubjectListContainer
                  {...{
                    visible: filteredData.length > 0 && searchInput !== "",
                    filteredData,
                    selectedSubs,
                    showModal,
                    setFilteredSubject,
                    addSubject,
                    subjectType,
                    openModal,
                    isRecommended: false,
                  }}
                />
                {/**Recommendations Component */}
                {showRecommendation && (
                  <SubjectListContainer
                    {...{
                      visible:
                        RecommendedSubjects.length > 0 && searchInput === "",
                      filteredData: RecommendedSubjects,
                      selectedSubs,
                      showModal,
                      setFilteredSubject,
                      addSubject,
                      subjectType,
                      openModal,
                      isRecommended: true,
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
