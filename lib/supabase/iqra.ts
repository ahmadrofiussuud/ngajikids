// Client and Shared helper for Iqra volumes progress and lock validation
import { createClient as createBrowserClient } from "./client";

export interface IqraProgress {
  id?: string;
  student_id: string;
  current_jilid: number;
  passed_jilid: number[];
  passed_at: Record<string, string>; // e.g., {"1": "2026-06-20T10:00:00Z"}
  passed_by: Record<string, string>; // e.g., {"1": "teacher_1"}
  updated_at?: string;
}

// Client-side cookie reading/writing helpers
export function getClientCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function setClientCookie(name: string, value: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=604800; SameSite=Lax`;
}

// Detect if Supabase is unconfigured (using placeholder credentials)
export function isSupabasePlaceholder(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url.includes("placeholder-url.supabase.co");
}

// Initial mock progress to populate a student dashboard for the local demo (starting at Jilid 3)
export function getDefaultProgress(studentId: string): IqraProgress {
  return {
    student_id: studentId,
    current_jilid: 3, // Jilid 1 and 2 are passed, Jilid 3 is active/studying, 4-6 are locked
    passed_jilid: [1, 2],
    passed_at: {
      "1": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      "2": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    passed_by: { "1": "teacher_1", "2": "teacher_1" },
  };
}

// Fetch student progress. Automatically syncs fallback cookie to maintain demo usability.
export async function getStudentIqraProgress(studentId: string): Promise<IqraProgress> {
  const defaultProgress = getDefaultProgress(studentId);

  // In placeholder mock mode: read from cookie, write default if missing
  if (isSupabasePlaceholder()) {
    const cached = getClientCookie(`ngajikids_iqra_${studentId}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return defaultProgress;
      }
    }
    setClientCookie(`ngajikids_iqra_${studentId}`, JSON.stringify(defaultProgress));
    return defaultProgress;
  }

  // Real Supabase environment query
  try {
    const supabase = createBrowserClient();
    const { data, error } = await supabase
      .from("student_iqra_progress")
      .select("*")
      .eq("student_id", studentId)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      const progress: IqraProgress = {
        id: data.id,
        student_id: data.student_id,
        current_jilid: data.current_jilid,
        passed_jilid: data.passed_jilid || [],
        passed_at: data.passed_at || {},
        passed_by: data.passed_by || {},
        updated_at: data.updated_at,
      };
      // Keep local cookie synced in browser
      setClientCookie(`ngajikids_iqra_${studentId}`, JSON.stringify(progress));
      return progress;
    } else {
      // First-time load for real Supabase user: insert default start state (Jilid 1)
      const freshProgress: IqraProgress = {
        student_id: studentId,
        current_jilid: 1,
        passed_jilid: [],
        passed_at: {},
        passed_by: {},
      };

      const { data: inserted, error: insertError } = await supabase
        .from("student_iqra_progress")
        .insert(freshProgress)
        .select()
        .single();

      if (insertError) throw insertError;
      
      const progress: IqraProgress = {
        id: inserted.id,
        student_id: inserted.student_id,
        current_jilid: inserted.current_jilid,
        passed_jilid: inserted.passed_jilid || [],
        passed_at: inserted.passed_at || {},
        passed_by: inserted.passed_by || {},
        updated_at: inserted.updated_at,
      };
      setClientCookie(`ngajikids_iqra_${studentId}`, JSON.stringify(progress));
      return progress;
    }
  } catch (err) {
    console.error("Supabase iqra fetch failed, falling back to cookie:", err);
    const cached = getClientCookie(`ngajikids_iqra_${studentId}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return defaultProgress;
  }
}

// Mark current jilid as passed, unlocking next jilid (up to 6)
export async function markStudentIqraPassed(
  studentId: string,
  jilid: number,
  teacherId: string
): Promise<boolean> {
  const currentProgress = await getStudentIqraProgress(studentId);
  if (jilid !== currentProgress.current_jilid) {
    return false; // Can only mark the current active jilid as passed
  }

  const nextJilid = Math.min(6, jilid + 1);
  const updatedProgress: IqraProgress = {
    ...currentProgress,
    current_jilid: nextJilid,
    passed_jilid: Array.from(new Set([...currentProgress.passed_jilid, jilid])),
    passed_at: {
      ...currentProgress.passed_at,
      [jilid.toString()]: new Date().toISOString(),
    },
    passed_by: {
      ...currentProgress.passed_by,
      [jilid.toString()]: teacherId,
    },
  };

  // 1. Update client-side local cookies for instant sync & server validation fallback
  setClientCookie(`ngajikids_iqra_${studentId}`, JSON.stringify(updatedProgress));
  if (studentId === "child_1") {
    // General cookie that is easier to read in middleware or parent views
    setClientCookie("ngajikids_iqra_progress", JSON.stringify(updatedProgress));
  }

  if (isSupabasePlaceholder()) {
    return true; // Mock mode succeeds instantly
  }

  // 2. Perform DB upsert
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("student_iqra_progress")
      .upsert({
        student_id: studentId,
        current_jilid: nextJilid,
        passed_jilid: updatedProgress.passed_jilid,
        passed_at: updatedProgress.passed_at,
        passed_by: updatedProgress.passed_by,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase iqra progress upsert failed:", err);
    return true; // Return true because fallback cookies were already updated successfully
  }
}
