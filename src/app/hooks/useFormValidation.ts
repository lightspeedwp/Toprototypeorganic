/**
 * useFormValidation Hook
 * 
 * Custom React hook for form validation with support for various field types.
 * Provides validation rules, error messages, and validation state management.
 * 
 * **Features:**
 * - Built-in validation rules (required, email, phone, min/max length)
 * - Custom validation functions
 * - Real-time and on-blur validation
 * - Error message management
 * - Form submission validation
 * - Field touch tracking
 * 
 * @module useFormValidation
 * @category hooks
 */

import { useState, useCallback, useMemo } from "react";

/**
 * Validation rule type.
 */
export type ValidationRule =
  | "required"
  | "email"
  | "phone"
  | "url"
  | "number"
  | "minLength"
  | "maxLength"
  | "min"
  | "max"
  | "pattern"
  | "custom";

/**
 * Field validation configuration.
 */
export interface FieldValidation {
  rules: Array<{
    type: ValidationRule;
    value?: any;
    message: string;
    validator?: (value: any) => boolean;
  }>;
}

/**
 * Form validation schema.
 */
export interface ValidationSchema {
  [fieldName: string]: FieldValidation;
}

/**
 * Form field errors.
 */
export interface FormErrors {
  [fieldName: string]: string | undefined;
}

/**
 * Form touched fields.
 */
export interface FormTouched {
  [fieldName: string]: boolean;
}

/**
 * Form validation state.
 */
export interface ValidationState {
  errors: FormErrors;
  touched: FormTouched;
  isValid: boolean;
  isValidating: boolean;
}

/**
 * useFormValidation Hook
 * 
 * @param {ValidationSchema} schema - Validation rules for form fields
 * @returns Validation state and methods
 * 
 * @example
 * ```tsx
 * const schema = {
 *   email: {
 *     rules: [
 *       { type: "required", message: "Email is required" },
 *       { type: "email", message: "Invalid email format" },
 *     ],
 *   },
 *   password: {
 *     rules: [
 *       { type: "required", message: "Password is required" },
 *       { type: "minLength", value: 8, message: "Min 8 characters" },
 *     ],
 *   },
 * };
 * 
 * const { errors, touched, validateField, validateForm, isValid } = useFormValidation(schema);
 * 
 * <input
 *   onChange={(e) => validateField("email", e.target.value)}
 *   onBlur={() => setFieldTouched("email")}
 * />
 * {touched.email && errors.email && <p>{errors.email}</p>}
 * ```
 */
