const VerifySession = async (ctx) => {
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

  return {
    props: {},
  };
};

export default VerifySession;
