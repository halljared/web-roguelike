import { GameContext } from '@/models/GameContext';
import { usePlaygroundStore } from '@/stores/playgroundStore';

let gameContextInstance: GameContext | null = null;

export function initializeGameContext(): GameContext {
  const context = new GameContext();
  const store = usePlaygroundStore();
  store.setPlayground(context.getPlayground());
  return context;
}

export function useGameContext() {
  if (!gameContextInstance) {
    gameContextInstance = initializeGameContext();
  }

  return {
    gameContext: gameContextInstance,
    playgroundStore: usePlaygroundStore(),
  };
}
