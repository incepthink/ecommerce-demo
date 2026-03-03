import { Product } from "@/lib/types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{product.category}</span>
        <h3 className="font-display text-sm font-semibold leading-snug">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold">${product.price}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[11px] font-medium text-primary">Only {product.stock} left</span>
          )}
          {product.stock === 0 && (
            <span className="text-[11px] font-medium text-destructive">Sold out</span>
          )}
        </div>
      </div>
    </Link>
  );
}
