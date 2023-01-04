import Table from "@/components/Timetable/Table";
import { useRouter } from "next/router";
import React from "react";

const TimetablePage = () => {
  const router = useRouter();
  const { code, zone } = router.query;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div>Code list:</div>
      <div>
        <pre>
          <code>{JSON.stringify(code, null, 2)}</code>
        </pre>
      </div>
      <div>Zone = Zone-{zone}</div>
      <Table />
      <button
        className="rounded-full bg-primary px-6 py-1 text-dark"
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
