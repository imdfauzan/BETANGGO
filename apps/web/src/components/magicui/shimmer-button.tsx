import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "9999px",
      background = "var(--primary)",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/25 px-6 py-3 font-semibold text-[var(--on-primary)] [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-all duration-300 ease-in-out active:scale-98 select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed shadow-md",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "[container-type:size] absolute inset-0 overflow-visible"
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Children slot with icon alignment */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>

        {/* Highlight inner glow */}
        <div
          className={cn(
            "insert-0 absolute size-full pointer-events-none",
            "rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium shadow-[inset_0_-6px_10px_rgba(255,255,255,0.2)]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_12px_rgba(255,255,255,0.35)]",
            "group-active:shadow-[inset_0_-10px_14px_rgba(255,255,255,0.35)]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
