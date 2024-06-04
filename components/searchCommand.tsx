"use client";

import { useEffect, useState } from "react";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

import { useSearch } from "@/hook/useSearch";
import { api } from "@/convex/_generated/api";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { FileSearch } from "lucide-react";

import { searchMsg } from "@/assets/textMsg";

export function SearchCommand() {
  const router = useRouter();
  const canvas = useQuery(api.canvas.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

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

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={searchMsg[Math.floor(Math.random() * searchMsg.length)]}
      />
      <CommandList>
        <CommandEmpty>No results found. Try another search term.</CommandEmpty>
        <CommandGroup heading="Relevant Canvases">
          {canvas?.map((c) => (
            <CommandItem
              key={c._id}
              value={`${c._id}-${c.title}`}
              title={c.title || "Untitled"}
              onSelect={onSelect}
            >
              {c.icon ? (
                <p className="mr-2 text-[18px]">{c.icon}</p>
              ) : (
                <FileSearch className="w-4 h-4 mr-2" />
              )}
              <span>{c.title || "Untitled"}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
