
// Form and layout component types
import type { ReactNode } from 'react';

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export interface FormFieldGroupProps {
  children: ReactNode;
  className?: string;
}

export interface FormFieldErrorProps {
  error?: string;
  children: ReactNode;
}

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export interface RadioGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export interface FileUploadProps {
  label?: string;
  value?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

// Navigation component types
export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export interface NavbarProps {
  brand: string;
  links: { label: string; href: string; icon?: ReactNode }[];
  className?: string;
}

// Layout component types
export interface GridProps {
  columns?: number;
  gap?: string;
  children: ReactNode;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

// Animation
export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Text content
export interface SectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

