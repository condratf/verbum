'use client'
import { Button } from "@/components/common"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { goals, languages, levels, hoursOptions } from "./consts"
import { handleSubmit } from "./actions"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const language = searchParams.get('language')
  const step = Number(searchParams.get('step')) || 1;
  const [selectedLevel, setSelectedLevel] = useLocalStorage<string>('onboarding.selectedLevel', levels[0].level)
  const [selectedGoal, setSelectedGoal] = useLocalStorage<string>('onboarding.selectedGoal', goals[0].title)
  const [selectedHours, setSelectedHours] = useLocalStorage<string>('onboarding.selectedHours', hoursOptions[0])
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<string>('onboarding.selectedLanguage', languages[0].code)

  const content = {
    1: <LanguageStep selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />,
    2: <LevelStep language={language || 'English'} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />,
    3: <GoalStep selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />,
    4: <HoursStep selectedHours={selectedHours} setSelectedHours={setSelectedHours} />,
  }[step]

  return (
    <form className="w-full" action={() => handleSubmit({ selectedLanguage, selectedLevel })}>
      {content}

      <div className="my-2" />

      {step === 4 && (
        <div className="w-full flex justify-center">
          <Button type="submit" className="!mx-auto">Submit</Button>
        </div>
      )}
    </form>
  )
}

const LanguageStep = ({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string
  setSelectedLanguage: (code: string) => void
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-1">Choose your language</h2>
      <p className="text-sm text-gray-500">Select the language you want to learn</p>
      <div className="my-2" />
      <div className="flex gap-2 w-full min-w-[300px] flex-wrap justify-center">
        {languages.map((item) => (
          <Button
            key={item.code}
            variant="ghost"
            className={cn(
              "w-full py-8 flex flex-col items-center border border-gray-300 max-w-[190px]",
              selectedLanguage === item.code && "!bg-gray-400/60",
            )}
            onClick={() => setSelectedLanguage(item.code)}
          >
            <span className="text-base font-semibold">{item.language}</span>
            <span className="text-lg">{item.symbol}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

const LevelStep = ({ language, selectedLevel, setSelectedLevel }: { language: string; selectedLevel: string; setSelectedLevel: (level: string) => void }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Your {language} Level</h2>
      <p>Choose your current level</p>
      <div className="my-2" />
      <div className="flex flex-col gap-2 w-full">
        {levels.map((level) => (
          <Button key={level.title} variant="secondary" className={cn("w-full p-10 flex flex-col items-start", selectedLevel === level.level && "!bg-gray-400/60")} onClick={() => { setSelectedLevel(level.level) }} >
            <span className="text-lg font-bold">
              {level.level} - {level.title}
            </span>
            <p className="text-sm text-gray-500">
              {level.description}
            </p>
          </Button>
        ))}
      </div>
    </div>
  )
}

const GoalStep = ({ selectedGoal, setSelectedGoal }: { selectedGoal: string; setSelectedGoal: (goal: string) => void }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Your learning goals</h2>
      <p>Select what you want to focus on</p>
      <div className="my-2" />
      <div className="flex flex-col gap-2 w-full">
        {goals.map((goal) => (
          <Button
            key={goal.title}
            variant="ghost"
            className={cn("w-full p-10 flex flex-col items-start border border-gray-300 !rounded-full", selectedGoal === goal.title && "!bg-gray-400/50")}
            onClick={() => { setSelectedGoal(goal.title) }}
          >
            <span className="text-base font-semibold w-full text-center">
              <span className="text-xl mr-2">
                {goal.icon}
              </span>
              {goal.title}
            </span>
            <p className="text-sm text-gray-500 w-full text-center">
              {goal.description}
            </p>
          </Button>
        ))}
      </div>
    </div>
  )
}

const HoursStep = ({ selectedHours, setSelectedHours }: { selectedHours: string; setSelectedHours: (hours: string) => void }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Time commitment</h2>
      <p>How much time can you spend learning?</p>
      <div className="my-2" />
      <div className="flex flex-col gap-2 w-full">
        {hoursOptions.map((label) => (
          <Button
            key={label}
            variant="secondary"
            className={cn("w-full p-10 flex flex-col items-start", selectedHours === label && "!bg-gray-400/60")}
            onClick={() => { setSelectedHours(label) }}
          >
            <span className="font-semibold font-medium">
              {label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
