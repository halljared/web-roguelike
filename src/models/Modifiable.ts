import type { IModifiable, IModifiableOptions } from '@/models/interfaces/IModifiable';
import { createGameObject } from '@/models/GameObject';
export function createModifiable(options: IModifiableOptions = {}): IModifiable {
  const { baseVal, tags, parentId } = options;
  const modifiable = {
    ...createGameObject(options),
    baseVal: baseVal ?? 0,
    tags: tags ?? [],
    parentId: parentId ?? '',
  };

  return modifiable;
}
