"use client";

import { useSettings } from "@/hook/useSettings";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

import { Settings } from "lucide-react";

export const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            <Settings className="h-6 w-6 mr-2 inline-block" />
            Settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem]">
              Customize the appearance of the app
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
