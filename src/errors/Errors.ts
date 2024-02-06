export interface ErrorResponse {
  [key: string]: {
    message: string;
  };
}

export const validationError = (error: any) => {
  let validationErrorResponse: ErrorResponse = {};
  for (const field in error.errors) {
    validationErrorResponse[field] = {
      message: error.errors[field].message,
    };
  }
  return validationErrorResponse;
};

export const duplicateEmailError = (error: any) => {
  let emailconflictError: ErrorResponse = {};
  emailconflictError["email"] = {
    message: "Email already in use.",
  };
  return emailconflictError;
};