export function useFormValidation(schema: ValidationSchema) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Built-in validators.
   */
  const validators = useMemo(
    () => ({
      required: (value: any): boolean => {
        if (typeof value === "string") return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return value !== null && value !== undefined;
      },

      email: (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },

      phone: (value: string): boolean => {
        // Basic phone validation (digits, spaces, dashes, parentheses, plus)
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        return phoneRegex.test(value) && value.replace(/\D/g, "").length >= 10;
      },

      url: (value: string): boolean => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },

      number: (value: any): boolean => {
        return !isNaN(Number(value));
      },

      minLength: (value: string, min: number): boolean => {
        return value.length >= min;
      },

      maxLength: (value: string, max: number): boolean => {
        return value.length <= max;
      },

      min: (value: number, min: number): boolean => {
        return Number(value) >= min;
      },

      max: (value: number, max: number): boolean => {
        return Number(value) <= max;
      },

      pattern: (value: string, pattern: RegExp): boolean => {
        return pattern.test(value);
      },
    }),
    []
  );

  /**
   * Validate a single field.
   */
  const validateField = useCallback(
    (fieldName: string, value: any): string | undefined => {
      const fieldSchema = schema[fieldName];
      if (!fieldSchema) return undefined;

      for (const rule of fieldSchema.rules) {
        let isValid = false;

        switch (rule.type) {
          case "required":
            isValid = validators.required(value);
            break;
          case "email":
            isValid = validators.email(value);
            break;
          case "phone":
            isValid = validators.phone(value);
            break;
          case "url":
            isValid = validators.url(value);
            break;
          case "number":
            isValid = validators.number(value);
            break;
          case "minLength":
            isValid = validators.minLength(value, rule.value);
            break;
          case "maxLength":
            isValid = validators.maxLength(value, rule.value);
            break;
          case "min":
            isValid = validators.min(value, rule.value);
            break;
          case "max":
            isValid = validators.max(value, rule.value);
            break;
          case "pattern":
            isValid = validators.pattern(value, rule.value);
            break;
          case "custom":
            if (rule.validator) {
              isValid = rule.validator(value);
            }
            break;
        }

        if (!isValid) {
          return rule.message;
        }
      }

      return undefined;
    },
    [schema, validators]
  );

  /**
   * Validate all fields in form data.
   */
  const validateForm = useCallback(
    (formData: Record<string, any>): { isValid: boolean; errors: FormErrors } => {
      setIsValidating(true);
      const newErrors: FormErrors = {};

      Object.keys(schema).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      setErrors(newErrors);
      setIsValidating(false);

      return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
      };
    },
    [schema, validateField]
  );

  /**
   * Set field error manually.
   */
  const setFieldError = useCallback((fieldName: string, error: string | undefined) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  /**
   * Clear field error.
   */
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Clear all errors.
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Mark field as touched.
   */
  const setFieldTouched = useCallback((fieldName: string, isTouched = true) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: isTouched,
    }));
  }, []);

  /**
   * Mark all fields as touched.
   */
  const setAllTouched = useCallback(() => {
    const allTouched: FormTouched = {};
    Object.keys(schema).forEach((fieldName) => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
  }, [schema]);

  /**
   * Reset touched state.
   */
  const resetTouched = useCallback(() => {
    setTouched({});
  }, []);

  /**
   * Check if form is valid (no errors).
   */
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  /**
   * Get error for a field (only if touched).
   */
  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return touched[fieldName] ? errors[fieldName] : undefined;
    },
    [errors, touched]
  );

  /**
   * Handle field change with validation.
   */
  const handleFieldChange = useCallback(
    (fieldName: string, value: any, validateOnChange = true) => {
      if (validateOnChange) {
        const error = validateField(fieldName, value);
        setFieldError(fieldName, error);
      }
      
      // Mark as touched on change (optional)
      setFieldTouched(fieldName, true);
    },
    [validateField, setFieldError, setFieldTouched]
  );

  /**
   * Handle field blur with validation.
   */
  const handleFieldBlur = useCallback(
    (fieldName: string, value: any) => {
      setFieldTouched(fieldName, true);
      const error = validateField(fieldName, value);
      setFieldError(fieldName, error);
    },
    [validateField, setFieldError, setFieldTouched]
  );

  return {
    // State
    errors,
    touched,
    isValid,
    isValidating,

    // Validation methods
    validateField,
    validateForm,

    // Error management
    setFieldError,
    clearFieldError,
    clearErrors,
    getFieldError,

    // Touch management
    setFieldTouched,
    setAllTouched,
    resetTouched,

    // Event handlers
    handleFieldChange,
    handleFieldBlur,
  };
}

/**
 * Common validation schemas for reuse.
 */
export const commonValidations = {
  email: {
    rules: [
      { type: "required" as ValidationRule, message: "Email is required" },
      { type: "email" as ValidationRule, message: "Please enter a valid email address" },
    ],
  },
  
  password: {
    rules: [
      { type: "required" as ValidationRule, message: "Password is required" },
      { type: "minLength" as ValidationRule, value: 8, message: "Password must be at least 8 characters" },
    ],
  },
  
  phone: {
    rules: [
      { type: "required" as ValidationRule, message: "Phone number is required" },
      { type: "phone" as ValidationRule, message: "Please enter a valid phone number" },
    ],
  },
  
  name: {
    rules: [
      { type: "required" as ValidationRule, message: "Name is required" },
      { type: "minLength" as ValidationRule, value: 2, message: "Name must be at least 2 characters" },
    ],
  },
  
  url: {
    rules: [
      { type: "url" as ValidationRule, message: "Please enter a valid URL" },
    ],
  },
  
  number: {
    rules: [
      { type: "required" as ValidationRule, message: "This field is required" },
      { type: "number" as ValidationRule, message: "Please enter a valid number" },
    ],
  },
};

export default useFormValidation;
