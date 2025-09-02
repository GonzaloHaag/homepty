import { getProperties } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getProperties({
    search: "",
    operationId: 0,
    type: "todos",
  });

  if (!response.ok || !response.data) {
    return NextResponse.json(
      {
        message: "Error al obtener las propiedades",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(response, { status: 200 });
}
