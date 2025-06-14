import { z } from 'zod';
import { ModifiableTag, ModifierType, ModifierRarity } from './types';

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
export const IModifiableOptionsSchema = IGameObjectOptionsSchema.merge(ModifiablePropertiesSchema);

// Separate modifier-specific properties
const ModifierPropertiesSchema = z.object({
  modifierType: z.nativeEnum(ModifierType),
  target: z.nativeEnum(ModifiableTag),
  rarity: z.nativeEnum(ModifierRarity),
});

// Create full ModifierSchema by merging
export const ModifierSchema = IModifiableOptionsSchema.merge(ModifierPropertiesSchema);

const ArtifactConfigSchema = z.object({
  val: z.number(),
  tag: z.nativeEnum(ModifiableTag),
});

// Define BaseSchema
export const BaseSchema = IGameObjectOptionsSchema.extend({
  attributes: z.array(IModifiableOptionsSchema),
  modifiers: z.array(ModifierSchema),
  artifactConfigs: z.array(ArtifactConfigSchema),
});

export const SerializedModifiableGroupSchema = z.object({
  base: BaseSchema,
});

export const ItemPropertiesSchema = z.object({
  targetIds: z.array(z.string()),
});

export const ItemSchema = BaseSchema.merge(ItemPropertiesSchema);

export const SerializedItemSchema = z.object({
  base: BaseSchema,
  itemProperties: ItemPropertiesSchema,
});

export const SerializedModifierSchema = ModifierSchema;
