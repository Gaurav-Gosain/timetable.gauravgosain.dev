import {
  SubjectMap,
  SubjectReverseMap,
  SubjectTextMap,
  ZoneMap,
} from "@/data/zone_map";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { HiPencil } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSessionStorage } from "usehooks-ts";

const ZonePage = () => {
  const router = useRouter();
  const { zone } = router.query;

  const [timetableData, setTimetableData] = useSessionStorage("timetable", {});

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

  //only show modal when the selected exam type is A-Level (derived state is always better than an effect)
  const showModal = subjectType === SubjectMap.alevel;

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [filteredSubject, setFilteredSubject] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);
  }

  //storing the whole data.js array of objects in filteredData.
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // input field for searches reference
  const searchInputRef = useRef(null);

  const addSubject = (currVal) => {
    // check by currValue.code if the subject is already selected
    if (!selectedSubs.some((el) => el.code == currVal.code)) {
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
    if (subject === "") {
      setSubjectType("");
      setTypeSelected(false);
    } else {
      setSubjectType(SubjectMap[subject]);
      setTypeSelected(true);
    }
  };

  //this function handles what should happen to selectedSubject array when the back-button is clicked
  const backClickHandler = () => {
    setSelectedSubs([]);
    clickHandler("");
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const List = () => {
    return (
      <>
        <div className="grid w-full cursor-pointer select-none grid-cols-6 items-center justify-between rounded-xl bg-black/20 py-4 px-4">
          <div className="col-span-4">Subject</div>
          <div>Type</div>
          <div>Code</div>
        </div>
        {filteredSubject.group?.map((subject, idx) => (
          <div
            className="grid w-full cursor-pointer select-none grid-cols-6 items-center justify-between rounded-xl py-4 px-4 hover:bg-black/10"
            key={idx}
            onClick={() => {
              setFilteredSubject({
                ...filteredSubject,
                group: filteredSubject.group?.map((sub) => {
                  if (sub.code === subject.code) {
                    return {
                      ...sub,
                      selected: !subject.selected,
                    };
                  }
                  return sub;
                }),
              });
            }}
          >
            <div className="col-span-4 flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-primary"
                checked={subject.selected}
                onChange={() =>
                  // select the subject
                  setFilteredSubject({
                    ...filteredSubject,
                    group: filteredSubject.group?.map((sub) => {
                      if (sub.code === subject.code) {
                        return {
                          ...sub,
                          selected: !sub.selected,
                        };
                      }
                      return sub;
                    }),
                  })
                }
              />
              <span className="ml-2 text-sm">{subject.subject}</span>
            </div>
            <div>
              <span className="text-sm">{subject.type.slice(24)}</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm">{subject.code}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  //conditional rendering : the first screen. Selection between IGCSE, O-Level or A-Level
  return !typeSelected ? (
    <div className="h-auto w-screen">
      <div className="flex w-full flex-row p-4">
        <button
          className="text-6xl text-white transition-all duration-300 hover:text-primary"
          onClick={() => router.push("/")}
        >
          <IoMdArrowRoundBack />
        </button>
        <motion.div
          className="fixed right-4 z-50 flex justify-center"
          initial={{
            x: -100,
          }}
          animate={{
            x: 0,
            transition: {
              duration: 0.6,
              type: "spring",
            },
          }}
          exit={{
            x: "100%",
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
        <motion.div className="absolute my-8 grid grid-cols-1 gap-y-6 text-xl sm:mx-16 sm:text-2xl lg:my-16 lg:mx-6 lg:gap-x-4 lg:text-3xl xl:grid-cols-3">
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
            }}
            animate={{
              x: 0,
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
            }}
            animate={{
              x: 0,
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
        </motion.div>
      </div>
    </div>
  ) : (
    //conditional rendering : the second screen containing the search engine. When a exam type button is Clicked
    <>
      {/* modal shown before adding a new subject */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-dark py-6 px-1 text-left align-middle text-white shadow-xl transition-all md:px-4">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col items-center text-lg font-medium leading-6"
                  >
                    <span>Select your components for</span>
                    <span className="font-bold">
                      {filteredSubject.commonSubstring} - {filteredSubject.code}
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full px-2 py-8 sm:px-0">
                      <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark",
                                selected
                                  ? "bg-primary text-white shadow"
                                  : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                              )
                            }
                            onClick={() => {
                              setFilteredSubject({
                                ...filteredSubject,
                                // set selected to true for subjects with "AS" level only
                                group: filteredSubject.group.map((subject) =>
                                  subject.type.includes("AS")
                                    ? { ...subject, selected: true }
                                    : { ...subject, selected: false }
                                ),
                              });
                            }}
                          >
                            AS-Level Only
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark",
                                selected
                                  ? "bg-primary text-white shadow"
                                  : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                              )
                            }
                            onClick={() => {
                              setFilteredSubject({
                                ...filteredSubject,
                                // set selected to true for subjects with "AS" level only
                                group: filteredSubject.group.map((subject) =>
                                  subject.type.includes("A Level")
                                    ? { ...subject, selected: true }
                                    : { ...subject, selected: false }
                                ),
                              });
                            }}
                          >
                            A2-Level Only
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark",
                                selected
                                  ? "bg-primary text-white shadow"
                                  : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                              )
                            }
                            onClick={() => {
                              setFilteredSubject({
                                ...filteredSubject,
                                // set selected to true for subjects with "AS" level only
                                group: filteredSubject.group.map((subject) => {
                                  return { ...subject, selected: true };
                                }),
                              });
                            }}
                          >
                            Customize
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          <Tab.Panel className={"rounded-xl md:p-3"}>
                            <List />
                          </Tab.Panel>
                          <Tab.Panel className={"rounded-xl md:p-3"}>
                            <List />
                          </Tab.Panel>
                          <Tab.Panel className={"rounded-xl md:p-3"}>
                            <List />
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary/80 px-4 py-2 text-sm font-semibold text-dark hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        // check the count of selected subjects
                        const selectedCount = filteredSubject.group.filter(
                          (subject) => subject.selected
                        ).length;

                        // if the count is 0, then remove the subject from the selected subjects array

                        if (selectedCount === 0) {
                          closeModal();
                          return;
                        }
                        addSubject(filteredSubject);
                        closeModal();
                      }}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* modal shown when the edit button is clicked */}
      <Transition appear show={isEditOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeEditModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-dark py-6 px-1 text-left align-middle text-white shadow-xl transition-all md:px-4">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col items-center text-lg font-medium leading-6"
                  >
                    <span>Edit your components for</span>
                    <span className="font-bold">
                      {filteredSubject.commonSubstring} - {filteredSubject.code}
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full px-2 py-8 sm:px-0">
                      <List />
                    </div>
                  </div>

                  <div className="mt-4 flex w-full items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary/80 px-4 py-2 text-sm font-semibold text-dark hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        // updated the current subject in the selected subjects array
                        const selectedSubjects = selectedSubs;

                        // check the count of selected subjects
                        const selectedCount = filteredSubject.group.filter(
                          (subject) => subject.selected
                        ).length;

                        // if the count is 0, then remove the subject from the selected subjects array

                        if (selectedCount === 0) {
                          setSelectedSubs(
                            selectedSubjects.filter(
                              (subject) => subject.code !== filteredSubject.code
                            )
                          );
                          closeEditModal();
                          return;
                        }

                        const index = selectedSubjects.findIndex(
                          (subject) => subject.code === filteredSubject.code
                        );
                        selectedSubjects[index] = filteredSubject;
                        setSelectedSubs(selectedSubjects);
                        closeEditModal();
                      }}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/** Go Back Button on Top Left */}
      <div className="flex w-full flex-row justify-between p-4">
        <button
          className="text-6xl text-white transition-all duration-300 hover:text-primary"
          onClick={() => backClickHandler()}
        >
          <IoMdArrowRoundBack />
        </button>
        <motion.div
          className="fixed right-4 z-50 flex justify-center"
          layoutId={SubjectReverseMap[subjectType]}
          onClick={backClickHandler}
        >
          <motion.button
            layoutId={SubjectReverseMap[subjectType] + "-button"}
            className="rounded-2xl bg-primary px-4 py-3 text-xl font-[600] text-dark"
          >
            {SubjectTextMap[SubjectReverseMap[subjectType]]}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex w-full flex-col items-center justify-center gap-2">
        {selectedSubs.length > 0 && (
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
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
            className="rounded-2xl bg-primary px-6 py-1  font-[600] text-dark hover:bg-white "
            onClick={() => {
              // save the selected subjects in the session storage
              setTimetableData({
                selectedSubs: selectedSubs.map((sub) => {
                  return {
                    code: sub.code,
                    // remove the selected property from the sub group
                    group: sub.group
                      .filter((sub) => sub.selected)
                      .map((sub) => {
                        delete sub.selected;
                        return sub;
                      }),
                  };
                }),
                zone,
              });

              // router.push(
              //   `/timetable?code=${selectedSubs
              //     .map((sub) => sub.code)
              //     .join("&code=")}&zone=${zone}`
              // );

              router.push(`/timetable`);
            }}
          >
            Done
          </motion.button>
        )}
        <div className="text-center text-xs">
          You can add more subjects by searching and selecting in the search bar
          above
        </div>
      </div>

      {/** Div Containing list of selected subjects on Top Left */}
      <div>
        <h1 className="px-6 font-[500] text-primary">Selected Subjects :</h1>
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
                    <motion.h1
                      id={currVal.code}
                      className="lg:text-md px-4 text-center text-sm font-semibold text-white"
                    >
                      {currVal.commonSubstring}
                    </motion.h1>
                    {showModal && (
                      <motion.button
                        className="mr-2 flex items-center justify-center rounded-full bg-green-500 p-1 font-bold text-white transition-all duration-300 hover:bg-green-500 md:bg-green-500/70 lg:text-xl"
                        onClick={() => {
                          setFilteredSubject(currVal);
                          openEditModal();
                        }}
                      >
                        <HiPencil />
                      </motion.button>
                    )}
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

      {/** Absolute Positioned Main Div containing Search Engine Front End*/}
      <div className="absolute top-[40%] bottom-[50%] left-4 right-4 flex flex-col justify-center text-center lg:left-[15%] lg:right-[15%]">
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
          className="text-2xl font-[600] text-white sm:text-3xl lg:text-5xl"
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
            className={`absolute top-[7.5rem] mt-2 w-[95%] items-start rounded-2xl bg-white py-4 text-lg text-dark lg:w-[60%] ${
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
                      if (showModal) {
                        let selectedSubject = currVal;
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
                      } else addSubject(currVal);
                    }}
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
        </motion.div>
      </div>
    </>
  );
};

export default ZonePage;
