import Table from "@/components/Timetable/Table";
import { ZoneMap } from "@/data/zone_map";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";

const TimetablePage = ({ id, zone, codes, canEdit = false }) => {
  const [subjects, setSubjects] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("Copy Sharing Link");
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    if (id && codes && zone) {
      const zoneData = ZoneMap[parseInt(zone)];
      const flatZoneData = zoneData.map((x) => x.group).flat();
      setSubjects(flatZoneData.filter((x) => codes.includes(x.code)));
    }
  }, [id, codes, zone]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `https://timetable.knowfly.org/timetable/${id}`
    );
    setButtonTitle("Copied to Clipboard");
    setButtonClick(true);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Table subjects={subjects} setSubjects={setSubjects} editable={false} />
      <div className="flex flex-row gap-4">
        {canEdit && (
          <Link href={`/zone/${zone}?id=${id}`}>
            <button
              class={`duration-300ms flex flex-row items-center gap-1 rounded-full bg-primary px-3 py-1 text-dark transition-all hover:bg-white focus:bg-white`}
            >
              <HiPencil className="text-sm" />
              <div>Edit</div>
            </button>
          </Link>
        )}
        <button
          class={`duration-300ms rounded-full bg-primary px-3 py-1 text-dark transition-all hover:bg-white focus:bg-white ${
            buttonClick ? "bg-white" : "bg-primary"
          }`}
          onClick={copyLink}
        >
          {buttonTitle}
        </button>
        {/* Shareable Link: {`https://timetable.knowfly.org/timetable/${id}`} */}
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

  let { data: user, user_error } = await supabase
    .from("users")
    .select("id")
    .single();

  let canEdit = false;

  if (user_error) {
    canEdit = false;
  } else if (user.id === id) {
    canEdit = true;
  }

  return {
    props: {
      id,
      canEdit,
      ...timetable,
    },
  };
};
