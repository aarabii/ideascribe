import Image from "next/image";
import { useParams } from "next/navigation";

import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";

import { cn } from "@/lib/utils";

import { useCoverImage } from "@/hook/useCoverImage";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const removeImage = useMutation(api.canvas.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
    removeImage({
      id: params.canvasID as Id<"canvas">,
    });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group bg-neutral-200 dark:bg-[#080402]", // bg-gray-200 will fill any extra space with a blank color
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover Image"
          className="object-cover"
          style={{ objectFit: "cover" }} // Ensures the image covers the area
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
