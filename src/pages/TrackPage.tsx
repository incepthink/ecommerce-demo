import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema, TrackOrderFormData } from "@/lib/schemas";
import { getOrders } from "@/lib/storage";
import { progressOrderStatus } from "@/lib/orderStatus";
import { Order } from "@/lib/types";
import OrderTimeline from "@/components/OrderTimeline";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Truck } from "lucide-react";

export default function TrackPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<TrackOrderFormData>({
    resolver: zodResolver(trackOrderSchema),
  });

  const onSubmit = (data: TrackOrderFormData) => {
    const found = getOrders().find(
      (o) => o.id === data.orderId && o.shipping.email === data.email
    );
    if (!found) {
      toast.error("Order not found. Check your Order ID and email.");
      setOrder(null);
      return;
    }
    setOrder(progressOrderStatus(found));
  };

  return (
    <div className="container-page py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground">Enter your order ID and email to see the latest status.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Order ID</label>
          <input {...register("orderId")} placeholder="ORD-XXXXXXX" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
          {errors.orderId && <p className="text-xs text-destructive">{errors.orderId.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input {...register("email")} type="email" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
          <Search size={16} /> Track Order
        </button>
      </form>

      {order && (
        <div className="mx-auto max-w-md space-y-6 animate-fade-in">
          <div className="rounded-lg border border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-lg font-bold">{order.id}</h2>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                {order.status.replace(/_/g, " ")}
              </span>
            </div>

            <OrderTimeline status={order.status} />

            {order.carrier && (
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Truck size={18} className="text-primary" />
                <div className="text-sm">
                  <p className="font-medium">{order.carrier}</p>
                  <p className="text-muted-foreground">{order.trackingNumber}</p>
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              Total: <span className="text-foreground font-display font-bold">${order.total.toFixed(2)}</span>
              {" · "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
