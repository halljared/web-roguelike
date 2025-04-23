import type { IModifiable, IModifiableOptions } from '@/models/interfaces/IModifiable';
import { ModifiableTag } from './types';

export abstract class Modifiable implements IModifiable {
  public id: string;
  public name: string;
  public description: string;
  public baseVal: number;
  public tags: ModifiableTag[];
  public parentId: string;

  protected constructor(options: IModifiableOptions = {}) {
    const {
      id = crypto.randomUUID(),
      name = '',
      description = '',
      baseVal = 0,
      tags = [],
      parentId,
    } = options;

    this.id = id;
    this.name = name;
    this.description = description;
    this.baseVal = baseVal;
    this.tags = tags;
    this.parentId = parentId ?? '';
  }
}
