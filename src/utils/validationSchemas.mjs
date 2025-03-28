export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: 'Username must be at least 5-32 characters',
    },

    isString: {
      errorMessage: 'Username must be a string!',
    },
    notEmpty: {
      errorMessage: 'Username must not be empty!',
    },
  },
  FullName: {
    notEmpty: true,
  },
};
