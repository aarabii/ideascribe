"use client";

import { Fragment } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MenuIcon } from "lucide-react";

import { Title } from "./Title";
import { Banner } from "./Banner";
import { Menu } from "./Menu";
import { Share } from "./Share";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const canvas = useQuery(api.canvas.getById, {
    id: params.canvasID as Id<"canvas">,
  });

  if (canvas === undefined) {
    return (
      <nav className="bg-background dark:bg-[#080402] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (canvas === null) {
    return null;
  }

  return (
    <Fragment>
      <nav className="bg-background dark:bg-[#080402] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={canvas} />
          <div className="flex items-center gap-x-2">
            <Share initialData={canvas} />
            <Menu canvasId={canvas._id} />
          </div>
        </div>
      </nav>
      {canvas.isArchived && <Banner canvasId={canvas._id} />}
    </Fragment>
  );
};
