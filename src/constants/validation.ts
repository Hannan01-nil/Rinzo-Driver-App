export const VALIDATION = {
  PHONE: {
    regex: /^\+?[1-9]\d{9,14}$/,
    length: { min: 10, max: 15 },
    errorMessage: 'Enter a valid phone number',
  },
  OTP: {
    regex: /^\d{6}$/,
    length: 6,
    errorMessage: 'OTP must be 6 digits',
  },
  NAME: {
    minLength: 2,
    maxLength: 50,
    errorMessage: 'Name must be 2-50 characters',
  },
  EMAIL: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: 'Enter a valid email address',
  },
  ACCOUNT_NUMBER: {
    regex: /^\d{9,18}$/,
    errorMessage: 'Enter a valid account number',
  },
  IFSC_CODE: {
    regex: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    errorMessage: 'Enter a valid IFSC code',
  },
  LICENSE_PLATE: {
    regex: /^[A-Z0-9- ]{5,15}$/,
    errorMessage: 'Enter a valid license plate',
  },
  AMOUNT: {
    min: 1,
    max: 100000,
    errorMessage: 'Enter a valid amount',
  },
} as const
