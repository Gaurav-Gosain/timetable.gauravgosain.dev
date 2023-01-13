import Table from "@/components/Timetable/Table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

const TimetablePage = () => {
  const router = useRouter();
  const [timetableData, setTimetableData] = useSessionStorage("timetable", {});

  const [selectedSubjects, setSelectedSubjects] = React.useState([]);

  useEffect(() => {
    setSelectedSubjects(timetableData.selectedSubs.map((x) => x.group).flat());
  }, [timetableData]);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">My Timetable</h1>
        <Table subjects={selectedSubjects} setSubjects={setSelectedSubjects} />
      </div>
      <button
        className="mb-12 rounded-full bg-primary px-6 py-1 text-dark"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default TimetablePage;
