import { Modifiable } from '@/models/Modifiable';
import type { IModifiableOptions } from '@/models/interfaces/IModifiable';

export class Attribute extends Modifiable {
  constructor(options?: IModifiableOptions) {
    super(options);
  }
}
