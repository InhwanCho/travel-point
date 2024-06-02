import { create } from "zustand";

interface RecommendState {
  movedPositions: string[];
  setMovedPositions: (positions: string[]) => void;
}

export const useRecommendStore = create<RecommendState>((set) => ({
  movedPositions: [],
  setMovedPositions: (positions) => set({ movedPositions: positions }),
}));
