export interface CheckoutFormData {
  email: string;
  name: string;
  productId: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  manageToken?: string;
  error?: string;
}
