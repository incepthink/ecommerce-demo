import { useStore } from "@/lib/StoreContext";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart } = useStore();

  const items = cart.map((ci) => {
    const product = products.find((p) => p.id === ci.productId)!;
    return { ...ci, product };
  }).filter((i) => i.product);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center space-y-4">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="inline-block text-primary hover:underline">Continue shopping →</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 space-y-8">
      <h1 className="font-display text-3xl font-bold">Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-lg border border-border p-4">
              <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to={`/products/${product.slug}`} className="font-display font-semibold hover:text-primary transition-colors">{product.name}</Link>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-input">
                    <button onClick={() => updateCartQty(product.id, quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                    <span className="min-w-[1.5rem] text-center text-sm">{quantity}</span>
                    <button onClick={() => updateCartQty(product.id, Math.min(product.stock, quantity + 1))} className="px-2 py-1 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold">${(product.price * quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-6 h-fit space-y-4">
          <h2 className="font-display text-lg font-bold">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-base">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
