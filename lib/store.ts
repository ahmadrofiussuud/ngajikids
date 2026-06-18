import { create } from "zustand";

export type UserRole = "student" | "parent" | "teacher";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Quest {
  id: string;
  title: string;
  rewardXP: number;
  completed: boolean;
}

export interface GameState {
  xp: number;
  coins: number;
  level: number;
  badges: string[];
  quests: Quest[];
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeQuest: (id: string) => void;
  unlockBadge: (badgeId: string) => void;
  resetGame: () => void;
}

export interface AuthState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  setRole: (role: UserRole) => void;
}

export interface LearningState {
  activeModuleId: string | null;
  setActiveModule: (moduleId: string | null) => void;
}

export const useStore = create<GameState & AuthState & LearningState>((set) => ({
  // Gamification state
  xp: 120,
  coins: 50,
  level: 2,
  badges: ["Al-Fatihah Master", "Daily Streak 3 Days"],
  quests: [
    { id: "1", title: "Membaca Al-Fatihah lancar", rewardXP: 50, completed: false },
    { id: "2", title: "Belajar Hijaiyah A - Kho", rewardXP: 30, completed: false },
    { id: "3", title: "Latihan Makhraj 5 menit", rewardXP: 40, completed: true },
  ],
  addXP: (amount) =>
    set((state) => {
      const newXP = state.xp + amount;
      const nextLevelXP = state.level * 100;
      if (newXP >= nextLevelXP) {
        return {
          xp: newXP - nextLevelXP,
          level: state.level + 1,
        };
      }
      return { xp: newXP };
    }),
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  completeQuest: (id) =>
    set((state) => {
      const quest = state.quests.find((q) => q.id === id);
      if (quest && !quest.completed) {
        // Automatically add XP when completing quest
        const questsUpdated = state.quests.map((q) =>
          q.id === id ? { ...q, completed: true } : q
        );
        // We will trigger a state change for both quests and XP
        setTimeout(() => state.addXP(quest.rewardXP), 0);
        return { quests: questsUpdated };
      }
      return {};
    }),
  unlockBadge: (badgeId) =>
    set((state) => ({
      badges: state.badges.includes(badgeId)
        ? state.badges
        : [...state.badges, badgeId],
    })),
  resetGame: () =>
    set({
      xp: 0,
      coins: 0,
      level: 1,
      badges: [],
      quests: [
        { id: "1", title: "Membaca Al-Fatihah lancar", rewardXP: 50, completed: false },
        { id: "2", title: "Belajar Hijaiyah A - Kho", rewardXP: 30, completed: false },
        { id: "3", title: "Latihan Makhraj 5 menit", rewardXP: 40, completed: false },
      ],
    }),

  // Auth State
  user: {
    id: "child_1",
    name: "Ahmad",
    role: "student",
    avatar: "star",
  },
  setUser: (user) => set({ user }),
  setRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),

  // Learning State
  activeModuleId: "hijaiyah_1",
  setActiveModule: (activeModuleId) => set({ activeModuleId }),
}));
