interface PaymentSummary {
  total_deposit_amount: number;
}

export interface PaymentResponse {
  payment_summary: PaymentSummary;
}
