import { Link } from "react-router-dom";
import { ShoppingCart, User, Package, LogOut, Menu, X } from "lucide-react";
import { useStore } from "@/lib/StoreContext";
import { useState } from "react";

export default function Navbar() {
  const { cartCount, user, logout } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          ARTISAN<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          {user && (
            <Link
              to="/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Orders
            </Link>
          )}
          {/* <Link to="/track" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Track</Link> */}
          <Link
            to="/cart"
            className="relative text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <User size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background p-4 md:hidden flex flex-col gap-3">
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="text-sm font-medium"
          >
            Shop
          </Link>
          {user && (
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              Orders
            </Link>
          )}
          <Link
            to="/track"
            onClick={() => setOpen(false)}
            className="text-sm font-medium"
          >
            Track
          </Link>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="text-sm font-medium flex items-center gap-2"
          >
            Cart{" "}
            {cartCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="text-sm font-medium text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
