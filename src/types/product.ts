export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  additionalImages?: string[];
  rating: number;
  reviews: number;
  stock: number;
  sizes: string[];
  colors: string[];
  tags?: string[];
  isNew: boolean;
  featured?: boolean;
  sku?: string;
  sales: number;
}
