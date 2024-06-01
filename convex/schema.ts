import { defineSchema,defineTable } from "convex/server";
import {v} from 'convex/values'

export default defineSchema({
  canvas:defineTable({
    title:v.string(),
    userId:v.string(),
    isArchived:v.boolean(),
    parentCanvas:v.optional(v.id('canvas')),
    content:v.optional(v.string()),
    coverImage:v.optional(v.string()),
    icon:v.optional(v.string()),
    isPublished:v.boolean()
  })
  .index('by_user',["userId"])
  .index('by_user_parent',["userId","parentCanvas"])
})