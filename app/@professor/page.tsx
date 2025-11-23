import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      className={cn(
        "min-h-screen w-full bg-slate-50 p-2",
      )}
    >
      <div
        className={cn("flex lg:flex-row flex-col items-center justify-center gap-4")}
      >
        {/* Next lessons */}
        <section className="flex w-full h-[300px] flex-col rounded-xl bg-white px-6 py-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-base">
              ⏰
            </span>
            <span>Next lessons</span>
          </div>
          <p className="mb-4 text-sm text-slate-600">
            Go to Schedule page to see all lessons
          </p>
          <Link
            href="/schedule"
            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            <span>Schedule</span>
            <span aria-hidden>→</span>
          </Link>
        </section>

        {/* Lessons to report - empty state */}
        <section className="flex w-full h-[300px] flex-col items-center justify-center rounded-xl bg-white px-6 py-8 text-center shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-base">
              📅
            </span>
            <span>Lessons to report</span>
          </div>
          <div className="mt-4 flex h-40 w-full max-w-xs flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60">
            <div className="mb-3 h-10 w-24 rounded-md bg-slate-200/80" />
            <span className="text-xs text-slate-400">empty-states.no-lessons-score</span>
          </div>
        </section>

        {/* Credits in the last 2 weeks */}
        <section className="flex w-full h-[300px] flex-col gap-3 rounded-xl bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-base">
                💳
              </span>
              <span>Credits in the last 2 weeks</span>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">Groups</span>
              <span className="text-lg font-semibold text-slate-900">22</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">Individual</span>
              <span className="text-lg font-semibold text-slate-900">46</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">Trial</span>
              <span className="text-lg font-semibold text-slate-900">0</span>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Link
              href="/credits"
              className="text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              Go to Credits
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
