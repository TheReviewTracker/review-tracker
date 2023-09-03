"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

import { Box, Button, CircularProgress } from "@mui/material";

import { CLIENT_ID } from "app/lib/env";

interface IProps {
  searchParams: { code: string };
}

const SignInPage = ({ searchParams }: IProps) => {
  const { code } = searchParams;
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(false);

  if (Cookies.get("token")) {
    Cookies.remove("token");
  }

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        setAuthLoading(true);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 800,
          height: 165,
          border: "1px solid",
          background: "#FFF",
          borderRadius: "8px",
          borderColor: "#EEE",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 26, marginTop: 20 }}>
          Review Tracker
        </div>
        {!authLoading ? (
          <Button
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${"http://localhost:9850/sign_in"}`}
            sx={{
              mt: 6,
              color: "white",
              textTransform: "none",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            <Image
              src="/github-mark-white.svg"
              alt="github-mark"
              width={25}
              height={25}
              style={{ marginRight: 10 }}
            />
            <div>Log in with GitHub</div>
          </Button>
        ) : (
          <CircularProgress sx={{ mt: 6 }} />
        )}
      </Box>
    </Box>
  );
};

export default SignInPage;
