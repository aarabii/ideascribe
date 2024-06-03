"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import React, { FC } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  toastMsgLoading,
  toastMsgSuccess,
  toastMsgError,
} from "@/assets/toastMsg";

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

interface ItemComponent extends FC<ItemProps> {
  Skeleton: FC<{ level?: number }>;
}

const Item: ItemComponent = ({
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
  const router = useRouter();
  const create = useMutation(api.canvas.create);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;

    const promise = create({ title: "New Canvas", parentCanvas: id }).then(
      (canvasId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/canvas/${canvasId}`);
      }
    );

    toast.promise(promise, {
      loading:
        toastMsgLoading[Math.floor(Math.random() * toastMsgLoading.length)],
      success:
        toastMsgSuccess[Math.floor(Math.random() * toastMsgSuccess.length)],
      error: toastMsgError[Math.floor(Math.random() * toastMsgError.length)],
    });
  };

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
          onClick={handleExpand}
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

      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="ml-auto flex items-center gap-x-2"
        >
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

const ItemSkeleton: FC<{ level?: number }> = ({ level }) => {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
    </div>
  );
};

Item.Skeleton = ItemSkeleton;

export { Item };
