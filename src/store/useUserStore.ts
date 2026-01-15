import { create } from 'zustand';

interface UserState {
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
  setAiResult: (img: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Initial state
  nickname: '조성훈',
  moods: ['modern', 'minimal'],
  residenceType: '월세',
  budget: 3000000,
  moveInDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후

  uploadedRoomImg: null,
  aiResultImg: null,

  // Actions
  setPersona: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  setAiResult: (img) =>
    set((state) => ({
      ...state,
      aiResultImg: img,
    })),
}));
