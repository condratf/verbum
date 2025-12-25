"use client"
import { FC, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const DateTimePicker: FC<{ onSelectDatetime?: (datetime: Date) => void }> = ({ onSelectDatetime }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [classDuration, setClassDuration] = useState(30)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const timeSlots = [
    '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30',
  ]

  const dayButtonVariants = cva(
    'h-7 w-8 flex items-center justify-center text-lg font-medium rounded-md transition-all cursor-pointer',
    {
      variants: {
        state: {
          selected: 'bg-blue-100/50 text-blue-500 ring-2 ring-blue-200',
          today: 'bg-blue-50 text-blue-600',
          default: 'text-gray-700 hover:bg-gray-100',
        },
        disabled: {
          true: 'opacity-50 cursor-not-allowed',
          false: 'cursor-pointer',
        },
      },
      defaultVariants: {
        state: 'default',
      },
    }
  )

  const durationButtonVariants = cva(
    'p-2 rounded-lg text-xs font-medium transition-all cursor-pointer',
    {
      variants: {
        selected: {
          true: 'bg-blue-100 text-blue-600 ring-2 ring-blue-400',
          false: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        },
      },
      defaultVariants: {
        selected: false,
      },
    }
  )

  const timeButtonVariants = cva(
    'p-1 text-sm font-medium rounded-lg transition-all cursor-pointer',
    {
      variants: {
        selected: {
          true: 'bg-blue-500 text-white',
          false: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200',
        },
      },
      defaultVariants: {
        selected: false,
      },
    }
  )

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Adjust so Monday is 0, Sunday is 6
    const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

    return { daysInMonth, adjustedStartDay }
  }

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1))
  }

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(today, date)
  }

  const { daysInMonth, adjustedStartDay } = getDaysInMonth(currentDate)

  const days = []
  for (let i = 0; i < adjustedStartDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isSelected = isSameDay(selectedDate, date)
    const isTodayDate = isToday(date)
    const isDisabled = date <= new Date();
    const state = isSelected ? 'selected' : isTodayDate ? 'today' : 'default'

    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(date)}
        className={dayButtonVariants({ state, disabled: isDisabled })}
        disabled={isDisabled}
      >
        {day}
      </button>
    )
  }

  const handleSelectDatetime = () => {
    if (selectedDate && selectedTime) {
      const datetime = new Date(selectedDate.setHours(Number(selectedTime.split(':')[0]), Number(selectedTime.split(':')[1])))
      onSelectDatetime?.(datetime)
    }
  }

  useEffect(() => {
    handleSelectDatetime()
  }, [selectedTime])

  return (
    <div className={cn('flex lg:flex-row flex-col gap-8 mb-10 bg-white items-start justify-center')}>
      {/* Calendar Section */}
      <div className="flex-1 min-w-[320px] max-w-[400px] max-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4 -ml-5">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {days}
        </div>
        {selectedDate && selectedTime && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-2">Selected:</h4>
            <p className="text-sm text-gray-700">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-sm text-gray-700">
              Time: {selectedTime} ({classDuration} minutes)
            </p>
          </div>
        )}
      </div>

      {/* Time Selection Section */}
      <div className="w-80 flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Class duration</h3>
          <div className="flex gap-3">
            {[30, 45, 60, 90].map(duration => (
              <button
                key={duration}
                onClick={() => setClassDuration(duration)}
                className={durationButtonVariants({ selected: classDuration === duration })}
              >
                {duration} minutes
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lesson schedule</h3>
          {selectedDate ? (
            <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={timeButtonVariants({ selected: selectedTime === time })}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm italic">
              Please select a date first
            </div>
          )}
        </div>


      </div>
    </div>
  )
}