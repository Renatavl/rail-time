import { NextResponse } from "next/server";
import * as yup from "yup";
import { authService } from "@/server/services/authService";

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dto = await registerSchema.validate(body, { abortEarly: false });

    const user = await authService.register(dto);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json(
        { message: "Invalid data", errors: err.errors },
        { status: 400 }
      );
    }

    if (err instanceof Error && err.message === "EMAIL_TAKEN") {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
