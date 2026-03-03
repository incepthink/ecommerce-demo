import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

type SortKey = "default" | "price-asc" | "price-desc" | "rating";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || p.category === category;
      return matchesSearch && matchesCat;
    });
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <div className="container-page py-8 space-y-6">
      <h1 className="font-display text-3xl font-bold">All Products</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
