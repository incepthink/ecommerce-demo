import { useParams, Link } from "react-router-dom";
import { getOrders } from "@/lib/storage";
import { progressOrderStatus } from "@/lib/orderStatus";
import OrderTimeline from "@/components/OrderTimeline";
import { ArrowLeft, Truck } from "lucide-react";
import { useMemo } from "react";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const order = useMemo(() => {
    const found = getOrders().find((o) => o.id === orderId);
    return found ? progressOrderStatus(found) : null;
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Order not found</h1>
        <Link to="/orders" className="text-primary hover:underline">← Back to orders</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 space-y-8">
      <Link to="/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Back to orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="font-display text-3xl font-bold">{order.id}</h1>
        <span className="inline-block self-start rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          {order.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold">Items</h2>
            {order.items.map((i) => (
              <div key={i.product.id} className="flex gap-4 rounded-lg border border-border p-3">
                <img src={i.product.image} alt={i.product.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {i.quantity}</p>
                  </div>
                  <span className="font-display font-bold text-sm">${(i.product.price * i.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div>
            <h2 className="font-display text-lg font-bold mb-2">Shipping</h2>
            <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground space-y-1">
              <p className="text-foreground font-medium">{order.shipping.fullName}</p>
              <p>{order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
              <p>{order.shipping.country}</p>
            </div>
          </div>

          {/* Tracking */}
          {order.carrier && (
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <Truck size={20} className="text-primary" />
              <div className="text-sm">
                <p className="font-medium">{order.carrier}</p>
                <p className="text-muted-foreground">{order.trackingNumber}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <h3 className="font-display font-bold">Summary</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${order.tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-display font-bold border-t border-border pt-2"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Paid with {order.payment.brand} ····{order.payment.last4}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display font-bold mb-4">Status</h3>
            <OrderTimeline status={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
