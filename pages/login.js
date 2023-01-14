import VerifySession from "@/utils/VerifySession";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-8 text-center text-xl md:text-4xl">
      <div>
        Logging you in... (if you do not get redirected automatically, please
        try refreshing the page)
      </div>
      <div>
        {/* loading spinner */}
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-white" />
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = VerifySession();
