import VerifySession from "@/utils/VerifySession";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    supabase.auth.onAuthStateChange(async (event) => {
      // on forgot password, we get a "PASSWORD_RECOVERY" event
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-8 text-center text-3xl md:text-4xl">
      <div>Logging you in...</div>
      <div className="text-sm md:text-base">
        (if you do not get redirected automatically, please try refreshing the
        page)
      </div>
      <div>
        {/* loading spinner */}
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-white" />
      </div>
      <Link
        href="https://www.knowfly.org/tools"
        className="text-sm text-blue-300 underline"
      >
        Go back to Knowfly
      </Link>
    </div>
  );
};

export default Login;

export const getServerSideProps = VerifySession;
