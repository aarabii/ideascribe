"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useMutation, useQuery } from "convex/react";
import debounce from "lodash/debounce";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface EditorProps {
  initialData: Doc<"canvas">;
  editable?: boolean;
}

const Editor = ({ initialData, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const update = useMutation(api.canvas.update);
  const getById = useQuery(api.canvas.getById, { id: initialData._id });

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const loadInitialContent = useCallback(() => {
    const data = getById?.content;
    return data ? (JSON.parse(data) as PartialBlock[]) : undefined;
  }, [getById]);

  useEffect(() => {
    if (getById) {
      setInitialContent(loadInitialContent());
    } else {
      setInitialContent(undefined);
    }
  }, [getById, loadInitialContent]);

  const saveToStorage = useCallback(
    async (jsonBlocks: Block[]) => {
      if (initialData && initialData._id) {
        await update({
          id: initialData._id,
          content: JSON.stringify(jsonBlocks),
        });
      } else {
        console.error("initialData or initialData._id is missing");
      }
    },
    [initialData, update]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSaveToStorage = useCallback(
    debounce((jsonBlocks: Block[]) => {
      saveToStorage(jsonBlocks);
    }, 2000),
    [saveToStorage]
  );

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

  useEffect(() => {
    if (editor) {
      const handleMouseActivity = () => {
        debouncedSaveToStorage(editor.document);
      };

      document.addEventListener("mousemove", handleMouseActivity);
      document.addEventListener("mouseout", handleMouseActivity);

      return () => {
        document.removeEventListener("mousemove", handleMouseActivity);
        document.removeEventListener("mouseout", handleMouseActivity);
      };
    }
  }, [editor, debouncedSaveToStorage]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      onChange={() => {
        debouncedSaveToStorage(editor.document);
      }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
