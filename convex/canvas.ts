import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: { id: v.id("canvas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const existingCanvas = await ctx.db.get(args.id);

    if (!existingCanvas) {
      throw new Error("Canvas not found");
    }

    if (existingCanvas.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (canvasId: Id<"canvas">) => {
      const child = await ctx.db
        .query("canvas")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentCanvas", canvasId)
        )
        .collect();

      for (const c of child) {
        await ctx.db.patch(c._id, {
          isArchived: true,
        });

        await recursiveArchive(c._id);
      }
    };

    const canvas = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return canvas;
  },
});

export const getSidebar = query({
  args: {
    parentCanvas: v.optional(v.id("canvas")),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const canvases = await ctx.db
      .query("canvas")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentCanvas", args.parentCanvas)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return canvases;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentCanvas: v.optional(v.id("canvas")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const canvas = await ctx.db.insert("canvas", {
      title: args.title,
      parentCanvas: args.parentCanvas,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return canvas;
  },
});
