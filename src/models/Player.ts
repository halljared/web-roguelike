import { type IPlayer, type IPlayerOptions } from '@/models/interfaces/IPlayer';
import { createModifiableGroup } from '@/models/ModifiableGroup';

export function createPlayer(options: IPlayerOptions = {}): IPlayer {
  const player = {
    ...createModifiableGroup(options),
  };
  return player;
}

export const PlayerUtils = {
  create: createPlayer,
};
