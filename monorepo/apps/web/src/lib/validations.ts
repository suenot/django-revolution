import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email({ message: 'Please enter a valid email address' })
        .max(254, 'Email is too long'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form validation schema
export const registerSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(150, 'Username must be less than 150 characters')
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    email: z.string()
        .min(1, 'Email is required')
        .email({ message: 'Please enter a valid email address' })
        .max(254, 'Email is too long'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password is too long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
        }),
    password_confirm: z.string()
        .min(1, 'Please confirm your password'),
    first_name: z.string()
        .min(1, 'First name is required')
        .max(150, 'First name is too long'),
    last_name: z.string()
        .min(1, 'Last name is required')
        .max(150, 'Last name is too long'),
}).refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Profile update validation schema
export const profileUpdateSchema = z.object({
    first_name: z.string()
        .min(1, 'First name is required')
        .max(150, 'First name must be less than 150 characters'),
    last_name: z.string()
        .min(1, 'Last name is required')
        .max(150, 'Last name must be less than 150 characters'),
    email: z.string()
        .min(1, 'Email is required')
        .email({ message: 'Please enter a valid email address' }),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>; 