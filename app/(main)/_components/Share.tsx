"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";

import { useOrigin } from "@/hook/useOrigin";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  toastMsgShareSuccess,
  toastMsgShareLoading,
  toastMsgShareError,
  toastMsgUnshareLoading,
  toastMsgUnshareSuccess,
  toastMsgUnshareError,
} from "@/assets/toastMsg";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface ShareProps {
  initialData: Doc<"canvas">;
}

export const Share = ({ initialData }: ShareProps) => {
  const origin = useOrigin();
  const update = useMutation(api.canvas.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shareUrl = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading:
        toastMsgShareLoading[
          Math.floor(Math.random() * toastMsgShareLoading.length)
        ],
      success:
        toastMsgShareSuccess[
          Math.floor(Math.random() * toastMsgShareSuccess.length)
        ],
      error:
        toastMsgShareError[
          Math.floor(Math.random() * toastMsgShareError.length)
        ],
    });
  };

  const unPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading:
        toastMsgUnshareLoading[
          Math.floor(Math.random() * toastMsgUnshareLoading.length)
        ],
      success:
        toastMsgUnshareSuccess[
          Math.floor(Math.random() * toastMsgUnshareSuccess.length)
        ],
      error:
        toastMsgUnshareError[
          Math.floor(Math.random() * toastMsgUnshareError.length)
        ],
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          Share
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <span className="text-sm font-medium text-sky-500">
                Canvas is being shared
              </span>
            </div>
            <div className="flex items-center">
              <input
                value={shareUrl}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                className="rounded-l-none h-8"
                disabled={copied}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={unPublish}
            >
              <span className="text-xs">Unshare</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-8 text-muted-foreground h-8 mb-2 " />
            <p className="text-sm font-medium mb-2">
              Share your work with the world
            </p>
            <span className="text-xs mb-4 text-center">
              Share your canvas with anyone by copying the link below and
              sending it to them.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Share
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
