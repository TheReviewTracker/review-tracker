import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CLIENT_ID, CLIENT_SECRET } from "app/lib/env";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const res = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
      {
        method: "post",
        headers: { Accept: "application/json" },
      },
    );

    const data = await res.json();

    if (data.error) {
      cookies().delete("token");

      return NextResponse.json(
        { error: "Github Oauth Error" },
        {
          status: 500,
        },
      );
    }

    cookies().set({
      name: "token",
      value: data.access_token,
      path: "/",
    });

    return NextResponse.json(
      { data: "success" },
      {
        status: 200,
      },
    );
  }
}
