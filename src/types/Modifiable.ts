import { type IGameObjectOptions } from "@/types/ModifiableGroup";

export abstract class Modifiable implements IGameObjectOptions {
  public val: number = 0;
  public id: string;
  public name: string;
  public description: string;

  protected constructor(
    baseOpts: IGameObjectOptions = {
      name: "",
      description: "",
    }
  ) {
    const id = baseOpts.id;
    this.id = id ?? crypto.randomUUID();
    this.name = baseOpts.name;
    this.description = baseOpts.description;
  }
}
