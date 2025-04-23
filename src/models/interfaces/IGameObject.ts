export interface IGameObject {
  id?: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface IRequiredGameObjectOptions extends Omit<IGameObject, 'id'> {
  id: string;
}
