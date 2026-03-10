/**
 * Advanced Form Validation
 * 
 * Comprehensive form validation with type-safe rules, async validation,
 * and real-time feedback.
 * 
 * @module formValidation
 * @category utils
 */

/**
 * Validation rule result.
 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Validation rule function.
 */
export type ValidationRule<T = any> = (
  value: T,
  formData?: Record<string, any>
) => ValidationResult | Promise<ValidationResult>;

/**
 * Field validation configuration.
 */
export interface FieldValidation {
  required?: boolean | string;
  minLength?: number | { value: number; message?: string };
  maxLength?: number | { value: number; message?: string };
  min?: number | { value: number; message?: string };
  max?: number | { value: number; message?: string };
  pattern?: RegExp | { value: RegExp; message?: string };
  email?: boolean | string;
  url?: boolean | string;
  custom?: ValidationRule | ValidationRule[];
  async?: boolean;
}

/**
 * Form validation schema.
 */
export type ValidationSchema = Record<string, FieldValidation>;

/**
 * Validation errors.
 */
export type ValidationErrors = Record<string, string[]>;

/**
 * Validate required field.
 */
function validateRequired(value: any, message?: string): ValidationResult {
  const isValid = value !== null && value !== undefined && value !== '';
  
  return {
    valid: isValid,
    message: isValid ? undefined : message || 'This field is required',
  };
}

/**
 * Validate minimum length.
 */
function validateMinLength(
  value: string,
  minLength: number,
  message?: string
): ValidationResult {
  const isValid = value.length >= minLength;
  
  return {
    valid: isValid,
    message: isValid
      ? undefined
      : message || `Must be at least ${minLength} characters`,
  };
}

/**
 * Validate maximum length.
 */
function validateMaxLength(
  value: string,
  maxLength: number,
  message?: string
): ValidationResult {
  const isValid = value.length <= maxLength;
  
  return {
    valid: isValid,
    message: isValid
      ? undefined
      : message || `Must be at most ${maxLength} characters`,
  };
}

/**
 * Validate minimum value.
 */
function validateMin(
  value: number,
  min: number,
  message?: string
): ValidationResult {
  const isValid = value >= min;
  
  return {
    valid: isValid,
    message: isValid ? undefined : message || `Must be at least ${min}`,
  };
}

/**
 * Validate maximum value.
 */
function validateMax(
  value: number,
  max: number,
  message?: string
): ValidationResult {
  const isValid = value <= max;
  
  return {
    valid: isValid,
    message: isValid ? undefined : message || `Must be at most ${max}`,
  };
}

/**
 * Validate pattern.
 */
function validatePattern(
  value: string,
  pattern: RegExp,
  message?: string
): ValidationResult {
  const isValid = pattern.test(value);
  
  return {
    valid: isValid,
    message: isValid ? undefined : message || 'Invalid format',
  };
}

/**
 * Validate email.
 */
function validateEmail(value: string, message?: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  
  return {
    valid: isValid,
    message: isValid ? undefined : message || 'Invalid email address',
  };
}

/**
 * Validate URL.
 */
function validateUrl(value: string, message?: string): ValidationResult {
  try {
    new URL(value);
    return { valid: true };
  } catch {
    return {
      valid: false,
      message: message || 'Invalid URL',
    };
  }
}

/**
 * Validate single field.
 * 
 * @param value - Field value
 * @param rules - Validation rules
 * @param formData - Complete form data (for cross-field validation)
 * @returns Validation errors
 * 
 * @example
 * ```tsx
 * const errors = await validateField('test@email.com', {
 *   required: true,
 *   email: true,
 * });
 * ```
 */
