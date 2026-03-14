/**
 * Register Page - User Registration
 * 
 * A comprehensive registration page with email/password signup,
 * validation, and account creation.
 * 
 * **WordPress Mapping:**
 * - Template: page-register.php
 * - Template hierarchy: page-register.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Registration introduction
 * 2. Registration Form - User details input
 * 3. Social Registration - OAuth providers
 * 4. Links - Login, Privacy Policy, Terms
 * 
 * **Features:**
 * - Email/password registration
 * - Password strength indicator
 * - Confirm password validation
 * - Terms acceptance checkbox
 * - Newsletter subscription option
 * - Social registration
 * - Form validation
 * 
 * @module RegisterPage
 * @category pages
 * @wordpressTemplate page-register.php
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { User, EnvelopeSimple as Mail, LockKey as Lock, Eye, EyeClosed as EyeOff, WarningCircle as AlertCircle, CheckCircle as CircleCheck, Shield } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Register page props.
 */
interface RegisterPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Password strength type.
 */
type PasswordStrength = "weak" | "medium" | "strong";

/**
 * Register Page Component.
 */
export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Calculate password strength.
   */
  const getPasswordStrength = (password: string): PasswordStrength => {
    if (password.length < 6) return "weak";
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength >= 3) return "strong";
    if (strength >= 2) return "medium";
    return "weak";
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  /**
   * Get password strength color.
   */
  const getStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
      case "weak":
        return "bg-destructive";
      case "medium":
        return "bg-accent";
      case "strong":
        return "bg-primary";
    }
  };

  /**
   * Validate form.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (getPasswordStrength(formData.password) === "weak") {
      newErrors.password = "Password is too weak";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
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
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast.success("Account created successfully! Welcome aboard.");
    
    // Navigate to profile or onboarding
    nav("/profile");
  };

  /**
   * Handle social registration.
   */
  const handleSocialRegister = (provider: string) => {
    toast.info(`${provider} registration - Feature coming soon`);
  };

  /**
   * Update form field.
   */
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <>
      {/* ================================================================
          HERO - Registration introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-md text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1>Create Your Account</h1>
            <p className="text-lg text-muted-foreground">
              Join thousands of travelers and unlock exclusive benefits
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          REGISTRATION FORM - Main form
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          <div className="max-w-md">
            {/* Registration Card */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="block">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="John"
                      className={cn(
                        "w-full px-4 py-3 rounded-md",
                        "bg-input-background border-2",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-colors",
                        errors.firstName
                          ? "border-destructive focus:border-destructive"
                          : "border-border"
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="block">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder="Doe"
                      className={cn(
                        "w-full px-4 py-3 rounded-md",
                        "bg-input-background border-2",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-colors",
                        errors.lastName
                          ? "border-destructive focus:border-destructive"
                          : "border-border"
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
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
                    <div className="flex items-center gap-1.5 pt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="block">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="Create a strong password"
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && passwordStrength && (
                    <div className="pt-2 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-300",
                              getStrengthColor(passwordStrength),
                              passwordStrength === "weak"
                                ? "w-1/3"
                                : passwordStrength === "medium"
                                ? "w-2/3"
                                : "w-full"
                            )}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground capitalize">
                          {passwordStrength}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use 8+ characters with a mix of letters, numbers & symbols
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <div className="flex items-center gap-1.5 pt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="block">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      placeholder="Re-enter your password"
                      className={cn(
                        "w-full pl-11 pr-12 py-3 rounded-md",
                        "bg-input-background border-2",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-colors",
                        errors.confirmPassword
                          ? "border-destructive focus:border-destructive"
                          : formData.confirmPassword &&
                            formData.password === formData.confirmPassword
                          ? "border-primary"
                          : "border-border"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1.5 pt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword &&
                    !errors.confirmPassword && (
                      <div className="flex items-center gap-1.5 pt-2 text-sm text-primary">
                        <CircleCheck className="w-4 h-4 flex-shrink-0" />
                        <span>Passwords match</span>
                      </div>
                    )}
                </div>

                {/* Newsletter Subscription */}
                <div className="flex items-start gap-3">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="translate-y-1 w-4 h-4 rounded border-border text-primary focus:ring-ring"
                  />
                  <label htmlFor="newsletter" className="text-sm cursor-pointer flex-1">
                    <span className="font-medium">Subscribe to our newsletter</span>
                    <p className="text-muted-foreground pt-0.5">
                      Get travel tips, exclusive deals, and tour updates
                    </p>
                  </label>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (errors.terms) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.terms;
                            return newErrors;
                          });
                        }
                      }}
                      className="translate-y-1 w-4 h-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer flex-1">
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => nav("/terms-conditions")}
                        className="text-primary hover:underline"
                      >
                        Terms & Conditions
                      </button>
                      {" "}and{" "}
                      <button
                        type="button"
                        onClick={() => nav("/privacy-policy")}
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                  {errors.terms && (
                    <div className="flex items-center gap-1.5 pt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.terms}</span>
                    </div>
                  )}
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
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or register with</span>
                </div>
              </div>

              {/* Social Registration Buttons */}
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialRegister("Google")}
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
                  onClick={() => handleSocialRegister("Apple")}
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

            {/* Login Link */}
            <div className="pt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => nav("/login")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECURITY NOTICE - Privacy & security information
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-3xl bg-card border border-border rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="pb-3">Your Privacy is Protected</h3>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 translate-y-0.5" />
                    <span>
                      Your personal information is encrypted and stored securely
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 translate-y-0.5" />
                    <span>
                      We'll never share your data with third parties without your consent
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 translate-y-0.5" />
                    <span>
                      You can update or delete your account at any time
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 translate-y-0.5" />
                    <span>
                      We're GDPR compliant and follow industry best practices
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}