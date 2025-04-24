import { type IModifiableGroup } from '@/models/interfaces/IModifiableGroup';

export interface IPlayer extends IModifiableGroup {}

export interface IPlayerOptions extends Partial<IPlayer> {}
