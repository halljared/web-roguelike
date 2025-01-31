import { z } from "zod";
import { ModifiableTag, ModifierType } from "./types";

// Base schemas for common properties
export const IGameObjectOptionsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parentId: z.string(),
});

// Separate the modifiable properties
const ModifiablePropertiesSchema = z.object({
  tags: z.array(z.nativeEnum(ModifiableTag)),
  baseVal: z.number(),
});

// Combine for full IModifiableOptionsSchema
export const IModifiableOptionsSchema = IGameObjectOptionsSchema.merge(
  ModifiablePropertiesSchema
);

// Separate modifier-specific properties
const ModifierPropertiesSchema = z.object({
  modifierType: z.nativeEnum(ModifierType),
  target: z.nativeEnum(ModifiableTag),
});

// Create full ModifierSchema by merging
export const ModifierSchema = IModifiableOptionsSchema.merge(
  ModifierPropertiesSchema
);

// Define BaseSchema
export const BaseSchema = IGameObjectOptionsSchema.extend({
  attributes: z.array(IModifiableOptionsSchema),
  modifiers: z.array(ModifierSchema),
});

export const SerializedModifiableGroupSchema = z.object({
  base: BaseSchema,
});

export const SerializedModifierSchema = z.object({
  base: ModifierSchema,
});
