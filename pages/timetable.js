import Table from "@/components/Timetable/Table";
import { ZoneMap } from "@/data/zone_map";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TimetablePage = () => {
  const router = useRouter();
  const { code, zone } = router.query;

  const [zoneData, setZoneData] = React.useState(null);
  const [selectedSubjects, setSelectedSubjects] = React.useState([]);
  const [groupedSubjects, setGroupedSubjects] = React.useState([]);

  useEffect(() => {
    setZoneData(ZoneMap[parseInt(zone)]);
  }, [zone]);

  useEffect(() => {
    if (zoneData) {
      let filteredSubjects = [];
      if (typeof code === "string") {
        filteredSubjects = zoneData.filter((x) => x.code === code);
      } else {
        filteredSubjects = zoneData.filter((x) => code.includes(x.code));
      }

      setGroupedSubjects(filteredSubjects);

      // flatten the array
      const subjects = filteredSubjects.map((x) => x.group).flat();
      setSelectedSubjects(subjects);
    }
  }, [zoneData, code]);

  return (
    <div className="mt-12 flex min-h-screen w-screen flex-col items-center justify-center gap-4">
      {groupedSubjects.map((group) => (
        <div
          className="flex flex-col items-center justify-center gap-4"
          key={group.code}
        >
          <h1 className="text-3xl font-bold text-white">
            {group.commonSubstring}
          </h1>
          <Table subjects={group.group} setSubjects={setSelectedSubjects} />
        </div>
      ))}

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">Combined</h1>
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
