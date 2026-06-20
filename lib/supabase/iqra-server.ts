// Server-only helper for Iqra lock validation to prevent client-side import leakage
import { createClient } from "./server";
import { cookies } from "next/headers";
import { IqraProgress, getDefaultProgress, isSupabasePlaceholder } from "./iqra";

export async function getServerStudentIqraProgress(studentId: string): Promise<IqraProgress> {
  const defaultProgress = getDefaultProgress(studentId);
  const cookieStore = await cookies();

  // If Supabase environment is placeholder, load from cookie fallback
  if (isSupabasePlaceholder()) {
    const cached = cookieStore.get(`ngajikids_iqra_${studentId}`)?.value;
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return defaultProgress;
      }
    }
    return defaultProgress;
  }

  // Real Supabase query
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("student_iqra_progress")
      .select("*")
      .eq("student_id", studentId)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      return {
        id: data.id,
        student_id: data.student_id,
        current_jilid: data.current_jilid,
        passed_jilid: data.passed_jilid || [],
        passed_at: data.passed_at || {},
        passed_by: data.passed_by || {},
        updated_at: data.updated_at,
      };
    }
    return defaultProgress;
  } catch (err) {
    console.error("Server-side Supabase progress fetch error, falling back to cookie:", err);
    const cached = cookieStore.get(`ngajikids_iqra_${studentId}`)?.value;
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return defaultProgress;
  }
}
