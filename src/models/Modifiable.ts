import type { IGameObjectOptions } from "@/models/IGameObjectOptions";

export enum ModifiableTag {
  ATTRIBUTE = "ATTRIBUTE",
  STRENGTH = "STRENGTH",
}

export interface IModifiableOptions {
  tags: ModifiableTag[],
  baseVal: number
}

export interface IModifiableConstructorOptions extends Partial<IGameObjectOptions>, Partial<IModifiableOptions> {
}

export abstract class Modifiable implements IGameObjectOptions, IModifiableOptions {
  public id: string;
  public name: string;
  public description: string;
  public baseVal: number;
  public tags: ModifiableTag[];

  protected constructor(options: IModifiableConstructorOptions = {}) {
    const {
      id = crypto.randomUUID(),
      name = "",
      description = "",
      baseVal = 0,
      tags = []
    } = options;

    this.id = id;
    this.name = name;
    this.description = description;
    this.baseVal = baseVal;
    this.tags = tags;
  }

}
