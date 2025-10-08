export interface Transaction {
  id?: number;
  creditCardId: number;
  card_number?: string;
  amount: number;
  currency: string;
  comment: string;
  date: string;
}
