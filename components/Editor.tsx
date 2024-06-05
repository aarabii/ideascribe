"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useMutation, useQuery } from "convex/react";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface EditorProps {
  initialData: Doc<"canvas">;
  editable?: boolean;
}

export const Editor = ({ initialData, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const update = useMutation(api.canvas.update);
  const getById = useQuery(api.canvas.getById, { id: initialData._id });

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    if (getById) {
      setInitialContent(loadInitialContent());
    } else {
      setInitialContent(undefined);
    }
    // eslint-disable-next-line
  }, []);

  const loadInitialContent = () => {
    const data = getById?.content;
    return data ? (JSON.parse(data) as PartialBlock[]) : undefined;
  };

  const saveToStorage = async (jsonBlocks: Block[]) => {
    if (initialData && initialData._id) {
      await update({
        id: initialData._id,
        content: JSON.stringify(jsonBlocks),
      });
    } else {
      console.error("initialData or initialData._id is missing");
    }
  };

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    try {
      const editorInstance = BlockNoteEditor.create({ initialContent });

      return editorInstance;
    } catch (error) {
      return undefined;
    }
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      onChange={() => {
        saveToStorage(editor.document);
      }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
