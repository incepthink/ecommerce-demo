import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem, MockUser } from "@/lib/types";
import { getCart, saveCart, getUser, saveUser, logoutUser as storageLogout, clearCart } from "@/lib/storage";

interface StoreContextType {
  cart: CartItem[];
  user: MockUser | null;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  cartCount: number;
  login: (user: MockUser) => void;
  logout: () => void;
  emptyCart: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(getCart);
  const [user, setUser] = useState<MockUser | null>(getUser);

  useEffect(() => { saveCart(cart); }, [cart]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: qty } : i));
  }, [removeFromCart]);

  const emptyCart = useCallback(() => { setCart([]); clearCart(); }, []);

  const login = useCallback((u: MockUser) => { setUser(u); saveUser(u); }, []);
  const logout = useCallback(() => { setUser(null); storageLogout(); }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <StoreContext.Provider value={{ cart, user, addToCart, removeFromCart, updateCartQty, cartCount, login, logout, emptyCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
