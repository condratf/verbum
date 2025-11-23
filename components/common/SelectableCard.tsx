import React, { FC } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

interface SelectableCardProps {
    title: string;
    description: string;
    total?: number;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
}

const selectableCardVariants = cva(
  'flex w-full items-stretch gap-4 rounded-xl border bg-white px-7 py-5 text-left shadow-sm transition-colors cursor-pointer',
  {
    variants: {
      selected: {
        true: 'border-sky-500 bg-sky-50',
        false: 'border-slate-200 hover:border-slate-300',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

const indicatorVariants = cva(
  'w-1 rounded-full transition-colors',
  {
    variants: {
      selected: {
        true: 'bg-sky-600',
        false: 'bg-slate-200',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export const SelectableCard: FC<SelectableCardProps> = ({
  title,
  description,
  total,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(selectableCardVariants({ selected: isSelected }))}
    >
      <div className={cn(indicatorVariants({ selected: isSelected }))} />
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-lg">
            {icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">{title}</span>
            <span className="text-xs text-slate-500">{description}</span>
          </div>
        </div>
        {total && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-900">{total}</span>
            <span className="text-xs text-slate-500">Total</span>
          </div>
        )}
      </div>
    </button>
  )
}
