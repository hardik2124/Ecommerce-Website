export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
}
