"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/Toolbar";

interface CanvasPageProps {
  params: {
    canvasID: Id<"canvas">;
  };
}

export default function CanvasPage({ params }: CanvasPageProps) {
  const canvas = useQuery(api.canvas.getById, {
    id: params.canvasID,
  });

  if (canvas === undefined) {
    return <div>Loading...</div>;
  }

  if (canvas === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={canvas} />
      </div>
    </div>
  );
}
