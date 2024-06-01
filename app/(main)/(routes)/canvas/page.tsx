"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";

export default function Canvas() {
  const user = useUser();
  const create = useMutation(api.canvas.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled Canvas",
    });

    toast.promise(promise, {
      loading: "Creating Canvas...",
      success: "Canvas Created!",
      error: "Failed to Create Canvas",
    });
  };

  const welcomeMessageArr = [
    `Hello ${user.user?.firstName}, welcome to your Canvas! Unleash your creativity with Ideascribe.`,
    `Welcome to ${user.user?.firstName}'s Ideascribe Canvas! Where your ideas come to life.`,
    `Welcome to ${user.user?.firstName}'s Canvas on Ideascribe! Time to get those creative juices flowing.`,
    `Step into ${user.user?.firstName}'s Canvas! Let's turn your ideas into reality with Ideascribe.`,
    `Welcome to ${user.user?.firstName}'s Ideascribe Canvas! Your next big idea starts here.`,
    `Hey ${user.user?.firstName}, welcome to your Canvas! Ready to create something incredible on Ideascribe?`,
    `Welcome to ${user.user?.firstName}'s Creative Canvas on Ideascribe! Time to brainstorm and build.`,
    `Welcome to ${user.user?.firstName}'s Innovation Canvas! Let's make some magic with Ideascribe.`,
  ];

  const BtnTextArr = [
    "Start Creating!",
    "Begin Your Canvas!",
    "Let's Get Started!",
    "Unleash Your Ideas!",
    "Create Now!",
    "Dive In!",
    "Begin Your Journey!",
    "Get Creative!",
    "Make Magic Happen!",
    "Start Your Masterpiece!",
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 dark:bg-[#080402]">
      <h2 className="text-lg font-medium">
        {
          welcomeMessageArr[
            Math.floor(Math.random() * welcomeMessageArr.length)
          ]
        }
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        {BtnTextArr[Math.floor(Math.random() * BtnTextArr.length)]}
      </Button>
    </div>
  );
}
