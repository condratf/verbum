import { FC, InputHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const searchInputVariants = cva(
  'flex items-center rounded-full border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-sm/0 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200 transition-colors',
  {
    variants: {
      size: {
        sm: 'h-8 gap-1 text-xs',
        md: 'h-10 gap-2 text-sm',
        lg: 'h-11 gap-2.5 text-sm',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: true,
    },
  }
)

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof searchInputVariants> & {
    className?: string
    inputClassName?: string
  }

export const SearchInput: FC<SearchInputProps> = ({
  className,
  inputClassName,
  size,
  fullWidth,
  type = 'search',
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <div className={cn(searchInputVariants({ size, fullWidth }), className)}>
      <span className="flex items-center justify-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.5 20.5 19 15.5 14zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"
            fill="currentColor"
          />
        </svg>
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'ml-2 flex-1 border-none bg-transparent outline-none placeholder:text-gray-400',
          inputClassName
        )}
        {...props}
      />
    </div>
  )
}
