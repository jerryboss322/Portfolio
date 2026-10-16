
// Form and layout component types
import type { ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode } from 'react';
// Badge
export interface BadgeProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'pending';
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  variant?: string;
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | string;
  variant?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface DataTableColumn {
  header: string;
  accessor: string;
}

export type TableRow = Record<string, string | number | boolean | null | undefined>;

export interface DataTableProps {
  columns: DataTableColumn[];
  data: TableRow[];
  pageSize?: number;
  currentPage?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  filter?: string;
  className?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  children?: ReactNode;
  size?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  size?: string;
  variant?: string;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export interface SpinnerProps {
  size?: string;
  className?: string;
  label?: string;
}

export interface ToastProps {
  message: ReactNode;
  size?: string;
  type?: 'success' | 'error' | 'warning' | 'info' | string;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  color: string;
}

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

