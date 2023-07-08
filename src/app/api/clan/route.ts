import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader !== process.env.API_SECRET) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawClanName = searchParams.get("name");
  if (!rawClanName) {
    return NextResponse.json(
      {
        error: "Missing 'name' parameter.",
      },
      {
        status: 400,
      }
    );
  }
  const clanName = rawClanName.toLowerCase();

  const driverRes = await fetch(
    `https://bw-driver.coralstats.com/clan/${clanName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: String(process.env.DRIVER_API_KEY),
      },
    }
  );

  if (!driverRes.ok) {
    return NextResponse.json(
      {
        error: driverRes.statusText,
      },
      {
        status: driverRes.status,
      }
    );
  }

  const {
    displayName,
    owner,
    admins: adminsString,
    moderators: moderatorsString,
    members: membersString,
    limit: rawLimit,
  } = await driverRes.json();

  const stringToList = (str: string) => {
    return str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  return NextResponse.json(
    {
      display_name: displayName,
      owner,
      admins: stringToList(adminsString),
      moderators: stringToList(moderatorsString),
      membersString: stringToList(membersString),
      max_members: Number(rawLimit),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    }
  );
}
