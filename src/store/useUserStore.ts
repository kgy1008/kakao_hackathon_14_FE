import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  // Onboarding & Persona
  nickname: string;
  moods: string[]; // 취향 (modern, wood 등)
  residenceType: string; // 월세, 전세, 자가
  budget: number; // 예산 범위
  moveInDate: Date | null; // 이사 예정일

  // AI Canvas
  uploadedRoomImg: string | null;
  aiResultImg: string | null;

  // Actions
  setPersona: (data: Partial<UserState>) => void;
  setMoods: (moods: string[]) => void;
  setResidenceType: (type: string) => void;
  setBudget: (budget: number) => void;
  setMoveInDate: (date: Date | null) => void;
  setUploadedRoomImg: (img: string | null) => void;
  setAiResult: (img: string) => void;
  resetState: () => void;
}

const initialState = {
  nickname: "",
  moods: [],
  residenceType: "",
  budget: 0,
  moveInDate: null,
  uploadedRoomImg: null,
  aiResultImg: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setPersona: (data) => set((state) => ({ ...state, ...data })),

      setMoods: (moods) => set({ moods }),

      setResidenceType: (type) => set({ residenceType: type }),

      setBudget: (budget) => set({ budget }),

      setMoveInDate: (date) => set({ moveInDate: date }),

      setUploadedRoomImg: (img) => set({ uploadedRoomImg: img }),

      setAiResult: (img) => set({ aiResultImg: img }),

      resetState: () => set(initialState),
    }),
    {
      name: "kakao-homes-storage",
      partialize: (state) => ({
        nickname: state.nickname,
        moods: state.moods,
        residenceType: state.residenceType,
        budget: state.budget,
        moveInDate: state.moveInDate,
      }),
    }
  )
);
