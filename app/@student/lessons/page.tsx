"use client"

import { Button } from "@/components/common"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"
import { CalendarIcon } from "lucide-react"

export default function LessonsPage() {
    return (
        <div className="p-4" >
            <h1 className="font-bold text-4xl mb-10">Your Lessons</h1>

            <div>
                <Tabs defaultValue="scheduled">
                    <TabsList className="flex gap-2 ">
                        <TabsTrigger value="scheduled" className="cursor-pointer text-lg font-semibold">Scheduled lessons</TabsTrigger>
                        {/* <TabsTrigger value="toRate" className="cursor-pointer text-lg font-semibold">Lessons to rate</TabsTrigger>
                        <TabsTrigger value="history" className="cursor-pointer text-lg font-semibold">History lessons</TabsTrigger> */}
                        <TabsTrigger value="trial" className="cursor-pointer text-lg font-semibold">Trial lessons</TabsTrigger>
                    </TabsList>

                    <div className="border-b border-gray-200" />

                    <TabsContent value="scheduled">
                        <div className="flex items-center justify-center w-full min-h-[35vh]">
                        <Button variant="secondary">
                            <Link href="/schedule">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" /> Book a lesson 
                            </div>
                            </Link>
                        </Button>
                        </div>
                    </TabsContent>
                    {/* <TabsContent value="toRate"></TabsContent>
                    <TabsContent value="history"></TabsContent> */}
                    <TabsContent value="trial"></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}