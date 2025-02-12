import { Modifiable, type IModifiableConstructorOptions } from '@/models/Modifiable';
import type { ModifiableGroup } from '@/models/ModifiableGroup';
import type { IArtifactConstructorOptions, IArtifactOptions, ModifiableTag } from '@/models/types';

/**
 * Artifacts are the output of other game objects whose
 * role is to encapsulate that output in a way that allows
 * them to be transmitted, viewed, and resolved.
 *
 */
export default class Artifact extends Modifiable implements IArtifactOptions {
  public targetModifiable: Modifiable | ModifiableGroup;
  public sourceId: string;
  public target: ModifiableTag;
  constructor(options: IArtifactConstructorOptions) {
    super(options);
    const { targetModifiable, sourceId, target } = options;
    this.targetModifiable = targetModifiable;
    this.sourceId = sourceId;
    this.target = target;
  }
}
