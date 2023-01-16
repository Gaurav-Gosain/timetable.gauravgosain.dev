import Table from "@/components/Timetable/Table";
import VerifySession from "@/utils/VerifySession";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

const TimetablePage = () => {
  const router = useRouter();
  const [timetableData, _] = useSessionStorage("timetable", {});
  const user = useUser();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = React.useState([]);

  useEffect(() => {
    setSelectedSubjects(timetableData.selectedSubs.map((x) => x.group).flat());
  }, [timetableData]);

  const saveTimetable = () => {
    setIsLoading(true);
    supabase
      .from("timetables")
      .upsert([
        {
          id: user?.id,
          codes: selectedSubjects.map((x) => x.code),
          country: timetableData.country,
          zone: timetableData.zone,
        },
      ])
      .then((response) => {
        const { error } = response;

        // TODO: check response and do error handling
        if (error) {
          // TODO: show error message
          console.log(error);
        } else {
          router.push(`/timetable/${user?.id}`);
        }

        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 py-16">
      {/* loading overlay */}
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-white" />
        </div>
      )}

      <div className="flex max-h-[80vh] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">My Timetable</h1>
        <Table subjects={selectedSubjects} setSubjects={setSelectedSubjects} />
      </div>
      <button
        className="mb-12 rounded-full bg-primary px-6 py-1 text-dark"
        onClick={saveTimetable}
      >
        Save
      </button>
    </div>
  );
};

export default TimetablePage;

export const getServerSideProps = VerifySession;
