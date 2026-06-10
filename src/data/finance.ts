import type { TBankAccount } from "@/types";

export const mockBankAccount: TBankAccount & { upiId: string } = {
  id: "bank_001",
  bankName: "State Bank of India",
  accountHolderName: "Rahul Sharma",
  accountNumber: "1234567890124321",
  ifscCode: "SBIN0001234",
  isVerified: true,
  isDefault: true,
  upiId: "rahul@paytm",
};
