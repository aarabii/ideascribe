"use client";

import { useQuery, useMutation } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";

interface CanvasPageProps {
  params: {
    canvasID: Id<"canvas">;
  };
}

export default function CanvasPage({ params }: CanvasPageProps) {
  const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

  const canvas = useQuery(api.canvas.getById, {
    id: params.canvasID,
  });

  const update = useMutation(api.canvas.update);

  const onChange = (value: string) => {
    update({
      id: params.canvasID,
      content: value,
    });
  };

  if (canvas === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );
  }

  if (canvas === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={canvas.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={canvas} />
        <Editor initialData={canvas} />
      </div>
    </div>
  );
}
