"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

import {
  toastMsgDeleteSuccess,
  toastMsgDeleteLoading,
  toastMsgDeleteError,
} from "@/assets/toastMsg";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  canvasId: Id<"canvas">;
}

export const Menu = ({ canvasId }: MenuProps) => {
  const router = useRouter();
  const user = useUser();

  const archive = useMutation(api.canvas.archive);

  const onArchive = async () => {
    const promise = archive({ id: canvasId });

    toast.promise(promise, {
      loading:
        toastMsgDeleteLoading[
          Math.floor(Math.random() * toastMsgDeleteLoading.length)
        ],
      success:
        toastMsgDeleteSuccess[
          Math.floor(Math.random() * toastMsgDeleteSuccess.length)
        ],
      error:
        toastMsgDeleteError[
          Math.floor(Math.random() * toastMsgDeleteError.length)
        ],
    });

    router.push("/canvas");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 items-start p-0"
        align="end"
        alignOffset={8}
        // forceMount
      >
        <DropdownMenuItem
          className="w-full flex items-center"
          onClick={onArchive}
        >
          <Trash2 className="w-4 h-4 mr-2 text-red-500" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by:{" "}
          <strong className="text-primary">{user.user?.fullName}</strong>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="w-10 h-10" />;
};
