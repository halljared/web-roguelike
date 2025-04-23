import type { IModifiableOptions } from '@/models/interfaces/IModifiable';
import type { IAttribute } from '@/models/interfaces/IAttribute';

export function createAttribute(options: IModifiableOptions = {}): IAttribute {
  const {
    id = crypto.randomUUID(),
    name = '',
    description = '',
    baseVal = 0,
    tags = [],
    parentId = '',
  } = options;

  return {
    id,
    name,
    description,
    baseVal,
    tags,
    parentId,
  };
}
