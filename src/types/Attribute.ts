import { type IGameObjectOptions } from "@/types/ModifiableGroup";
import { type IModifiableOptions, Modifiable } from "@/types/Modifiable";

export class Attribute extends Modifiable {
  constructor(
    baseOpts?: IGameObjectOptions,
    modifiableOpts?: IModifiableOptions,
  ) {
    super(baseOpts, modifiableOpts);
  }
}
