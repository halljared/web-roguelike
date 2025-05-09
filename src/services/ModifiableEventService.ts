import { Subject, filter } from 'rxjs';
import type { IAttribute } from '@/models/interfaces/IAttribute';
import type { IModifier } from '@/models/interfaces/IModifier';

export enum ModifiableEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export type ModifiableData = IAttribute | IModifier;

export interface IModifiableEvent {
  type: ModifiableEventType;
  modifiable: ModifiableData;
}

export type ModifiableCallback = (data: ModifiableData) => void;

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
