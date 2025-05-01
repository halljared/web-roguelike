import { Subject, filter } from 'rxjs';
import type { IArtifact } from '@/models/interfaces/IArtifact';

export enum ArtifactEventType {
  CREATED = 'CREATED',
  RESOLVED = 'RESOLVED',
  CANCELLED = 'CANCELLED',
}

export interface IArtifactEvent {
  type: ArtifactEventType;
  artifact: IArtifact;
}

export type ArtifactCallback = (artifact: IArtifact) => void;

export class ArtifactEventService {
  private eventBus$ = new Subject<IArtifactEvent>();

  emit(event: IArtifactEvent): void {
    this.eventBus$.next(event);
  }

  on(type: ArtifactEventType, callback: ArtifactCallback): () => void {
    const subscription = this.eventBus$
      .pipe(filter((event) => event.type === type))
      .subscribe((event) => callback(event.artifact));

    return () => subscription.unsubscribe();
  }

  all(callback: ArtifactCallback): () => void {
    const subscription = this.eventBus$.subscribe((event) => callback(event.artifact));
    return () => subscription.unsubscribe();
  }
}

const artifactEventService = new ArtifactEventService();
export function useArtifactEventService(): ArtifactEventService {
  return artifactEventService;
}
