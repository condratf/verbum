import React, { FC } from 'react'
import { CalendarIcon, Clock } from 'lucide-react'

type LessonCardProps = {
  title: string
  dateLabel: string
  timeRange: string
}

export const LessonCard: FC<LessonCardProps> = ({ title, dateLabel, timeRange }) => {
  return (
    <div className="inline-flex w-full max-w-md flex-col gap-2 rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 text-gray-900">
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="text-base font-semibold leading-snug">{title}</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" />
          <span>{dateLabel}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{timeRange}</span>
        </div>
      </div>
    </div>
  )
}
