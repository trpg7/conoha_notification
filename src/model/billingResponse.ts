export interface BillingInvoice {
  invoice_id: number;
  payment_method_type: string;
  invoice_date: Date;
  bill_plus_tax: number;
  due_date: Date;
}

export interface BillingResponse {
  billing_invoices: Array<BillingInvoice>;
}
