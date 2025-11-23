'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common";
import { SelectableCard, Table } from "@/components/common";

interface SummaryInterface {
  date: string;
  studentName: string;
  attendance: string;
  credits: number;
  total: number;
}

export default function CreditsPage() {
  const [creditsData, setCreditsData] = useState<{ group: { total: number; summary: SummaryInterface[] } }>();
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());

  useEffect(() => {
    (async () => {
      const data = await getCreditsData();
      setCreditsData(data);
    })()

  }, [currMonth]);

  const headers = [
    { title: "Date", key: "date" },
    { title: "Student Name", key: "studentName" },
    { title: "Attendance", key: "attendance" },
    { title: "Credits", key: "credits" },
    { title: "Total", key: "total" },
  ]

  const handleChangeMonth = (month: number) => {
    setCurrMonth(month < 0 ? 11 : month > 11 ? 0 : month);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-2 mb-4 w-full">
        <Button onClick={() => handleChangeMonth(currMonth - 1)}> <Icon icon="chevron_left" /> </Button>
        <span className="font-bold">{getMonthName(currMonth)}</span>
        <Button onClick={() => handleChangeMonth(currMonth + 1)}> <Icon icon="chevron_right" /> </Button>
      </div>

      <div className="flex justify-between gap-2 w-full">

        <div className="w-full pr-10">
          <h3 className="mb-5 font-semibold">Credits</h3>

          <SelectableCard
            title="Group Classes"
            description="Group classes credits"
            icon={<Icon icon="group" />}
            isSelected={true}
            onClick={() => { }}
            total={creditsData?.group.total || 0}
          />
        </div>

        <div className="w-full">
          <h3 className="mb-5 font-semibold">Summary</h3>

          <Table
            headers={headers}
            data={creditsData?.group.summary.map((item) => [
              item.date,
              item.studentName,
              item.attendance,
              item.credits,
              item.total
            ]) || []}
          />
        </div>

      </div>
    </div>
  )
}

async function getCreditsData() {
  return {
    group: {
      total: 22,
      summary: [
        {
          date: "2025-11-07 15:00",
          studentName: "John Doe",
          attendance: "Attended",
          credits: 2,
          total: 2
        },
        {
          date: "2025-11-07 16:30",
          studentName: "Jane Doe",
          attendance: "Attended",
          credits: 2,
          total: 4
        },
        {
          date: "2025-11-07 13:00",
          studentName: "Bill Brown",
          attendance: "Attended",
          credits: 2,
          total: 6
        },
        {
          date: "2025-11-10 15:30",
          studentName: "Antonia Smith",
          attendance: "Attended",
          credits: 2,
          total: 8
        },
        {
          date: "2025-11-10 21:00",
          studentName: "Berga Varges",
          attendance: "Attended",
          credits: 1,
          total: 9
        },
        {
          date: "2025-11-10 18:00",
          studentName: "Daniel Misopon",
          attendance: "Attended",
          credits: 2,
          total: 11
        }
      ]
    }
  };
}

const getMonthName = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};