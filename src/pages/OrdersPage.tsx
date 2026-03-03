import { useStore } from "@/lib/StoreContext";
import { getOrders } from "@/lib/storage";
import { progressOrderStatus } from "@/lib/orderStatus";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useMemo } from "react";

export default function OrdersPage() {
  const { user } = useStore();

  const orders = useMemo(() => {
    if (!user) return [];
    return getOrders()
      .filter((o) => o.userId === user.id)
      .map(progressOrderStatus)
      .reverse();
  }, [user]);

  if (!user) {
    return (
      <div className="container-page py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold">Please log in</h1>
        <Link to="/login" className="text-primary hover:underline">Sign in →</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container-page py-20 text-center space-y-4">
        <Package size={48} className="mx-auto text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold">No orders yet</h1>
        <Link to="/products" className="text-primary hover:underline">Start shopping →</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 space-y-6">
      <h1 className="font-display text-3xl font-bold">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="font-display font-semibold">{order.id}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold">${order.total.toFixed(2)}</p>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                {order.status.replace(/_/g, " ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
