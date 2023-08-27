// 아래 라인 프로젝트 전체에 적용 필요
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface IProps {
  searchParams: { code: string };
}

const CLIENT_ID = "cd00ae41d879ad88a3ac";

const SignInPage = ({ searchParams }: IProps) => {
  const { code } = searchParams;
  const router = useRouter();

  if (Cookies.get("token")) {
    Cookies.remove("token");
  }

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        const res = await fetch(`http://localhost:9850/api/auth?code=${code}`, {
          method: "post",
        });
        if (!res.ok) {
          router.push("/sign_in");
        }
        router.push("/main");
      };

      getToken();
    }
  }, []);

  return (
    <div>
      <Link
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${"http://localhost:9850/sign_in"}`}
      >
        Github Auth
      </Link>
    </div>
  );
};

export default SignInPage;
