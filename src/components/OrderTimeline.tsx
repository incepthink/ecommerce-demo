import { OrderStatus } from "@/lib/types";
import { STATUS_FLOW, getStatusIndex } from "@/lib/orderStatus";
import { Check, Circle } from "lucide-react";

const labels: Record<OrderStatus, string> = {
  PLACED: "Order Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

export default function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIdx = getStatusIndex(status);

  return (
    <div className="flex flex-col gap-0">
      {STATUS_FLOW.map((s, i) => {
        const done = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={s} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"
              }`}>
                {done ? <Check size={14} /> : <Circle size={14} />}
              </div>
              {i < STATUS_FLOW.length - 1 && (
                <div className={`h-8 w-0.5 ${i < currentIdx ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
            <span className={`pt-1 text-sm font-medium ${isCurrent ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
              {labels[s]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