export async function validateField(
  value: any,
  rules: FieldValidation,
  formData?: Record<string, any>
): Promise<string[]> {
  const errors: string[] = [];

  // Required validation
  if (rules.required) {
    const message = typeof rules.required === 'string' ? rules.required : undefined;
    const result = validateRequired(value, message);
    if (!result.valid && result.message) {
      errors.push(result.message);
      return errors; // Stop if required fails
    }
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return errors;
  }

  // String length validations
  if (typeof value === 'string') {
    if (rules.minLength) {
      const config = typeof rules.minLength === 'number'
        ? { value: rules.minLength }
        : rules.minLength;
      const result = validateMinLength(value, config.value, config.message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }

    if (rules.maxLength) {
      const config = typeof rules.maxLength === 'number'
        ? { value: rules.maxLength }
        : rules.maxLength;
      const result = validateMaxLength(value, config.value, config.message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }

    if (rules.pattern) {
      const config = rules.pattern instanceof RegExp
        ? { value: rules.pattern }
        : rules.pattern;
      const result = validatePattern(value, config.value, config.message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }

    if (rules.email) {
      const message = typeof rules.email === 'string' ? rules.email : undefined;
      const result = validateEmail(value, message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }

    if (rules.url) {
      const message = typeof rules.url === 'string' ? rules.url : undefined;
      const result = validateUrl(value, message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined) {
      const config = typeof rules.min === 'number'
        ? { value: rules.min }
        : rules.min;
      const result = validateMin(value, config.value, config.message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }

    if (rules.max !== undefined) {
      const config = typeof rules.max === 'number'
        ? { value: rules.max }
        : rules.max;
      const result = validateMax(value, config.value, config.message);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }
  }

  // Custom validations
  if (rules.custom) {
    const customRules = Array.isArray(rules.custom) ? rules.custom : [rules.custom];
    
    for (const rule of customRules) {
      const result = await rule(value, formData);
      if (!result.valid && result.message) {
        errors.push(result.message);
      }
    }
  }

  return errors;
}

/**
 * Validate entire form.
 * 
 * @param formData - Form data
 * @param schema - Validation schema
 * @returns Validation errors
 * 
 * @example
 * ```tsx
 * const schema = {
 *   email: { required: true, email: true },
 *   password: { required: true, minLength: 8 },
 *   confirmPassword: {
 *     required: true,
 *     custom: (value, data) => ({
 *       valid: value === data.password,
 *       message: 'Passwords must match',
 *     }),
 *   },
 * };
 * 
 * const errors = await validateForm(formData, schema);
 * ```
 */
export async function validateForm(
  formData: Record<string, any>,
  schema: ValidationSchema
): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const fieldErrors = await validateField(formData[field], rules, formData);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return errors;
}

/**
 * Check if form is valid.
 * 
 * @param errors - Validation errors
 * @returns True if no errors
 * 
 * @example
 * ```tsx
 * const errors = await validateForm(formData, schema);
 * const isValid = isFormValid(errors);
 * ```
 */
export function isFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Pre-built validation rules.
 */
export const validators = {
  /**
   * Email validation.
   */
  email: (message?: string): FieldValidation => ({
    required: true,
    email: message || 'Invalid email address',
  }),

  /**
   * Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number).
   */
  password: (message?: string): FieldValidation => ({
    required: true,
    minLength: 8,
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: message || 'Password must contain uppercase, lowercase, and number',
    },
  }),

  /**
   * Phone validation (international format).
   */
  phone: (message?: string): FieldValidation => ({
    required: true,
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/,
      message: message || 'Invalid phone number',
    },
  }),

  /**
   * URL validation.
   */
  url: (message?: string): FieldValidation => ({
    required: true,
    url: message || 'Invalid URL',
  }),

  /**
   * Date validation (future date).
   */
  futureDate: (message?: string): FieldValidation => ({
    required: true,
    custom: (value: string): ValidationResult => {
      const date = new Date(value);
      const isValid = date > new Date();
      return {
        valid: isValid,
        message: isValid ? undefined : message || 'Date must be in the future',
      };
    },
  }),

  /**
   * Date validation (past date).
   */
  pastDate: (message?: string): FieldValidation => ({
    required: true,
    custom: (value: string): ValidationResult => {
      const date = new Date(value);
      const isValid = date < new Date();
      return {
        valid: isValid,
        message: isValid ? undefined : message || 'Date must be in the past',
      };
    },
  }),

  /**
   * Credit card validation (Luhn algorithm).
   */
  creditCard: (message?: string): FieldValidation => ({
    required: true,
    custom: (value: string): ValidationResult => {
      const cleaned = value.replace(/\s/g, '');
      if (!/^\d+$/.test(cleaned)) {
        return { valid: false, message: message || 'Invalid credit card number' };
      }

      let sum = 0;
      let shouldDouble = false;

      for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      const isValid = sum % 10 === 0;
      return {
        valid: isValid,
        message: isValid ? undefined : message || 'Invalid credit card number',
      };
    },
  }),

  /**
   * Confirmation field (matches another field).
   */
  confirmation: (fieldName: string, message?: string): FieldValidation => ({
    required: true,
    custom: (value: any, formData?: Record<string, any>): ValidationResult => {
      const isValid = value === formData?.[fieldName];
      return {
        valid: isValid,
        message: isValid
          ? undefined
          : message || `Must match ${fieldName}`,
      };
    },
  }),

  /**
   * Min/max range validation.
   */
  range: (
    min: number,
    max: number,
    message?: string
  ): FieldValidation => ({
    required: true,
    min: { value: min, message },
    max: { value: max, message },
  }),
};

/**
 * Debounced field validation (for real-time validation).
 * 
 * @param delay - Debounce delay in ms
 * @returns Debounced validation function
 * 
 * @example
 * ```tsx
 * const debouncedValidate = debounceValidation(500);
 * 
 * // In onChange handler
 * const errors = await debouncedValidate(value, rules);
 * ```
 */
export function debounceValidation(delay: number = 300) {
  let timeoutId: NodeJS.Timeout;

  return async function (
    value: any,
    rules: FieldValidation,
    formData?: Record<string, any>
  ): Promise<string[]> {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(async () => {
        const errors = await validateField(value, rules, formData);
        resolve(errors);
      }, delay);
    });
  };
}
