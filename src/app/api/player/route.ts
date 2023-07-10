import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function compareUpdatedAt(a: any, b: any) {
  if (a.updatedAt > b.updatedAt) {
    return -1; // a should come before b
  } else if (a.updatedAt < b.updatedAt) {
    return 1; // a should come after b
  } else {
    return 0; // a and b are equal in terms of updatedAt
  }
}

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
  const rawUsername = searchParams.get("username");
  if (!rawUsername) {
    return NextResponse.json(
      {
        error: "Missing 'username' parameter.",
      },
      {
        status: 400,
      }
    );
  }
  const username = rawUsername.toLowerCase();
  if (username.length < 3 || username.length > 16) {
    return NextResponse.json(
      {
        error: "Player not found",
      },
      {
        status: 400,
      }
    );
  }

  BigInt.prototype.toJSON = function() {
    return this.toString();
  };

  const player = await prisma.players.findFirst({
    where: {
      username,
    },
    include: {
      bedwars_stats: true,
    },
  });

  if (!player) {
    const driverRes = await fetch(
      `https://bw-driver.coralstats.com/player/${username}`,
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

    const { stats, playerData } = await driverRes.json();

    const totalKills = Number(stats.kills);
    const totalDeaths = Number(stats.deaths);
    const finalKills = Number(stats.finalKills);
    const finalDeaths = Number(stats.finalDeaths);
    const gamesPlayed = Number(stats.gamesPlayed);
    const wins = Number(stats.wins);

    const newPlayer = await prisma.players.create({
      data: {
        username,
        display_name:
          playerData.display_name !== "" ? playerData.displayName : null,
        rank: playerData.rank !== "" ? playerData.rank : null,
        clan: stats.clan !== "" ? stats.clan : null,
        skin_url: playerData.skinUrl !== "" ? playerData.skinUrl : null,
        skin_is_slim: playerData.skinModel === "slim",
        bedwars_stats: {
          create: {
            level: Number(stats.level),
            experience: Number(stats.xp),
            elo: Number(stats.elo),
            coins: Number(stats.coins),
            kills: totalKills - finalKills,
            deaths: totalDeaths - finalDeaths,
            final_kills: finalKills,
            final_deaths: finalDeaths,
            wins,
            losses: gamesPlayed - wins,
            beds_broken: Number(stats.bedsBroken),
            winstreak: Number(stats.winstreak),
            highest_winstreak: Number(stats.highestWinstreak),
          },
        },
      },
      include: {
        bedwars_stats: true,
      },
    });
    return NextResponse.json(newPlayer);
  }

  player.bedwars_stats.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });

  return NextResponse.json(player);
}
