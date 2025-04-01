import { ModifiableGroup } from '@/models/ModifiableGroup';
import { type IModifiableGroupOptions } from '@/models/ModifiableGroup';
export class Player extends ModifiableGroup {
  constructor(opts: IModifiableGroupOptions) {
    super(opts);
  }
}
