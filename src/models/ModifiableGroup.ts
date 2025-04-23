import { z } from 'zod';
import type { IModifiable } from '@/models/interfaces/IModifiable';
import type { IModifier } from '@/models/interfaces/IModifier';
import type { IModifiableGroup } from '@/models/interfaces/IModifiableGroup';
import { SerializedModifiableGroupSchema } from './schemas';
import type { IAttribute } from '@/models/interfaces/IAttribute';
import type {
  IModifiableGroupDeserialized,
  IModifiableGroupOptions,
} from '@/models/interfaces/IModifiableGroup';

export abstract class ModifiableGroup implements IModifiableGroup {
  public id: string;
  public name: string;
  public description: string;
  public attributes: IAttribute[];
  public modifiers: IModifier[];
  public parentId: string;

  protected constructor(
    baseOpts: IModifiableGroupOptions = {
      name: '',
      description: '',
      attributes: [],
      modifiers: [],
    }
  ) {
    const { id, name, description, attributes, modifiers, parentId } = baseOpts;

    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.attributes = attributes;
    this.modifiers = modifiers;
    this.parentId = parentId ?? '';
  }

  protected static deserializeBase(obj: object): IModifiableGroupDeserialized | undefined {
    let item: IModifiableGroupDeserialized | undefined = undefined;
    try {
      const parsed = SerializedModifiableGroupSchema.parse(obj);
      return parsed;
    } catch (e) {
      console.error('Schema validation error:', e);
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
      }
      return undefined;
    }
  }

  protected static baseJSON(base: ModifiableGroup): object {
    return { ...base };
  }

  public clearModifiables(): void {
    this.attributes = [];
    this.modifiers = [];
  }

  public getModifiables(): IModifiable[] {
    return [...this.attributes, ...this.modifiers];
  }
}
