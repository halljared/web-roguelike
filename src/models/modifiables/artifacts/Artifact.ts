import type { IArtifact, IArtifactOptions } from '@/models/interfaces/IArtifact';
import { createModifiable } from '@/models/Modifiable';
import { ModifiableTag } from '@/models/types';

/**
 * Artifacts are the output of other game objects whose
 * role is to encapsulate that output in a way that allows
 * them to be transmitted, viewed, and resolved.
 *
 */
export function createArtifact(options: IArtifactOptions): IArtifact {
  const { targetModifiableId, sourceId, target } = options;
  const artifact = {
    ...createModifiable(options),
    targetModifiableId: targetModifiableId ?? '',
    sourceId: sourceId ?? '',
    target: target ?? ModifiableTag.HEALTH,
  };
  return artifact;
}
