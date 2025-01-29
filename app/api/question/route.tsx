import { NextResponse } from "next/server";
import { getQuestions } from "./lib";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const name = searchParams.get("name");

  if (!type || !name) {
    return NextResponse.json(
      { error: "Missing type or name parameter" },
      { status: 400 }
    );
  }

  const questions = await getQuestions(type, name);
  return NextResponse.json(questions);
}
