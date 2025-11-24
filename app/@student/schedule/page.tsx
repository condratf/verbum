'use client'
import { Button, DateTimePicker, LessonCard } from "@/components/common";
import { useState } from "react";

export default function Schedule() {
  const [currStep, setCurrStep] = useState<1 | 2 | 3>(1)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  return (
    <div className="p-5 w-full">
      <h1 className="text-4xl font-bold mb-10">Schedule</h1>

      {currStep === 1 && (
        <div className="w-full">
          <Button disabled={!selectedDateTime} className="w-full mb-2" variant="secondary" onClick={() => setCurrStep(2)}>Next </Button>
          <DateTimePicker onSelectDatetime={setSelectedDateTime} />
        </div>
      )}

      {currStep === 2 && (
        <div className="flex flex-col gap-4 w-full">
          <LessonCard title="Lesson" dateLabel={selectedDateTime?.toLocaleDateString() || ''} timeRange={selectedDateTime?.toLocaleTimeString() || ''} />
          <div className="flex gap-2">
            <Button onClick={() => setCurrStep(3)}>Confirm</Button>
            <Button variant="secondary" onClick={() => setCurrStep(1)}>Back</Button>
          </div>
        </div>
      )}

      {currStep === 3 && (
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-10 w-full text-center">Your lesson is scheduled!</h2>
        </div>
      )}
    </div>
  );
}