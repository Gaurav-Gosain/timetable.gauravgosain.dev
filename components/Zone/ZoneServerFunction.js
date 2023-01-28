const ZoneServerFunction = async (ctx) => {
  const { id } = ctx.query;
  const { zone } = ctx.query;

  if (!id) {
    return {
      props: {
        filteredSubjects: [],
      },
    };
  }

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
        filteredSubjects: [],
      },
    };
  }

  // get the json file from the zone
  let currentZone = ZoneMap[parseInt(zone)];

  // get the subjects from the timetable codes 1234/11 -> 1234
  let timetableSubjects = timetable.codes.map((code) => {
    return code.split("/")[0];
  });

  // get all the main subjects from currentZone
  let filteredSubjects = currentZone.filter((subject) => {
    // check if the subject is in the timetable
    return timetableSubjects.includes(subject.code);
  });

  // add a selected property to each child in the group array inside each subject
  filteredSubjects = filteredSubjects.map((subject) => {
    return {
      ...subject,
      group: subject.group.map((group) => {
        return {
          ...group,
          // set selected to true if the subject is in the timetable
          selected: timetable.codes.includes(group.code),
        };
      }),
    };
  });

  if (filteredSubjects.length === 0) {
    return {
      props: {
        filteredSubjects: [],
      },
    };
  }

  let selectedTypesList = filteredSubjects.map((subject) => {
    return subject.group[0].type.replace("AS Level", "A Level");
  });

  // check if all the types are the same
  let selectedType = selectedTypesList.every((val, _i, arr) => val === arr[0])
    ? selectedTypesList[0]
    : "custom";

  return {
    props: {
      selectedSubjects: filteredSubjects,
      type: selectedType,
      allowChangingType: false,
    },
  };
};

export default ZoneServerFunction;
