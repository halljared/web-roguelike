import { createGameObject } from '@/models/GameObject';
import type { IArtifact, IArtifactOptions } from '@/models/interfaces/IArtifact';
import { ModifiableTag } from '@/models/types';

/**
 * Artifacts are the output of other game objects whose
 * role is to encapsulate that output in a way that allows
 * them to be transmitted, viewed, and resolved.
 *
 */
export function createArtifact(options: IArtifactOptions): IArtifact {
  const { targetModifiableId, sourceItemId, targetModifiableTag, val } = options;
  const artifact = {
    ...createGameObject(options),
    targetModifiableId: targetModifiableId ?? '',
    sourceItemId: sourceItemId ?? '',
    targetModifiableTag: targetModifiableTag ?? ModifiableTag.HEALTH,
    val: val ?? 0,
  };
  return artifact;
}
