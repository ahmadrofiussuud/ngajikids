export type StudentLevel =
  | "iqro1"
  | "iqro2"
  | "iqro3"
  | "iqro4"
  | "iqro5"
  | "iqro6"
  | "alquran";

export type StudentProfile = {
  level: StudentLevel;
  weakPoints: string[];
  streak: number;
  lastSessionScore: number;
  teacherNotes: string;
};

export interface AssessmentInput {
  hijaiyahScore: number; // 0 to 100
  tajwidScore: number; // 0 to 100
  readingSpeed: number; // characters per minute
  consistencyScore: number; // 0 to 100
  retentionScore: number; // 0 to 100
  lastThreeScores: number[]; // Scores of last 3 sessions
}

export interface WeeklyScheduleItem {
  day: string;
  focus: string;
  durationMinutes: number;
  activityType: "REVISION" | "NEW_MATERIAL" | "PRACTICE";
  materialDescription: string;
}

export interface LearningPathOutput {
  weeklySchedule: WeeklyScheduleItem[];
  difficultyAdjustment: "DECREASE" | "MAINTAIN" | "INCREASE";
  isStrugglingFlag: boolean;
  focusRecommendation: "REVISION" | "NEW_MATERIAL" | "BALANCED";
  plainLanguageInsight: string;
}

/**
 * AI engine to analyze student performance and generate personalized weekly schedules and insights.
 */
export function generateAIPath(
  profile: StudentProfile,
  assessment: AssessmentInput
): LearningPathOutput {
  // 1. Struggle Flag: score < 60% for 2 sessions
  let isStrugglingFlag = false;
  const scores = assessment.lastThreeScores;
  if (scores.length >= 2) {
    const lastTwo = scores.slice(-2);
    if (lastTwo[0] < 60 && lastTwo[1] < 60) {
      isStrugglingFlag = true;
    }
  }

  // 2. Difficulty Adjustment based on last 3 sessions
  let difficultyAdjustment: "DECREASE" | "MAINTAIN" | "INCREASE" = "MAINTAIN";
  if (scores.length >= 3) {
    const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    if (avgScore > 85) {
      difficultyAdjustment = "INCREASE";
    } else if (avgScore < 65) {
      difficultyAdjustment = "DECREASE";
    }
  }

  // 3. Focus Recommendation based on retention score
  let focusRecommendation: "REVISION" | "NEW_MATERIAL" | "BALANCED" = "BALANCED";
  if (assessment.retentionScore < 70) {
    focusRecommendation = "REVISION";
  } else if (assessment.retentionScore > 85) {
    focusRecommendation = "NEW_MATERIAL";
  }

  // 4. Plain Language Insight for Parents
  let plainLanguageInsight = "";
  const primaryWeakness =
    profile.weakPoints.length > 0 ? profile.weakPoints[0] : "";

  if (isStrugglingFlag) {
    plainLanguageInsight = `Ananda perlu bimbingan ekstra pada sesi tatap muka berikutnya. Rekomendasi memfokuskan kembali latihan dasar.`;
  } else if (focusRecommendation === "REVISION" && primaryWeakness) {
    plainLanguageInsight = `Ananda perlu melatih kembali materi ${primaryWeakness} untuk memperkuat ingatan sebelum masuk ke materi baru.`;
  } else if (primaryWeakness) {
    plainLanguageInsight = `Fokus utama minggu ini adalah melancarkan pelafalan huruf dengan makhraj ${primaryWeakness}.`;
  } else {
    plainLanguageInsight = `Progres Ananda sangat stabil. Siap melangkah ke materi baru minggu ini dengan lancar!`;
  }

  // 5. Weekly Schedule Generation
  const days = ["Senin", "Rabu", "Kamis", "Sabtu", "Ahad"];
  const weeklySchedule: WeeklyScheduleItem[] = [];

  const getMaterialDescription = (
    type: "REVISION" | "NEW_MATERIAL" | "PRACTICE"
  ) => {
    const levelStr = profile.level.toUpperCase();
    if (type === "REVISION") {
      return primaryWeakness
        ? `Mengulang makhraj ${primaryWeakness} di modul ${levelStr}`
        : `Mengulang lembar materi terakhir pada modul ${levelStr}`;
    } else if (type === "NEW_MATERIAL") {
      return `Mempelajari halaman baru pada tingkat kelulusan ${levelStr}`;
    } else {
      return `Latihan membaca mandiri dengan fitur AI audio checker`;
    }
  };

  days.forEach((day, index) => {
    let activityType: "REVISION" | "NEW_MATERIAL" | "PRACTICE" = "PRACTICE";
    let focus = "";
    let durationMinutes = 15;

    // Adjust duration based on consistency & streak
    if (profile.streak > 5) {
      durationMinutes = 20; // reward focus
    }

    if (focusRecommendation === "REVISION") {
      // More revision days
      activityType = index % 2 === 0 ? "REVISION" : "PRACTICE";
      focus = activityType === "REVISION" ? "Penguatan Memori" : "Latihan Mandiri";
    } else if (focusRecommendation === "NEW_MATERIAL") {
      // More new materials
      activityType = index % 2 === 0 ? "NEW_MATERIAL" : "PRACTICE";
      focus = activityType === "NEW_MATERIAL" ? "Materi Baru" : "Latihan Kelancaran";
    } else {
      // Balanced
      if (index === 0 || index === 2) {
        activityType = "NEW_MATERIAL";
        focus = "Materi Baru";
      } else if (index === 1 || index === 3) {
        activityType = "REVISION";
        focus = "Evaluasi Mandiri";
      } else {
        activityType = "PRACTICE";
        focus = "Latihan Bebas";
      }
    }

    weeklySchedule.push({
      day,
      focus,
      durationMinutes,
      activityType,
      materialDescription: getMaterialDescription(activityType),
    });
  });

  return {
    weeklySchedule,
    difficultyAdjustment,
    isStrugglingFlag,
    focusRecommendation,
    plainLanguageInsight,
  };
}
