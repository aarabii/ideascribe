import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: { id: v.id("canvas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const existingCanvas = await ctx.db.get(args.id);
    if (!existingCanvas) throw new Error("Canvas not found");
    if (existingCanvas.userId !== userId) throw new Error("Unauthorized");

    const recursiveArchive = async (canvasId: Id<"canvas">) => {
      const children = await ctx.db
        .query("canvas")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentCanvas", canvasId)
        )
        .collect();

      await Promise.all(
        children.map(async (child) => {
          await ctx.db.patch(child._id, { isArchived: true });
          await recursiveArchive(child._id);
        })
      );
    };

    await ctx.db.patch(args.id, { isArchived: true });
    await recursiveArchive(args.id);

    return existingCanvas;
  },
});

export const getSidebar = query({
  args: { parentCanvas: v.optional(v.id("canvas")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

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
  args: { title: v.string(), parentCanvas: v.optional(v.id("canvas")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

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

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const canvases = await ctx.db
      .query("canvas")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return canvases;
  },
});

export const restore = mutation({
  args: { id: v.id("canvas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const existingCanvas = await ctx.db.get(args.id);
    if (!existingCanvas) throw new Error("Canvas not found");
    if (existingCanvas.userId !== userId) throw new Error("Unauthorized");

    const recursiveRestore = async (canvasId: Id<"canvas">) => {
      const children = await ctx.db
        .query("canvas")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentCanvas", canvasId)
        )
        .collect();

      await Promise.all(
        children.map(async (child) => {
          await ctx.db.patch(child._id, { isArchived: false });
          await recursiveRestore(child._id);
        })
      );
    };

    const options: Partial<Doc<"canvas">> = { isArchived: false };

    if (existingCanvas.parentCanvas) {
      const parent = await ctx.db.get(existingCanvas.parentCanvas);
      if (parent?.isArchived) options.parentCanvas = undefined;
    }

    await ctx.db.patch(args.id, options);
    await recursiveRestore(args.id);

    return existingCanvas;
  },
});

export const remove = mutation({
  args: { id: v.id("canvas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const existingCanvas = await ctx.db.get(args.id);
    if (!existingCanvas) throw new Error("Canvas not found");
    if (existingCanvas.userId !== userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
    return existingCanvas;
  },
});

export const getSearch = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const canvas = await context.db
      .query("canvas")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return canvas;
  },
});

export const getById = query({
  args: { id: v.id("canvas") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    const canvas = await context.db.get(args.id);

    if (!canvas) throw new Error("Canvas not found");

    if (canvas.isPublished && !canvas.isArchived) return canvas;

    if (!identity) throw new Error("Unauthorized");

    const userID = identity.subject;

    if (canvas.userId !== userID) throw new Error("Unauthorized");

    return canvas;
  },
});

export const update = mutation({
  args: {
    id: v.id("canvas"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const userID = identity.subject;

    const { id, ...rest } = args;

    const existingCanvas = await context.db.get(args.id);

    if (!existingCanvas) throw new Error("Canvas not found");

    if (existingCanvas.userId !== userID) throw new Error("Unauthorized");

    const canvas = await context.db.patch(args.id, { ...rest });

    return canvas;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("canvas") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const userID = identity.subject;

    const existingCanvas = await context.db.get(args.id);

    if (!existingCanvas) throw new Error("Canvas not found");

    if (existingCanvas.userId !== userID) throw new Error("Unauthorized");

    const canvas = await context.db.patch(args.id, { icon: undefined });

    return canvas;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("canvas") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const userID = identity.subject;

    const existingCanvas = await context.db.get(args.id);

    if (!existingCanvas) throw new Error("Canvas not found");

    if (existingCanvas.userId !== userID) throw new Error("Unauthorized");

    const canvas = await context.db.patch(args.id, { coverImage: undefined });

    return canvas;
  },
});
