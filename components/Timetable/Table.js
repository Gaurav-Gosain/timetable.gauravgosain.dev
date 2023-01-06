import React from "react";

const Table = ({ subjects, setSubjects }) => {
  return (
    <>
      {/* <div className="mt-12 flex flex-col items-center justify-center space-y-3 overflow-hidden">
        <h1 className="text-3xl font-[500] text-white">My Exam Timetable</h1>
        <button className="rounded-xl bg-black px-2 py-1 text-white">
          Sort by Date
        </button>
      </div> */}

      <div className="relative mx-32 my-8 max-h-[45rem] max-w-[95vw] overflow-x-auto rounded-2xl shadow-md">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={subject.code}
              >
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;