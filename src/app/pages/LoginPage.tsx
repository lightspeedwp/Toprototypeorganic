/**
 * Login Page - User Authentication
 * 
 * A comprehensive login page with email/password authentication,
 * social login options, and password recovery.
 * 
 * **WordPress Mapping:**
 * - Template: page-login.php
 * - Template hierarchy: page-login.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Login introduction
 * 2. Login Form - Email/password input
 * 3. Social Login - OAuth providers
 * 4. Links - Register, Forgot Password
 * 
 * **Features:**
 * - Email/password login
 * - Social login (Google, Facebook, Apple)
 * - Remember me checkbox
 * - Password visibility toggle
 * - Form validation
 * - Error handling
 * - Mobile-responsive
 * 
 * @module LoginPage
 * @category pages
 * @wordpressTemplate page-login.php
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { EnvelopeSimple as Mail, LockKey as Lock, Eye, EyeClosed as EyeOff, WarningCircle as AlertCircle, CheckCircle as CircleCheck } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Login page props.
 */
interface LoginPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Login Page Component.
 */
export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  /**
   * Validate form.
   */
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success("Login successful! Welcome back.");
    
    // Navigate to account dashboard or previous page
    nav("/profile");
  };

  /**
   * Handle social login.
   */
  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login - Feature coming soon`);
    // In real app, would trigger OAuth flow
  };

  return (
    <>
      {/* ================================================================
          HERO - Login introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="mb-4">Welcome Back</h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your account to manage bookings and access exclusive features
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          LOGIN FORM - Main authentication form
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="mb-2 block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="john.doe@example.com"
                      className={cn(
                        "w-full pl-11 pr-4 py-3 rounded-md",
                        "bg-input-background border-2",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-colors",
                        errors.email
                          ? "border-destructive focus:border-destructive"
                          : "border-border"
                      )}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="mb-2 block">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      placeholder="Enter your password"
                      className={cn(
                        "w-full pl-11 pr-12 py-3 rounded-md",
                        "bg-input-background border-2",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-colors",
                        errors.password
                          ? "border-destructive focus:border-destructive"
                          : "border-border"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => nav("/forgot-password")}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md",
                    "bg-primary text-primary-foreground font-medium",
                    "hover:bg-primary/90 transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-md",
                    "bg-card border border-border text-foreground",
                    "hover:bg-accent transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("Apple")}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-md",
                    "bg-card border border-border text-foreground",
                    "hover:bg-accent transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => nav("/register")}
                  className="text-primary hover:underline font-medium"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          BENEFITS - Why create an account
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Benefits of Having an Account</h2>
              <p className="text-lg text-muted-foreground">
                Unlock exclusive features and make booking easier
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CircleCheck,
                  title: "Quick Booking",
                  description: "Save time with pre-filled passenger details and payment methods",
                },
                {
                  icon: CircleCheck,
                  title: "Booking History",
                  description: "Access all your past and upcoming bookings in one place",
                },
                {
                  icon: CircleCheck,
                  title: "Exclusive Deals",
                  description: "Get early access to special offers and member-only discounts",
                },
                {
                  icon: CircleCheck,
                  title: "Saved Preferences",
                  description: "Store dietary requirements and special needs for faster booking",
                },
                {
                  icon: CircleCheck,
                  title: "Wishlist",
                  description: "Save your favorite tours and get notified of price drops",
                },
                {
                  icon: CircleCheck,
                  title: "Priority Support",
                  description: "Get faster responses from our customer support team",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}