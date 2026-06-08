export interface TAddBankAccountPayload {
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode?: string
  routingNumber?: string
}
