import { Playground } from '@/models/Playground';
import { ArtifactResolver } from '@/models/ArtifactResolver';
import { ArtifactEventType, useArtifactEventService } from '@/services/ArtifactEventService';
export class GameContext {
  private playground: Playground;
  private artifactResolver: ArtifactResolver;

  constructor() {
    this.playground = new Playground();
    this.artifactResolver = new ArtifactResolver(this.playground);
    const artifactEvents = useArtifactEventService();
    artifactEvents.all((artifact) => {
      this.artifactResolver.resolve(artifact);
    });
  }

  public getPlayground(): Playground {
    return this.playground;
  }

  public getArtifactResolver(): ArtifactResolver {
    return this.artifactResolver;
  }
}
