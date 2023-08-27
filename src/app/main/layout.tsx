"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/sign_in");
    }
  }, []);

  return <div>{children}</div>;
};

export default MainLayout;
