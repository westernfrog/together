import { useEffect } from "react";
import { GetUserName } from "@/components/GetUserName";
import Overview from "@/components/Overview";
import { useRouter } from "next/router";

export default function Home() {
  const user = GetUserName();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push({
        pathname: "/together",
      });
    }
  }, [user]);

  return <>{!user && <Overview />}</>;
}
