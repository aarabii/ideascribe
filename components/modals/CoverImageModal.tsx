"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";

import { useCoverImage } from "@/hook/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

import { SingleImageDropzone } from "../SingleImageDropzone";

export const CoverImageModal = () => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.canvas.update);

  const [file, setFile] = useState<File>();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmiting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmiting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.canvasID as Id<"canvas">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
