export interface TBankAccount {
  id: string
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode?: string
  routingNumber?: string
  isVerified: boolean
  isDefault: boolean
}

export interface TBankDetailsRequest {
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode?: string
  routingNumber?: string
}

export interface TFinanceState {
  bankAccounts: TBankAccount[]
  isLoading: boolean
}
