import Table from "@/components/Timetable/Table";
import { ZoneMap } from "@/data/zone_map";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

const TimetablePage = ({ id, zone, codes }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (id && codes && zone) {
      const zoneData = ZoneMap[parseInt(zone)];
      const flatZoneData = zoneData.map((x) => x.group).flat();
      setSubjects(flatZoneData.filter((x) => codes.includes(x.code)));
    }
  }, [id, codes, zone]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Table subjects={subjects} setSubjects={setSubjects} editable={false} />
      <div>
        Shareable Link: {`https://timetable.knowfly.org/timetable/${id}`}
      </div>
    </div>
  );
};

export default TimetablePage;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx, {
    cookieOptions: {
      // check if we are in production
      name: "sb:token",
      domain:
        process.env.NODE_ENV === "production" ? "knowfly.org" : "localhost",
      path: "/",
      sameSite: "lax",
      secure: "secure",
    },
  });

  let { data: timetable, error } = await supabase
    .from("timetables")
    .select("zone, codes")
    .eq("id", id)
    .single();

  if (error) {
    return {
      props: {
        id: null,
      },
    };
  }
  console.log(timetable);

  return {
    props: {
      id,
      ...timetable,
    },
  };
};