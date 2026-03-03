import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useStore } from "@/lib/StoreContext";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addToCart, cart } = useStore();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const inCart = cart.find((i) => i.productId === product.id)?.quantity || 0;
  const maxQty = product.stock - inCart;

  const handleAdd = () => {
    if (qty > maxQty) {
      toast.error(`Only ${maxQty} available to add`);
      return;
    }
    addToCart(product.id, qty);
    toast.success(`${product.name} added to cart`);
    setQty(1);
  };

  return (
    <div className="container-page py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</span>
          <h1 className="font-display text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="font-display text-3xl font-bold">${product.price}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 text-sm">
            <span className={product.stock > 0 ? "text-success" : "text-destructive"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-input">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Minus size={16} /></button>
                <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(maxQty, qty + 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Plus size={16} /></button>
              </div>
              <button
                onClick={handleAdd}
                disabled={maxQty <= 0}
                className="flex-1 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                {maxQty <= 0 ? "Max in cart" : "Add to Cart"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
