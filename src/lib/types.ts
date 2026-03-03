export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentMeta {
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{ product: Product; quantity: number }>;
  shipping: ShippingInfo;
  payment: PaymentMeta;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
}

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export interface MockUser {
  id: string;
  email: string;
  name: string;
}
