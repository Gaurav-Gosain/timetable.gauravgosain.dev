import React from 'react'

const Table = () => {
  return (
    <>
      <div className="mt-12 flex flex-col items-center justify-center space-y-3 overflow-hidden">
        <h1 className="text-3xl font-[500] text-white">My Exam Timetable</h1>
        <button className="rounded-xl bg-black px-2 py-1 text-white">
          Sort by Date
        </button>
      </div>

      <div class="relative mx-32 my-8 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Subject Name
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
              <th scope="col" class="px-6 py-3">
                Code
              </th>
              <th scope="col" class="px-6 py-3">
                Duration
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>

          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Accounting Paper 1
              </th>
              <td class="px-6 py-4">Sliver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <button
                  className="mx-4 rounded-full bg-red-500 px-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                  onClick={() =>
                    setSelectedSubs(
                      selectedSubs.filter((arrItem) => arrItem !== currVal)
                    )
                  }
                >
                  -
                </button>
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Accounting Paper 2
              </th>
              <td class="px-6 py-4">Sliver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <button
                  className="mx-4 rounded-full bg-red-500 px-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                  onClick={() =>
                    setSelectedSubs(
                      selectedSubs.filter((arrItem) => arrItem !== currVal)
                    )
                  }
                >
                  -
                </button>
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Urdu Paper 1
              </th>
              <td class="px-6 py-4">Sliver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <button
                  className="mx-4 rounded-full bg-red-500 px-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                  onClick={() =>
                    setSelectedSubs(
                      selectedSubs.filter((arrItem) => arrItem !== currVal)
                    )
                  }
                >
                  -
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table