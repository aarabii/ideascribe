"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";

import { ConfirmModal } from "@/components/modals/ConfirmModal";

import {
  toastMsgDeleteLoading,
  toastMsgDeleteSuccess,
  toastMsgDeleteError,
  toastMsgRestoreLoading,
  toastMsgRestoreSuccess,
  toastMsgRestoreError,
} from "@/assets/toastMsg";

interface BannerProps {
  canvasId: Id<"canvas">;
}

export const Banner = ({ canvasId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.canvas.remove);
  const restore = useMutation(api.canvas.restore);

  const onRemove = async () => {
    const promise = remove({ id: canvasId });

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

  const onRestore = async () => {
    const promise = restore({ id: canvasId });

    toast.promise(promise, {
      loading:
        toastMsgRestoreLoading[
          Math.floor(Math.random() * toastMsgRestoreLoading.length)
        ],
      success:
        toastMsgRestoreSuccess[
          Math.floor(Math.random() * toastMsgRestoreSuccess.length)
        ],
      error:
        toastMsgRestoreError[
          Math.floor(Math.random() * toastMsgRestoreError.length)
        ],
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-slate-50 flex items-center gap-x-2 justify-center">
      <p className="line-clamp-1">This canvas is currently in Trash.</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRestore}
        className="border-slate-50 bg-transparent hover:bg-primary/5 text-slate-50 hover:text-slate-50 p-1 px-2 h-auto font-normal"
      >
        Restore canvas
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-slate-50 bg-transparent hover:bg-primary/5 text-slate-50 hover:text-slate-50 p-1 px-2 h-auto font-normal"
        >
          Remove forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
