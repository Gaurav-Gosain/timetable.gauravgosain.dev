import Table from "@/components/Timetable/Table";
import VerifySession from "@/utils/VerifySession";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgUndo } from "react-icons/cg";
import { useSessionStorage } from "usehooks-ts";

const TimetablePage = () => {
  const router = useRouter();
  const [timetableData, _] = useSessionStorage("timetable", {});
  const user = useUser();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = React.useState(null);
  const [removedSubjects, setRemovedSubjects] = React.useState([]);

  useEffect(() => {
    setSelectedSubjects(timetableData.selectedSubs.map((x) => x.group).flat());
  }, [timetableData]);

  useEffect(() => {
    if (selectedSubjects === null) return;
    if (selectedSubjects.length === 0) {
      router.push("/");
      // delete timetable from db
      supabase.from("timetables").delete().eq("id", user?.id);
    }
  }, [selectedSubjects]);

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
          setIsLoading(false);
          alert("Error saving timetable. Please try again later.");
        } else {
          router.push(`/timetable/${user?.id}`);
        }
      });
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 py-16">
      {/* loading overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-white" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">My Timetable</h1>
        <div className="flex-1">
          {selectedSubjects !== null && (
            <Table
              subjects={selectedSubjects}
              setSubjects={setSelectedSubjects}
              removedSubjects={removedSubjects}
              setRemovedSubjects={setRemovedSubjects}
            />
          )}
          {removedSubjects.length > 0 && (
            <div className="fixed bottom-4 right-4">
              <div
                className="flex cursor-pointer items-center gap-1 rounded-full bg-primary p-2 text-xl text-dark"
                onClick={() => {
                  //? pop the last element from the removedSubjects array
                  const lastRemovedSubject = removedSubjects.pop();
                  //? add the last removed subject to the selectedSubjects array
                  setSelectedSubjects([
                    lastRemovedSubject,
                    ...selectedSubjects,
                  ]);
                  //? update the removedSubjects array
                  setRemovedSubjects(removedSubjects);
                }}
              >
                <CgUndo />
                <div className="text-sm md:text-base">Undo</div>
              </div>
            </div>
          )}
        </div>
        {!isLoading && (
          <button
            className="relative rounded-full bg-primary px-6 py-1 font-semibold text-dark"
            onClick={saveTimetable}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;

export const getServerSideProps = VerifySession;
