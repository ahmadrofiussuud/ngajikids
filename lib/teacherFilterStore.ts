import { create } from "zustand";

export type SpecialtyFilter = "Semua" | "Iqra" | "Tahsin" | "Tahfidz";
export type DayFilter = "Semua" | "Hari Ini";

interface TeacherFilterState {
  specialty: SpecialtyFilter;
  availabilityDay: DayFilter;
  minRating: number; // 0 = all, 4.5 = 4.5+
  setSpecialty: (specialty: SpecialtyFilter) => void;
  setAvailabilityDay: (day: DayFilter) => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
}

export const useTeacherFilterStore = create<TeacherFilterState>((set) => ({
  specialty: "Semua",
  availabilityDay: "Semua",
  minRating: 0,
  setSpecialty: (specialty) => set({ specialty }),
  setAvailabilityDay: (availabilityDay) => set({ availabilityDay }),
  setMinRating: (minRating) => set({ minRating }),
  resetFilters: () => set({ specialty: "Semua", availabilityDay: "Semua", minRating: 0 }),
}));
