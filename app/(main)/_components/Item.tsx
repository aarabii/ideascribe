"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { FC } from "react";

interface ItemProps {
  id?: Id<"canvas">;
  canvasIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick: () => void;
  label: string;
  icon: LucideIcon;
}

export const Item: FC<ItemProps> = ({
  id,
  canvasIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  onClick,
  label,
  icon: Icon,
}) => {
  const ChIcon = expanded ? ChevronDown : ChevronRight;
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          onClick={() => {}}
        >
          <ChIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {canvasIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{canvasIcon}</div>
      ) : (
        <Icon className="h-[18px] mr-2 shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span> +{" "}
          <kbd className="text-xs">K</kbd>
        </kbd>
      )}
    </div>
  );
};
