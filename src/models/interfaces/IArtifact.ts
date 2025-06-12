import type { IGameObject } from '@/models/interfaces/IGameObject';
import type { ModifiableTag } from '@/models/types';

export interface IArtifact extends IGameObject {
  sourceModifiableGroupId: string;
  targetModifiableGroupId: string;
  targetModifiableTag: ModifiableTag;
  val: number;
}

export interface IArtifactOptions extends Partial<IArtifact> {}
