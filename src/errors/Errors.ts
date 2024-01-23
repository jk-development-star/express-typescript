interface AuthorError {
  nameError?: string;
}

export const handleErrors = (error: any): AuthorError => {
  const authorError: AuthorError = {};

  if (error.errors.name) {
    authorError.nameError = error.errors.name.message;
  }

  return authorError;
};
