"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { WelcomeMessage } from "../../_components/WelcomeMessage";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import {
  toastMsgLoading,
  toastMsgSuccess,
  toastMsgError,
} from "@/assets/toastMsg";
import { welcomeMessageArr, BtnTextArr } from "@/assets/textMsg";

export default function Canvas() {
  const user = useUser();
  const create = useMutation(api.canvas.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled Canvas",
    });

    toast.promise(promise, {
      loading:
        toastMsgLoading[Math.floor(Math.random() * toastMsgLoading.length)],
      success:
        toastMsgSuccess[Math.floor(Math.random() * toastMsgSuccess.length)],
      error: toastMsgError[Math.floor(Math.random() * toastMsgError.length)],
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 dark:bg-[#080402]">
      <h2 className="text-lg font-medium">
        <WelcomeMessage
          name={user.user?.firstName || "User"}
          message={
            welcomeMessageArr[
              Math.floor(Math.random() * welcomeMessageArr.length)
            ]
          }
        />
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        {BtnTextArr[Math.floor(Math.random() * BtnTextArr.length)]}
      </Button>
    </div>
  );
}
