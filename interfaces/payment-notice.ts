export interface PaymentNotice {
  id: string;
  amount: {
    value: number;
  };
  created: string;
}
