"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useSearch } from "@/hook/useSearch";

import { searchMsg } from "@/assets/textMsg";

import { File } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const canvas = useQuery(api.canvas.getSearch);

  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((state) => state.toggle);
  const isOpen = useSearch((state) => state.isOpen);
  const onClose = useSearch((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    router.push(`/canvas/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        autoFocus
        placeholder={searchMsg[Math.floor(Math.random() * searchMsg.length)]}
      />
      <CommandList>
        <CommandEmpty>No results found. Try another search term.</CommandEmpty>
        <CommandGroup heading="Relevant Canvases">
          {canvas?.map((c) => {
            return (
              <CommandItem
                key={c._id}
                value={`${c._id}-${c.title}`}
                title={c.title}
                onSelect={(e: any) => onSelect(e, c._id)}
              >
                {c.icon ? (
                  <p className="mr-2 text-[18px]">{c.icon}</p>
                ) : (
                  <File className="mr-2 w-4 h-4" />
                )}
                {c.title}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
