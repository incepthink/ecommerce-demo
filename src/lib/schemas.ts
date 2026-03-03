import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  address: z.string().trim().min(5, "Address is required").max(200),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  zip: z.string().trim().min(3, "ZIP code is required").max(20),
  country: z.string().trim().min(2, "Country is required").max(100),
});

export const paymentSchema = z.object({
  cardNumber: z.string().min(1, "Card number is required"),
  cardName: z.string().trim().min(2, "Name on card is required"),
  expMonth: z.string().min(1, "Month is required"),
  expYear: z.string().min(1, "Year is required"),
  cvv: z.string().min(1, "CVV is required"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const trackOrderSchema = z.object({
  orderId: z.string().trim().min(1, "Order ID is required"),
  email: z.string().trim().email("Invalid email"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type TrackOrderFormData = z.infer<typeof trackOrderSchema>;
