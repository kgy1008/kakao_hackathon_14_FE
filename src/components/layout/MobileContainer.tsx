"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function MobileContainer({
  children,
  className,
  noPadding = false,
}: MobileContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[450px] mx-auto min-h-screen bg-gradient-to-b from-zinc-50 to-white",
        !noPadding && "px-5 pt-4 pb-20",
        className
      )}
    >
      {children}
    </div>
  );
}
