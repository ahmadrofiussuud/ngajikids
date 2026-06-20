"use client";

import React from "react";
import { useTeacherFilterStore, SpecialtyFilter, DayFilter } from "@/lib/teacherFilterStore";
import { Filter, Star, Calendar, RefreshCw } from "lucide-react";

export default function TeacherFilterBar() {
  const {
    specialty,
    availabilityDay,
    minRating,
    setSpecialty,
    setAvailabilityDay,
    setMinRating,
    resetFilters,
  } = useTeacherFilterStore();

  const specialties: SpecialtyFilter[] = ["Semua", "Iqra", "Tahsin", "Tahfidz"];
  const availabilityDays: DayFilter[] = ["Semua", "Hari Ini"];

  return (
    <div className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm text-left flex flex-col gap-4 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-primary" />
          <h3 className="font-extrabold text-sm text-gray-700">Filter Guru Ngaji</h3>
        </div>
        
        {/* Reset button */}
        {(specialty !== "Semua" || availabilityDay !== "Semua" || minRating > 0) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[10px] font-black text-primary hover:text-primary-dark transition-all flex items-center gap-1 cursor-pointer bg-primary-light/50 border border-primary/20 px-2.5 py-1 rounded-lg"
          >
            <RefreshCw size={10} className="stroke-[3]" />
            Atur Ulang
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
        {/* 1. SPECIALTIES CHIPS */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">Spesialisasi</span>
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((spec) => {
              const active = specialty === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSpecialty(spec)}
                  className={`px-3.5 py-2 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                    active
                      ? "bg-primary border-primary-dark text-white shadow-sm scale-102"
                      : "bg-white border-neutral-border text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. AVAILABILITY CHIPS */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">Ketersediaan Jadwal</span>
          <div className="flex flex-wrap gap-1.5">
            {availabilityDays.map((day) => {
              const active = availabilityDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setAvailabilityDay(day)}
                  className={`px-3.5 py-2 rounded-xl border-2 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-primary border-primary-dark text-white shadow-sm scale-102"
                      : "bg-white border-neutral-border text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <Calendar size={12} />
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. MIN RATING CHIPS */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">Rating Guru</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setMinRating(0)}
              className={`px-3.5 py-2 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                minRating === 0
                  ? "bg-primary border-primary-dark text-white shadow-sm"
                  : "bg-white border-neutral-border text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setMinRating(4.5)}
              className={`px-3.5 py-2 rounded-xl border-2 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                minRating === 4.5
                  ? "bg-primary border-primary-dark text-white shadow-sm scale-102"
                  : "bg-white border-neutral-border text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
            >
              <Star size={12} className={minRating === 4.5 ? "fill-white text-white" : "fill-amber-400 text-amber-500"} />
              Rating 4.5+
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
