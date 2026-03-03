import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const featured = products.filter((p) => p.featured);
  const filtered = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : featured;

  return (
    <div className="container-page py-8 space-y-12">
      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-4 py-12">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Crafted with <span className="text-primary">intention</span>
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Curated essentials made from premium materials. Designed to last, built to be loved.
        </p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Shop All <ArrowRight size={16} />
        </Link>
      </section>

      {/* Search */}
      <div className="relative mx-auto max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-ring focus:ring-2 transition-shadow"
        />
      </div>

      {/* Products */}
      <section>
        <h2 className="font-display text-2xl font-bold mb-6">
          {search ? `Results for "${search}"` : "Featured"}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
