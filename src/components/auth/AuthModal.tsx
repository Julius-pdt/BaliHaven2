"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { authModal, closeAuth, setAuthModal, login } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!authModal.open) return null;

  const isRegister = authModal.mode === "register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (isRegister && !form.name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // Simulate auth API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    // Demo: special admin email
    const role = form.email.toLowerCase() === "admin@balihaven.com" ? "ADMIN" : "CUSTOMER";

    login({
      id: `u-${Date.now()}`,
      email: form.email,
      name: form.name || form.email.split("@")[0],
      role,
    });

    toast.success(
      isRegister
        ? `Welcome to Bali Haven, ${form.name}!`
        : `Welcome back, ${form.email.split("@")[0]}!`,
    );
    closeAuth();
    setForm({ name: "", email: "", password: "" });
  };

  const handleDemoLogin = (asAdmin: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        id: asAdmin ? "u-admin" : `u-${Date.now()}`,
        email: asAdmin ? "admin@balihaven.com" : "guest@example.com",
        name: asAdmin ? "Bali Haven Admin" : "Demo Guest",
        role: asAdmin ? "ADMIN" : "CUSTOMER",
      });
      toast.success(
        asAdmin
          ? "Logged in as Admin (demo). Accessing admin dashboard..."
          : "Logged in as Guest (demo).",
      );
      closeAuth();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-up"
        onClick={closeAuth}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-up">
        {/* Header image */}
        <div className="relative h-32 bg-foreground overflow-hidden rounded-t-2xl">
          <img
            src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=800&q=80"
            alt="Bali"
            className="w-full h-full object-cover opacity-60"
          />
          <button
            onClick={closeAuth}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-5 text-white">
            <div className="font-serif text-xl font-bold">BALI HAVEN</div>
            <div className="text-xs opacity-80 uppercase tracking-wider">Luxury Villa Booking</div>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-full mb-6">
            <button
              onClick={() => setAuthModal({ mode: "login" })}
              className={cn(
                "flex-1 py-2 rounded-full text-sm font-medium transition-all",
                !isRegister
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Login
            </button>
            <button
              onClick={() => setAuthModal({ mode: "register" })}
              className={cn(
                "flex-1 py-2 rounded-full text-sm font-medium transition-all",
                isRegister
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Register
            </button>
          </div>

          <div className="mb-5">
            <h2 className="font-serif text-2xl font-bold">
              {isRegister ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isRegister
                ? "Join Bali Haven to book your dream villa."
                : "Login to manage your bookings and access exclusive offers."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="a-name" className="mb-2 block">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="a-name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="a-email" className="mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="a-email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="a-password" className="mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="a-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("Password reset link would be sent to your email.")}
                  className="text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  {isRegister ? "Creating account..." : "Logging in..."}
                </>
              ) : (
                <>{isRegister ? "Create Account" : "Login"}</>
              )}
            </Button>
          </form>

          {/* Demo login */}
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Try a demo login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin(false)}
                disabled={loading}
                className="rounded-full text-xs"
              >
                As Guest
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin(true)}
                disabled={loading}
                className="rounded-full text-xs"
              >
                As Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
