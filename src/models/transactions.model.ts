interface TransactionsModel {
  transactions: Transaction[];
}

interface Transaction {
  address: string;
  amount: number;
  currency: string;
  date: string;
  direction: string;
}
