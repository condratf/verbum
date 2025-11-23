"use client"
import { FC } from "react"

interface TableProps {
  headers: { key: string, title: string }[]
  data: React.ReactNode[][]
}

export const Table: FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
            {headers.map((header, index) => (
              <th
                key={header.key}
                className="bg-white px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg border-b border-slate-200 align-middle"
              >
                <div className="flex items-center gap-1">
                  <span>{header.title}</span>
                  <span className="inline-flex flex-col text-[10px] leading-none text-slate-300">
                    <span className="-mb-[1px]">▲</span>
                    <span>▼</span>
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-3 border-b border-slate-200 align-middle whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
