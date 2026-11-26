"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  size = "md",
  showValue = true,
  reviewCount,
  className,
}: RatingStarsProps) {
  const sizes = {
    sm: { star: "w-3 h-3", text: "text-xs" },
    md: { star: "w-4 h-4", text: "text-sm" },
    lg: { star: "w-5 h-5", text: "text-base" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - (i - 1)));
          return (
            <div key={i} className="relative">
              <Star className={cn(s.star, "text-muted")} fill="currentColor" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={cn(s.star, "text-gold")}
                  fill="currentColor"
                />
              </div>
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-medium", s.text)}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", s.text)}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
