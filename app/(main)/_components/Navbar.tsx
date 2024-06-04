"use client";

import { Fragment } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MenuIcon } from "lucide-react";

import { Title } from "./Title";
import { Banner } from "./Banner";

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
      <nav className="bg-background dark:bg-[#080402] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );
  }

  if (canvas === null) {
    return <p>Not found</p>;
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
        </div>
      </nav>
      {canvas.isArchived && <Banner canvasId={canvas._id} />}
    </Fragment>
  );
};
