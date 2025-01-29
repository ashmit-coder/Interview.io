import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../DBconfig/dbConfig";

connect();

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({
    message: "This is Team Registration Route",
    status: 200,
  });
}
