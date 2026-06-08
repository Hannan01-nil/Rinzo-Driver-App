import { VALIDATION } from '@/constants'

export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE.regex.test(phone)
}

export function isValidOtp(otp: string): boolean {
  return VALIDATION.OTP.regex.test(otp)
}

export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL.regex.test(email)
}

export function isValidName(name: string): boolean {
  return name.length >= VALIDATION.NAME.minLength && name.length <= VALIDATION.NAME.maxLength
}

export function isValidAccountNumber(accountNumber: string): boolean {
  return VALIDATION.ACCOUNT_NUMBER.regex.test(accountNumber)
}

export function isValidIfscCode(ifsc: string): boolean {
  return VALIDATION.IFSC_CODE.regex.test(ifsc)
}

export function isValidLicensePlate(plate: string): boolean {
  return VALIDATION.LICENSE_PLATE.regex.test(plate)
}

export function isValidAmount(amount: number): boolean {
  return amount >= VALIDATION.AMOUNT.min && amount <= VALIDATION.AMOUNT.max
}
