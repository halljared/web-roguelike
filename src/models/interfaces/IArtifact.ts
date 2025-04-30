import type { IGameObject } from '@/models/interfaces/IGameObject';
import type { ModifiableTag } from '@/models/types';

export interface IArtifact extends IGameObject {
  targetModifiableId: string;
  sourceId: string;
  target: ModifiableTag;
}

export interface IArtifactOptions extends Partial<IArtifact> {}
