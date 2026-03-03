import { Order, OrderStatus } from "@/lib/types";
import { updateOrder } from "@/lib/storage";

const STATUS_FLOW: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

// Each status advances after this many minutes since order creation
const STATUS_THRESHOLDS_MINUTES = [0, 2, 5, 10, 20, 30];

const CARRIERS = ["FedEx", "UPS", "DHL", "USPS"];

function generateTrackingNumber(): string {
  return "TRK" + Math.random().toString(36).substring(2, 12).toUpperCase();
}

function randomCarrier(): string {
  return CARRIERS[Math.floor(Math.random() * CARRIERS.length)];
}

export function progressOrderStatus(order: Order): Order {
  if (order.status === "DELIVERED") return order;

  const createdAt = new Date(order.createdAt).getTime();
  const now = Date.now();
  const elapsedMinutes = (now - createdAt) / 60000;

  let newIndex = 0;
  for (let i = STATUS_THRESHOLDS_MINUTES.length - 1; i >= 0; i--) {
    if (elapsedMinutes >= STATUS_THRESHOLDS_MINUTES[i]) {
      newIndex = i;
      break;
    }
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);
  if (newIndex <= currentIndex) return order;

  const updated = { ...order, status: STATUS_FLOW[newIndex] };

  // Add carrier + tracking when reaching SHIPPED
  if (newIndex >= 3 && !order.carrier) {
    updated.carrier = randomCarrier();
    updated.trackingNumber = generateTrackingNumber();
  }

  updateOrder(updated);
  return updated;
}

export function getStatusIndex(status: OrderStatus): number {
  return STATUS_FLOW.indexOf(status);
}

export { STATUS_FLOW };
