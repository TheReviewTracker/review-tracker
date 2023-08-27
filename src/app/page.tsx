"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/sign_in");
    } else {
      router.push("/main");
    }
  }, []);

  return <></>;
};

export default RootPage;
