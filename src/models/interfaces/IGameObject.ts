export interface IGameObject {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface IGameObjectOptions extends Partial<IGameObject> {}
