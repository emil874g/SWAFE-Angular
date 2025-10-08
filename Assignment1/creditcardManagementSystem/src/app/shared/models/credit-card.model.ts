export interface CreditCard {
  id?: number;
  card_number: string;
  cardholder_name: string;
  csc_code: string;
  expiration_date_month: number;
  expiration_date_year: number;
  issuer: string;
}
