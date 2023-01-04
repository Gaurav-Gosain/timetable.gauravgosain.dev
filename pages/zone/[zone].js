import { ZoneMap } from "@/data/zone_map";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const ZonePage = () => {
  const router = useRouter();
  const { zone } = router.query;

  const data = ZoneMap[zone];

  //subjectType handles if its a IGCSE, O-level or A-level subject
  const [subjectType, setSubjectType] = useState("");

  //typeSelected boolean for conditional rendering (see below)
  const [typeSelected, setTypeSelected] = useState(false);

  //contains the search input
  const [searchInput, setSearchInput] = useState("");

  //contains the filtered data from data.js
  const [filteredData, setFilteredData] = useState([]);

  //the final array containing the objects of selected subjects only
  const [selectedSubs, setSelectedSubs] = useState([]);

  //storing the whole data.js array of objects in tempFilteredData.
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // input field for searches reference
  const searchInputRef = useRef(null);

  const addSubject = (currVal) => {
    if (selectedSubs.includes(currVal) === false) {
      setSelectedSubs([...selectedSubs, currVal]);
    }
    // clear the search bar
    setSearchInput("");
    // focus on the search bar again
    searchInputRef.current.focus();
  };

  //real-time search results after user types something inside the search input
  useEffect(() => {
    if (searchInput != "") {
      setFilteredData(
        data
          .filter((currVal) => {
            if (subjectType === "Cambridge International A Level") {
              return (
                currVal.group[0].type === "Cambridge International AS Level" ||
                currVal.group[0].type === "Cambridge International A Level"
              );
            }

            return currVal.group[0].type === subjectType;
          })
          .filter((currElem) =>
            currElem.commonSubstring
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
      );
    } else {
      setFilteredData(data);
    }

    //console.log(tempFilteredData)
  }, [searchInput]);

  //this function is called when a user selects a choice between O-Level, IGCSE or A-Level
  const clickHandler = (subject) => {
    //resets the search input if a user goes back and selects another exam type
    setSearchInput("");

    //on button click, the respective states are updated
    if (subject === "igcse") {
      setSubjectType("Cambridge IGCSE");
      setTypeSelected(true);
    }

    if (subject === "olevel") {
      setSubjectType("Cambridge O Level");
      setTypeSelected(true);
    }

    if (subject === "alevel") {
      setSubjectType("Cambridge International A Level");
      setTypeSelected(true);
    }

    if (subject === "") {
      setSubjectType("");
      setTypeSelected(false);
    }
  };

  //this function handles what should happen to selectedSubject array when the back-button is clicked
  const backClickHandler = () => {
    setSelectedSubs([]);
    clickHandler("");
  };

  //conditional rendering : the first screen. Selection between IGCSE, O-Level or A-Level
  return !typeSelected ? (
    <>
      <button
        className="my-6 mx-4 rounded-2xl bg-primary px-6 py-1 font-[600] text-dark transition-all duration-300 hover:bg-white "
        onClick={() => router.push("/")}
      >
        Go Back
      </button>
      {/** Absolute Positioned Main Div */}
      <div className="absolute top-[50%] bottom-[50%] left-[15%] right-[15%] flex flex-col justify-center text-center">
        {/** Main Heading */}
        <h1 className="text-2xl font-[600] text-white sm:text-3xl lg:text-5xl">
          Select Your Examination Type
        </h1>

        {/** Responsive Buttons Grid */}
        <div className="my-8 grid grid-cols-1 gap-y-6 text-xl sm:mx-16 sm:text-2xl lg:my-16 lg:mx-6 lg:grid-cols-3 lg:gap-x-4 lg:text-3xl">
          {/** IGCSE Button */}
          <div className="flex justify-center">
            <button
              className="rounded-2xl bg-primary px-6 py-1 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("igcse")}
            >
              Cambridge IGCSE
            </button>
          </div>

          {/** O-Level Button */}
          <div className="flex justify-center">
            <button
              className="rounded-2xl bg-primary px-6 py-1 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("olevel")}
            >
              Cambridge O-Level
            </button>
          </div>

          {/** A-Level Button */}
          <div className="flex justify-center">
            <button
              className="rounded-2xl bg-primary px-6 py-1 font-[600] text-dark transition-all duration-300 hover:bg-white"
              onClick={() => clickHandler("alevel")}
            >
              Cambridge A-Level
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    //conditional rendering : the second screen containing the search engine. When a exam type button is Clicked
    <>
      {/** Go Back Button on Top Left */}
      <button
        className="my-6 mx-4 rounded-2xl bg-primary px-6 py-1 font-[600] text-dark transition-all duration-300 hover:bg-white "
        onClick={() => backClickHandler()}
      >
        Go Back
      </button>

      <div className="absolute bottom-10 flex w-full flex-col items-center justify-center gap-2">
        {selectedSubs.length > 0 && (
          <button
            className="rounded-2xl bg-primary px-6 py-1  font-[600] text-dark transition-all duration-300 hover:bg-white "
            onClick={() =>
              router.push(
                `/timetable?code=${selectedSubs
                  .map((sub) => sub.code)
                  .join("&code=")}?zone=${zone}`
              )
            }
          >
            Done
          </button>
        )}
        <div className="text-center text-xs">
          You can add more subjects by searching and selecting in the search bar
          above
        </div>
      </div>

      {/** Div Containing list of selected subjects on Top Left */}
      <div className="">
        <h1 className="px-6 font-[500] text-primary">Selected Subjects :</h1>
        {selectedSubs.map((currVal) => {
          return (
            <div className="my-2 mx-6 flex" key={currVal.zone}>
              <button
                className="rounded-full bg-red-500 px-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                onClick={() =>
                  setSelectedSubs(
                    selectedSubs.filter((arrItem) => arrItem !== currVal)
                  )
                }
              >
                -
              </button>
              <h1 id={currVal.code} className="text-md px-6 text-white">
                {currVal.commonSubstring}
              </h1>
            </div>
          );
        })}
      </div>

      {/** Absolute Positioned Main Div containing Search Engine Front End*/}
      <div className="absolute top-[40%] bottom-[50%] left-4 right-4 flex flex-col justify-center text-center lg:left-[15%] lg:right-[15%]">
        {/** Heading above Search Bar */}
        <h1 className="text-2xl font-[600] text-white sm:text-3xl lg:text-5xl">
          Search Your Subjects
        </h1>

        {/** Search Bar */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-2xl bg-white focus-within:shadow-lg lg:w-2/3">
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput !== "" && filteredData.length)
                  addSubject(filteredData[0]);
              }}
              className="w-full"
            >
              <input
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
            className={`absolute top-[8rem] mt-2 w-[95%] items-start rounded-2xl bg-white py-4 text-lg text-dark lg:w-[60%] ${
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
                return (
                  <button
                    key={currVal.code}
                    className={`min-h-96 duration-300ms flex w-full flex-row justify-between py-2 text-sm font-[500] transition-colors ease-in-out hover:bg-gray-100 active:bg-primary lg:text-lg ${
                      selectedSubs.includes(currVal)
                        ? "bg-primary/80 hover:bg-primary"
                        : "bg-white"
                    }`}
                    onClick={() => addSubject(currVal)}
                  >
                    <h1 className="max-w-[50%] pl-[5%] text-left">
                      {currVal.commonSubstring}
                    </h1>
                    <h1 className="pr-[5%]">{currVal.code}</h1>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZonePage;
