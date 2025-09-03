import { NextResponse } from "next/server";
import * as yup from "yup";
import { trainService } from "@/server/services/trainService";
import { createTrainSchema } from "@/server/validation/trainScheme";
import {
  getErrorCode,
  isYupValidationError,
} from "@/server/utls/error-handler";

type CreateTrainDto = yup.InferType<typeof createTrainSchema>;

function err(e: unknown) {
  if (isYupValidationError(e)) {
    return NextResponse.json(
      { message: "Invalid data", errors: e.errors },
      { status: 400 }
    );
  }

  const code = getErrorCode(e);
  if (code === "P2002") {
    return NextResponse.json(
      { message: "Train number already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ message: "Internal error" }, { status: 500 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const items = await trainService.list(q);
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const dto: CreateTrainDto = await createTrainSchema.validate(body, {
      abortEarly: false,
    });
    const created = await trainService.create(dto);
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    return err(e);
  }
}
