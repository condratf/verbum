'use client'
import { Button } from "@/components/common"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { steps } from "./consts"

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const stepParam = searchParams.get('step')
  const rawStep = stepParam ? parseInt(stepParam, 10) : 1
  const step = Number.isNaN(rawStep) ? 1 : Math.min(Math.max(rawStep, 1), steps.length)

  const setStep = (nextStep: number) => {
    const clamped = Math.min(Math.max(nextStep, 1), steps.length)
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', String(clamped))
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div>
      <OnboardingHeader step={step} setStep={setStep} />
      <div className="flex justify-center p-5 my-5 w-full">
        {children}
      </div>
      <OnboardingFooter step={step} setStep={setStep} />
    </div>
  )
}

const OnboardingFooter = ({ step, setStep }: { step: number, setStep: (step: number) => void }) => {
  const isFirst = step <= 1
  const isLast = step >= steps.length

  return <div className="w-full mt-auto">
    <div className="flex justify-between w-[40%] mx-auto mb-10 p-2 border border-gray-200 rounded-full min-w-[320px]">
      <Button
        variant="ghost"
        className="!rounded-full"
        onClick={() => !isFirst && setStep(step - 1)}
        disabled={isFirst}
      >
        Back
      </Button>
      <Button
        className="!rounded-full"
        onClick={() => !isLast && setStep(step + 1)}
        disabled={isLast}
      >
        Next
      </Button>
    </div>
  </div>
}

const OnboardingHeader = ({ step, setStep }: { step: number, setStep: (step: number) => void }) => {
  return (
    <div className="w-full p-2">
      <div className="flex justify-between w-[20%] mx-auto p-2 border border-gray-200 rounded-full min-w-[320px]">
        {steps.map((st, index) => (
          <Button key={st.title} variant={(index + 1) === step ? 'secondary' : 'ghost'} className="!rounded-full" onClick={() => setStep(index + 1)}>
            {st.title}
          </Button>
        ))}
      </div>
    </div>
  )
}

