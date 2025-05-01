import { Subject, filter } from 'rxjs';
import type { IModifiable } from '@/models/interfaces/IModifiable';

export enum ModifiableEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface IModifiableEvent {
  type: ModifiableEventType;
  modifiable: IModifiable;
}

export type ModifiableCallback = (modifiable: IModifiable) => void;

export class ModifiableEventService {
  private eventBus$ = new Subject<IModifiableEvent>();

  emit(event: IModifiableEvent): void {
    this.eventBus$.next(event);
  }

  on(type: ModifiableEventType, callback: ModifiableCallback): () => void {
    const subscription = this.eventBus$
      .pipe(filter((event) => event.type === type))
      .subscribe((event) => callback(event.modifiable));

    return () => subscription.unsubscribe();
  }

  all(callback: ModifiableCallback): () => void {
    const subscription = this.eventBus$.subscribe((event) => callback(event.modifiable));
    return () => subscription.unsubscribe();
  }
}

const modifiableEventService = new ModifiableEventService();
export function useModifiableEventService(): ModifiableEventService {
  return modifiableEventService;
}
