import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    const { name, date, description } = data;

    if (!name || !date) {
      return new NextResponse("Bad Request: Missing required fields", {
        status: 400,
      });
    }

    // const fleetMovement = await prisma.oper_mov_flota.create({})

    return NextResponse.json(data, {
      status: 201,
    });

  } catch (error) {
    console.error("Error in POST /fleet-movement:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }

}