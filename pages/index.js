import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-8 text-center text-xl md:text-4xl">
      Timetable
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  if (!ctx.req.cookies["sb:token"])
    if (process.env.NODE_ENV === "production")
      return {
        redirect: {
          destination: "https://www.knowfly.org/signin?to=timetable",
          permanent: false,
        },
      };

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

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    if (process.env.NODE_ENV === "production")
      return {
        redirect: {
          destination: "https://www.knowfly.org/signin?to=timetable",
          permanent: false,
        },
      };

  let session_id;

  if (process.env.NODE_ENV === "production") {
    session_id = session.user.id;

    let { data: timetable, error } = await supabase
      .from("timetables")
      .select("id")
      .eq("id", session_id)
      .single();

    if (error) {
      return {
        redirect: {
          destination: "/search",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/timetable/${timetable.id}`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/search",
      permanent: false,
    },
  };
};
