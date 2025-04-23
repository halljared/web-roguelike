import type { IGameObject, IGameObjectOptions } from '@/models/interfaces/IGameObject';

export function createGameObject(options: IGameObjectOptions = {}): IGameObject {
  const { id = crypto.randomUUID(), name = '', description = '', parentId = '' } = options;

  return {
    id,
    name,
    description,
    parentId,
  };
}
