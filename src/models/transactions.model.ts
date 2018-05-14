export interface TransactionsModel {
  items: Transaction[]
}

export interface Transaction {
  amount: number | null;
  asset: string;
  convertedAmount: null | number;
  recipient: string;
  sender: string;
  timestamp: number;
  type: number;
}
