'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icon } from "@/components/common";
import { SelectableCard } from "@/components/common";
import { useModal } from "@/services/modal";


export default function CreditsPage() {
  const [totalCredits, setTotalCredits] = useState(0);
  const { open } = useModal();

  useEffect(() => {
    (async () => {
      const data = await getStudentCredits();
      setTotalCredits(data.total);
    })()

  }, []);


  return (
    <div className="p-4">
      <SelectableCard
        title="Your Credits"
        description="Your credits balance"
        icon={<Icon icon="money_bag" />}
        isSelected={true}
        onClick={() => { }}
        total={totalCredits}
      />

      <div className="mt-6">
        <Button
          variant="default"
          onClick={() =>
            open("buy-credits", {
              title: "Buy Credits",
              content: <BuyCreditsModal />,
              maxWidth: "max-w-5xl",
            })
          }
        >
          Buy Credits
        </Button>
      </div>
    </div>
  )
}

async function getStudentCredits() {
  return {
    total: 50
  }
}

const CREDIT_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "40,00€",
    hours: "4 hours",
    credits: "8 credits",
  },
  {
    id: "standard",
    name: "Standard",
    price: "80,00€",
    hours: "8 hours",
    credits: "16 credits",
  },
  {
    id: "premium",
    name: "Premium",
    price: "120,00€",
    hours: "12 hours",
    credits: "24 credits",
  },
] as const;

type CreditPlan = (typeof CREDIT_PLANS)[number];

const BuyCreditsModal = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {CREDIT_PLANS.map((plan: CreditPlan) => (
          <Card
            key={plan.id}
            className="flex h-full flex-col rounded-3xl border-slate-200 bg-white px-6 pb-6 pt-5 shadow-md"
          >
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">
                {plan.name}
              </CardTitle>
              <CardDescription className="mt-4 flex items-baseline gap-1 text-3xl font-semibold text-slate-900">
                <span>{plan.price}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 px-0">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Icon icon="schedule" className="text-slate-500" size={18} />
                  <span>{plan.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="credit_card" className="text-slate-500" size={18} />
                  <span>{plan.credits}</span>
                </div>
              </div>

              <div className="my-5 h-px w-full bg-slate-200" />

              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Icon icon="check_circle" className="text-sky-600" size={18} />
                  <span>Audio lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="check_circle" className="text-sky-600" size={18} />
                  <span>Custom learning routines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="check_circle" className="text-sky-600" size={18} />
                  <span>On demand lessons</span>
                </li>
              </ul>
            </CardContent>

            <CardFooter className="mt-4 px-0">
              <Button className="w-full rounded-full py-5 text-sm font-semibold text-white hover:bg-red-600">
                Buy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}