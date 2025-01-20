import { type IGameObjectOptions } from "@/types/ModifiableGroup";

export enum ModifiableTag {
  ATTRIBUTE = "ATTRIBUTE",
  STRENGTH = "STRENGTH",
}

export interface IModifiableOptions {
  tags: ModifiableTag[]
}

export abstract class Modifiable implements IGameObjectOptions {
  public val: number = 0;
  public id: string;
  public name: string;
  public description: string;
  public tags: ModifiableTag[];

  protected constructor(
    baseOpts: IGameObjectOptions = {
      name: "",
      description: "",
    },
    modifiableOpts: IModifiableOptions = {
      tags: []
    },
  ) {
    const id = baseOpts.id;
    this.id = id ?? crypto.randomUUID();
    this.name = baseOpts.name;
    this.description = baseOpts.description;
    this.tags = modifiableOpts.tags;
  }
}
