'use client';

// TODO: review component

import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface TimeRange {
  from: string;
  to: string;
}

export interface CalendarProps {
  currYear: number;
  currMonth: number;
  currWeek: number;
  occupiedHours: Record<string, TimeRange[]>; // keyed by weekday
  freeHours: Record<string, TimeRange[]>; // keyed by weekday
  onChange?: (
    day: string,
    updated: { occupiedHours: TimeRange[]; freeHours: TimeRange[] }
  ) => void;
}

const cellStyles = cva(
  "rounded-md p-2 border cursor-pointer transition-all text-sm",
  {
    variants: {
      state: {
        free: "bg-green-100 hover:bg-green-200 border-green-300",
        occupied: "bg-red-100 hover:bg-red-200 border-red-300",
      },
    },
    defaultVariants: {
      state: "free",
    },
  }
);

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({
  currYear,
  currMonth,
  currWeek,
  occupiedHours,
  freeHours,
  onChange,
}: CalendarProps) {
  const [editing, setEditing] = useState<{
    day: string;
    range: TimeRange;
    type: "free" | "occupied";
  } | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const openEditor = (
    day: string,
    type: "free" | "occupied",
    range: TimeRange
  ) => {
    setEditing({ day, type, range });
  };

  const saveEdit = (updated: TimeRange) => {
    if (!editing) return;

    const { day, type, range } = editing;
    const source = type === "free" ? freeHours : occupiedHours;
    const newList = source[day].map((r) => (r === range ? updated : r));

    const newFree = type === "free" ? newList : freeHours[day];
    const newOcc = type === "occupied" ? newList : occupiedHours[day];

    onChange?.(day, { occupiedHours: newOcc, freeHours: newFree });
    setEditing(null);
  };

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="grid grid-cols-8 gap-4 min-w-max">
        <div></div>
        {daysOfWeek.map((d) => (
          <div key={d} className="font-semibold text-center">
            {d}
          </div>
        ))}

        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-sm text-right pr-2">{hour}</div>
            {daysOfWeek.map((day) => {
              const occ = occupiedHours[day] || [];
              const free = freeHours[day] || [];

              const isOcc = occ.some(
                (r) => hour >= r.from && hour < r.to
              );
              const isFree = free.some(
                (r) => hour >= r.from && hour < r.to
              );

              const state = isOcc ? "occupied" : isFree ? "free" : "free";
              const matchedRange = isOcc
                ? occ.find((r) => hour >= r.from && hour < r.to)!
                : free.find((r) => hour >= r.from && hour < r.to) || {
                    from: hour,
                    to: `${(parseInt(hour) + 1).toString().padStart(2, "0")}:00`,
                  };

              return (
                <div
                  key={day + hour}
                  className={cn(cellStyles({ state }))}
                  onClick={() => openEditor(day, isOcc ? "occupied" : "free", matchedRange)}
                >
                  {isOcc ? "Occupied" : isFree ? "Free" : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-sm space-y-4">
            <h2 className="font-semibold text-lg">Edit Time Range</h2>

            <div className="space-y-2">
              <label className="block text-sm">From</label>
              <input
                type="time"
                defaultValue={editing.range.from}
                onChange={(e) =>
                  (editing.range = { ...editing.range, from: e.target.value })
                }
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">To</label>
              <input
                type="time"
                defaultValue={editing.range.to}
                onChange={(e) =>
                  (editing.range = { ...editing.range, to: e.target.value })
                }
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                className="px-3 py-1 rounded-md border"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded-md bg-blue-600 text-white"
                onClick={() => saveEdit(editing.range)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
