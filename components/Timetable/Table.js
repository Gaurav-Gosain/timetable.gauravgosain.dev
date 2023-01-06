import { Menu, Transition } from "@headlessui/react";
import { motion, Reorder, useDragControls } from "framer-motion";
import React, { Fragment, useEffect, useRef } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { ReorderIcon } from "./ReorderIcon";

const Table = ({ subjects, setSubjects }) => {
  const dragControls = useDragControls();

  const iRef = useRef();

  useEffect(() => {
    const touchHandler = (e) => e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener("touchstart", touchHandler, { passive: false });

      return () => {
        //@ts-ignore
        iTag.removeEventListener("touchstart", touchHandler, {
          passive: false,
        });
      };
    }
  }, [iRef]);

  const SortByMenu = () => {
    return (
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              {({ open }) => (
                <div className="inline-flex w-full justify-center rounded-md bg-primary bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className="mr-2">Sort By</div>
                  <motion.div
                    animate={{
                      rotate: open ? -180 : 0,
                    }}
                  >
                    <HiChevronDown
                      className="h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-1/2 z-50 mt-2 w-60 -translate-x-1/2 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort by subject code
                        const sortedSubjects = subjects.sort((a, b) => {
                          return a.code.localeCompare(b.code);
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Subject Code
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by duration
                        // duration is a string, so we need to convert it to number'
                        // parse duration from 1h 30m to 90 or 30m to 30
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDuration = a.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          const bDuration = b.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          return aDuration - bDuration;
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Duration (smallest to largest)
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by duration
                        // duration is a string, so we need to convert it to number'
                        // parse duration from 1h 30m to 90 or 30m to 30
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDuration = a.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          const bDuration = b.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          return aDuration - bDuration;
                        });
                        setSubjects([...sortedSubjects.slice().reverse()]);
                      }}
                    >
                      Duration (largest to smallest)
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by date
                        // parse date from Tuesday 25 April 2023 AM to 2023-04-25
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDate = a.date.split(" ").slice(1, 4).join("-");
                          const bDate = b.date.split(" ").slice(1, 4).join("-");
                          return new Date(aDate) - new Date(bDate);
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Date
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return (
    <>
      <SortByMenu />

      <div className="relative mx-32 my-8 max-h-[45rem] max-w-[95vw] overflow-x-auto rounded-2xl shadow-md">
        <motion.table
          className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
          layout
        >
          <motion.thead
            layout
            className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" className="block px-6 py-3 md:hidden">
                Reorder
              </th>
              <th scope="col" className="px-6 py-3">
                Subject Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            </tr>
          </motion.thead>

          <Reorder.Group
            as={"tbody"}
            values={subjects}
            onReorder={setSubjects}
            axis="y"
            className="cursor-grab"
          >
            {subjects.map((subject) => (
              <Reorder.Item
                key={subject.code}
                value={subject}
                as="tr"
                className="relative border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                layout
                whileDrag={{ opacity: 0.5 }}
              >
                <th
                  scope="col"
                  className="m-auto flex w-full items-center justify-center h-24 text-center md:hidden"
                >
                  <ReorderIcon ref={iRef} dragControls={dragControls} />
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {subject.subject}
                </th>
                <td className="px-6 py-4">{subject.type}</td>
                <td className="px-6 py-4">{subject.code}</td>
                <td className="px-6 py-4">{subject.duration}</td>
                <td className="px-6 py-4">{subject.date}</td>
                <td className="px-6 py-4">
                  <button
                    className="mx-4 rounded-full bg-red-500 px-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                    onClick={() =>
                      setSubjects(
                        subjects.filter((arrItem) => arrItem !== subject)
                      )
                    }
                  >
                    -
                  </button>
                </td>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.table>
      </div>
    </>
  );
};

export default Table;
