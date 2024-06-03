"use client";

import { Fragment, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface CanvasListProps {
  parentCanvasId: Id<"canvas">;
  level?: number;
  data?: Doc<"canvas">;
}

export const CanvasList = ({ parentCanvasId, level = 0 }: CanvasListProps) => {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (ID: string) => {
    setExpanded((prev) => ({ ...prev, [ID]: !prev[ID] }));
  };

  const canvas = useQuery(api.canvas.getSidebar, {
    parentCanvas: parentCanvasId,
  });

  const onRedirect = (ID: string) => {
    router.push(`/canvas/${ID}`);
  };

  if (canvas === undefined) {
    return (
      <Fragment>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <Fragment>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </Fragment>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No canvas found...
      </p>
      {canvas.map((c) => (
        <div key={c._id}>
          <Item
            id={c._id}
            onClick={() => onRedirect(c._id)}
            label={c.title || "Untitled"}
            icon={FileIcon}
            canvasIcon={c.icon}
            active={params.canvasId === c._id}
            level={level}
            onExpand={() => onExpand(c._id)}
            expanded={expanded[c._id]}
          />
          {expanded[c._id] && (
            <CanvasList parentCanvasId={c._id} level={level + 1} data={c} />
          )}
        </div>
      ))}
    </Fragment>
  );
};
