export interface CustomerOrder {
  id: string;
  date: string;
  items: number;
  total: number;
  status: string;
}

export interface CustomerNote {
  author: string;
  date: string;
  content: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  orderCount: number;
  totalSpent: number;
  isVIP: boolean;
  address?: Address;
  orders?: CustomerOrder[];
  notes?: CustomerNote[];
}
