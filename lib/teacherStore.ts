import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Teacher {
  id: string;
  full_name: string;
  title: string;
  avatar_url: string | null;
  bio: string;
  education: string;
  is_verified: boolean;
  specialties: string[];
  years_experience: number;
  total_students: number;
  rating_avg: number;
  rating_count: number;
  price_per_session: number;
}

export interface AvailabilitySlot {
  id: string;
  teacher_id: string;
  day_of_week: number; // 0 = Minggu, 1 = Senin, ...
  time_slot: string; // e.g. "15:00 - 15:30"
  is_blocked: boolean;
}

export interface TeacherReview {
  id: string;
  teacher_id: string;
  parent_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Booking {
  id: string;
  teacher_id: string;
  student_name: string;
  level: string;
  time_slot: string;
  day: string; // e.g. "Senin", "Selasa"
  status: "ready" | "waiting" | "scheduled";
  meet_url: string;
}

interface TeacherState {
  teachers: Teacher[];
  availabilities: AvailabilitySlot[];
  reviews: TeacherReview[];
  bookings: Booking[];
  bookSlot: (
    teacherId: string,
    studentName: string,
    level: string,
    dayName: string,
    dayOfWeek: number,
    timeSlot: string
  ) => void;
  toggleBlockSlot: (teacherId: string, dayOfWeek: number, timeSlot: string) => void;
  addReview: (teacherId: string, parentName: string, rating: number, comment: string) => void;
}

const initialTeachers: Teacher[] = [
  {
    id: "teacher_1",
    full_name: "Riza Nasrullah",
    title: "Ustadz",
    avatar_url: null,
    bio: "Lulusan Universitas Islam Madinah dengan sanad qiraah Hafs 'an 'Asim. Menggunakan metode visual interaktif.",
    education: "S1 Universitas Islam Madinah",
    is_verified: true,
    specialties: ["Iqra 1-6", "Tahsin", "Tajwid Dasar"],
    years_experience: 5,
    total_students: 45,
    rating_avg: 4.8,
    rating_count: 14,
    price_per_session: 50000,
  },
  {
    id: "teacher_2",
    full_name: "Aisyah Humaira",
    title: "Ustazah",
    avatar_url: null,
    bio: "Berpengalaman mengajar ngaji anak-anak usia TK/SD sejak 2021. Mengajar dengan pendekatan sabar dan menyenangkan.",
    education: "S1 Pendidikan Agama Islam UIN Jakarta",
    is_verified: true,
    specialties: ["Iqra 1-6", "Tahfidz Juz Amma", "Kisah Nabi"],
    years_experience: 4,
    total_students: 32,
    rating_avg: 4.9,
    rating_count: 18,
    price_per_session: 45000,
  },
  {
    id: "teacher_3",
    full_name: "Khalid Basalamah",
    title: "Ustadz",
    avatar_url: null,
    bio: "Fokus pada perbaikan makhraj huruf dan kelancaran membaca Al-Qur'an. Menyediakan modul hafalan cilik.",
    education: "S1 Syariah LIPIA Jakarta",
    is_verified: false,
    specialties: ["Tahsin", "Al-Qur'an", "Tahfidz Anak"],
    years_experience: 7,
    total_students: 60,
    rating_avg: 4.6,
    rating_count: 22,
    price_per_session: 60000,
  },
];

const initialAvailabilities: AvailabilitySlot[] = [
  // Teacher 1 slots
  { id: "a1", teacher_id: "teacher_1", day_of_week: 1, time_slot: "15:00 - 15:30", is_blocked: false },
  { id: "a2", teacher_id: "teacher_1", day_of_week: 1, time_slot: "15:30 - 16:00", is_blocked: true }, // Ahmad Fatih booked
  { id: "a3", teacher_id: "teacher_1", day_of_week: 1, time_slot: "16:00 - 16:30", is_blocked: false },
  { id: "a4", teacher_id: "teacher_1", day_of_week: 1, time_slot: "16:30 - 17:00", is_blocked: false },
  { id: "a5", teacher_id: "teacher_1", day_of_week: 2, time_slot: "16:00 - 16:30", is_blocked: false },
  { id: "a6", teacher_id: "teacher_1", day_of_week: 2, time_slot: "16:30 - 17:00", is_blocked: false },
  { id: "a7", teacher_id: "teacher_1", day_of_week: 3, time_slot: "15:30 - 16:00", is_blocked: false },
  
  // Teacher 2 slots
  { id: "a8", teacher_id: "teacher_2", day_of_week: 1, time_slot: "14:00 - 14:30", is_blocked: false },
  { id: "a9", teacher_id: "teacher_2", day_of_week: 1, time_slot: "14:30 - 15:00", is_blocked: false },
  { id: "a10", teacher_id: "teacher_2", day_of_week: 2, time_slot: "15:00 - 15:30", is_blocked: false },
  
  // Teacher 3 slots
  { id: "a11", teacher_id: "teacher_3", day_of_week: 1, time_slot: "16:00 - 16:30", is_blocked: false },
  { id: "a12", teacher_id: "teacher_3", day_of_week: 3, time_slot: "19:30 - 20:00", is_blocked: false },
];

const initialReviews: TeacherReview[] = [
  { id: "r1", teacher_id: "teacher_1", parent_name: "Bunda Fatih", rating: 5, comment: "Ustadz Riza sangat sabar mengajar Fatih. Pelafalan Fathah Fatih kini jauh lebih fasih.", created_at: "18 Juni 2026" },
  { id: "r2", teacher_id: "teacher_1", parent_name: "Ayah Rian", rating: 4, comment: "Cara mengajarnya interaktif, anak jadi tidak mudah bosan.", created_at: "14 Juni 2026" },
  { id: "r3", teacher_id: "teacher_2", parent_name: "Ibu Zahra", rating: 5, comment: "Ustazah Aisyah ramah sekali, anak saya Zahra yang biasanya pemalu jadi semangat mengaji.", created_at: "17 Juni 2026" },
];

const initialBookings: Booking[] = [
  {
    id: "b1",
    teacher_id: "teacher_1",
    student_name: "Ahmad Fatih",
    level: "Iqra 3",
    time_slot: "15:30 - 16:00",
    day: "Senin",
    status: "ready",
    meet_url: "https://meet.google.com/abc-defg-hij",
  },
];

export const useTeacherStore = create<TeacherState>()(
  persist(
    (set) => ({
      teachers: initialTeachers,
      availabilities: initialAvailabilities,
      reviews: initialReviews,
      bookings: initialBookings,

      bookSlot: (teacherId, studentName, level, dayName, dayOfWeek, timeSlot) =>
        set((state) => {
          // 1. Create a new booking
          const newBooking: Booking = {
            id: `booking_${Date.now()}`,
            teacher_id: teacherId,
            student_name: studentName,
            level: level,
            time_slot: timeSlot,
            day: dayName,
            status: "scheduled",
            meet_url: "https://meet.google.com/abc-defg-hij",
          };

          // 2. Mark the availability slot as blocked
          const updatedAvailabilities = state.availabilities.map((slot) => {
            if (
              slot.teacher_id === teacherId &&
              slot.day_of_week === dayOfWeek &&
              slot.time_slot === timeSlot
            ) {
              return { ...slot, is_blocked: true };
            }
            return slot;
          });

          return {
            bookings: [...state.bookings, newBooking],
            availabilities: updatedAvailabilities,
          };
        }),

      toggleBlockSlot: (teacherId, dayOfWeek, timeSlot) =>
        set((state) => ({
          availabilities: state.availabilities.map((slot) => {
            if (
              slot.teacher_id === teacherId &&
              slot.day_of_week === dayOfWeek &&
              slot.time_slot === timeSlot
            ) {
              return { ...slot, is_blocked: !slot.is_blocked };
            }
            return slot;
          }),
        })),

      addReview: (teacherId, parentName, rating, comment) =>
        set((state) => {
          const newReview: TeacherReview = {
            id: `rev_${Date.now()}`,
            teacher_id: teacherId,
            parent_name: parentName,
            rating,
            comment,
            created_at: new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          };

          // Recalculate average rating
          const updatedTeachers = state.teachers.map((teacher) => {
            if (teacher.id === teacherId) {
              const currentTotal = teacher.rating_avg * teacher.rating_count;
              const nextCount = teacher.rating_count + 1;
              const nextAvg = parseFloat(((currentTotal + rating) / nextCount).toFixed(1));
              return {
                ...teacher,
                rating_count: nextCount,
                rating_avg: nextAvg,
              };
            }
            return teacher;
          });

          return {
            reviews: [newReview, ...state.reviews],
            teachers: updatedTeachers,
          };
        }),
    }),
    {
      name: "ngajikids_teacher_store",
    }
  )
);
