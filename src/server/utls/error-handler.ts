import * as yup from "yup";

export function isYupValidationError(err: unknown): err is yup.ValidationError {
  return err instanceof yup.ValidationError;
}

export function getErrorCode(err: unknown): string | null {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as Record<string, unknown>).code;
    return typeof code === "string" ? code : null;
  }
  return null;
}

export function getErrorName(err: unknown): string | null {
  if (typeof err === "object" && err !== null && "name" in err) {
    const name = (err as Record<string, unknown>).name;
    return typeof name === "string" ? name : null;
  }
  return null;
}
