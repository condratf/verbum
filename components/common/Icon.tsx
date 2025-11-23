"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  color?: string;
  size?: number;
  "aria-label"?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  fill = 0,
  weight = 400,
  color = "",
  size = 16,
  "aria-label": ariaLabel,
  className,
  ...props
}) => {
  const fontVariationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`;

  return (
    <span
      className={cn("material-symbols-outlined", color, className)}
      style={{ fontVariationSettings, fontSize: size }}
      aria-hidden={ariaLabel ? false : true}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </span>
  );
};

Icon.displayName = "Icon";

