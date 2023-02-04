import SignOutButton from "@/components/SignOutButton";
import Table from "@/components/Timetable/Table";
import { ZoneMap } from "@/data/zone_map";
import logo from "@/public/logo_light.png";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { IoCopy } from "react-icons/io5";
import { useSessionStorage } from "usehooks-ts";

const TimetablePage = ({ id, zone, codes, country, canEdit = false }) => {
  const [subjects, setSubjects] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("Copy Sharing Link");
  const [buttonClick, setButtonClick] = useState(false);
  const [_, setTimetableData] = useSessionStorage("timetable", {});

  const supabase = useSupabaseClient();
  const session = useSession();
  const canvasRef = useRef();

  useEffect(() => {
    if (id && codes && zone) {
      const zoneData = ZoneMap[parseInt(zone)];
      const flatZoneData = zoneData.map((x) => x.group).flat();
      setSubjects(flatZoneData.filter((x) => codes.includes(x.code)));
    }
    QRCode.toCanvas(
      canvasRef.current,
      // QR code doesn't work with an empty string
      // so we are using a blank space as a fallback
      `https://timetable.knowfly.org/timetable/${id}` || " ",
      (error) => error && console.error(error)
    );

    if (canEdit) {
      // save stuff to session storage
      setTimetableData({
        selectedSubs: subjects,
        country: country,
        zone: zone,
      });
    }
  }, [id, codes, zone]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `https://timetable.knowfly.org/timetable/${id}`
    );
    setButtonTitle("Copied to Clipboard");
    setButtonClick(true);
  };

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8">
      {/* loading overlay */}
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-white" />
        </div>
      )}
      <div className="flex w-full flex-row items-center justify-between px-4 md:absolute md:top-8 md:px-24">
        <Link href={"https://www.knowfly.org/tools"}>
          <Image src={logo} className="h-12 w-12" />
        </Link>
        <div
          onClick={() => {
            supabase.auth.signOut().then(() => {
              // navigate to "https://www.knowfly.org/tools"
              document.location.href = "https://www.knowfly.org/tools";
            });
          }}
        >
          {session && <SignOutButton />}
        </div>
      </div>
      <Table subjects={subjects} setSubjects={setSubjects} editable={false} />
      <div className="flex items-center p-4">
        <canvas ref={canvasRef} />
      </div>
      <div className="flex flex-col items-center gap-4 pb-16 md:flex-row">
        {canEdit && (
          <Link
            href={`/zone/${zone}?id=${id}`}
            onClick={() => {
              setLoading(true);
            }}
          >
            <button
              className={`duration-300ms flex flex-row items-center gap-1 rounded-full bg-primary px-3 py-1 font-semibold text-dark transition-all hover:bg-white focus:bg-white`}
            >
              <HiPencil className="text-sm" />
              <div>Edit</div>
            </button>
          </Link>
        )}
        {canEdit && (
          <button
            className={`duration-300ms flex flex-row items-center gap-1 rounded-full bg-primary px-3 py-1 font-semibold text-dark transition-all hover:bg-white focus:bg-white`}
            onClick={() => {
              setLoading(true);
              supabase
                .from("timetables")
                .delete()
                .eq("id", id)
                .then(() => {
                  router.push("/");
                });
            }}
          >
            <HiTrash className="text-sm" />
            <div>Reset Timetable</div>
          </button>
        )}
        <button
          className={`duration-300ms flex flex-row items-center gap-1 rounded-full bg-primary px-3 py-1 font-semibold text-dark transition-all hover:bg-white focus:bg-white ${
            buttonClick ? "bg-white" : "bg-primary"
          }`}
          onClick={copyLink}
        >
          <IoCopy className="text-sm" />
          <div>{buttonTitle}</div>
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
    .select("zone, codes, country")
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

  if (user_error || user === null) {
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
