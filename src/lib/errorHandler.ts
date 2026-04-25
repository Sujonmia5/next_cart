import { AppError } from "./error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any) {
  if (error.name === "ZodError") {
    return {
      statusCode: 400,
      message: "Validation failed",
      errors: error.errors,
    };
  } else if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  // Unknown error (server crash type)
  return {
    error: error,
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error 55",
  };
}
