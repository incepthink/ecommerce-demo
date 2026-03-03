import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/schemas";
import { registerUser, getRegisteredUsers } from "@/lib/storage";
import { useStore } from "@/lib/StoreContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignupPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    const existing = getRegisteredUsers();
    if (existing.find((u) => u.email === data.email)) {
      toast.error("Email already registered");
      return;
    }
    const newUser = { id: crypto.randomUUID(), email: data.email, name: data.name, password: data.password };
    registerUser(newUser);
    login({ id: newUser.id, email: newUser.email, name: newUser.name });
    toast.success("Account created!");
    navigate("/");
  };

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join us today</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input {...register("name")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
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
          <div className="space-y-1">
            <label className="text-sm font-medium">Confirm Password</label>
            <input {...register("confirmPassword")} type="password" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
