import { useRouter } from "next/router";
import React from "react";

const TimetablePage = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      Code list:{" "}
      <div>
        <pre>
          <code>{JSON.stringify(code, null, 2)}</code>
        </pre>
      </div>
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
