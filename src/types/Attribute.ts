import { type IGameObjectOptions } from "@/types/ModifiableGroup";
import { Modifiable } from "@/types/Modifiable";

export class Attribute extends Modifiable {
  constructor(baseOpts?: IGameObjectOptions) {
    super(baseOpts);
  }
}
