import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas";
import { getRegisteredUsers } from "@/lib/storage";
import { useStore } from "@/lib/StoreContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const users = getRegisteredUsers();
    const found = users.find((u) => u.email === data.email && u.password === data.password);
    if (!found) {
      toast.error("Invalid email or password");
      return;
    }
    login({ id: found.id, email: found.email, name: found.name });
    toast.success(`Welcome back, ${found.name}!`);
    navigate("/");
  };

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input {...register("email")} type="email" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input {...register("password")} type="password" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
