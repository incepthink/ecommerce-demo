import { CartItem, MockUser, Order } from "@/lib/types";

const CART_KEY = "shop_cart";
const USER_KEY = "shop_user";
const USERS_KEY = "shop_users";
const ORDERS_KEY = "shop_orders";

// Cart
export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// Auth
export function getUser(): MockUser | null {
  try {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

export function saveUser(user: MockUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

export function getRegisteredUsers(): Array<MockUser & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

export function registerUser(user: MockUser & { password: string }) {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Orders
export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch { return []; }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function updateOrder(order: Order) {
  const orders = getOrders().map((o) => (o.id === order.id ? order : o));
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
