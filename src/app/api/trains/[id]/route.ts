import { NextResponse } from "next/server";
import * as yup from "yup";
import { trainService } from "@/server/services/trainService";
import {
  updateTrainSchema,
  patchTrainSchema,
} from "@/server/validation/trainScheme";
import {
  getErrorCode,
  getErrorName,
  isYupValidationError,
} from "@/server/utls/error-handler";

type Params = { id: string };
type Ctx = { params: Promise<Params> };

type UpdateTrainDto = yup.InferType<typeof updateTrainSchema>;
type PatchTrainDto = yup.InferType<typeof patchTrainSchema>;

function err(e: unknown) {
  if (isYupValidationError(e) || getErrorName(e) === "ValidationError") {
    const errors = isYupValidationError(e) ? e.errors : undefined;
    return NextResponse.json(
      { message: "Invalid data", errors },
      { status: 400 }
    );
  }

  const code = getErrorCode(e);
  if (code === "P2025") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  if (code === "P2002") {
    return NextResponse.json(
      { message: "Train number already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ message: "Internal error" }, { status: 500 });
}

export async function GET(_req: Request, context: Ctx) {
  const { id } = await context.params;
  const item = await trainService.get(id);
  if (!item) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(req: Request, context: Ctx) {
  const { id } = await context.params;
  try {
    const body = (await req.json()) as unknown;
    const dto: UpdateTrainDto = await updateTrainSchema.validate(body, {
      abortEarly: false,
    });
    const updated = await trainService.replace(id, dto);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    return err(e);
  }
}

export async function PATCH(req: Request, context: Ctx) {
  const { id } = await context.params;
  try {
    const body = (await req.json()) as unknown;
    const dto: PatchTrainDto = await patchTrainSchema.validate(body, {
      abortEarly: false,
    });
    const updated = await trainService.patch(id, dto);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    return err(e);
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const { id } = await context.params;
  try {
    await trainService.remove(id);
    return new NextResponse(null, { status: 204 });
  } catch (e: unknown) {
    return err(e);
  }
}
