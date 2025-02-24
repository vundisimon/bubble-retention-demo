import { InfoIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function KeyInsights() {
  return (
    <Card className="bg-black border-zinc-800">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Key Insights</h2>
        <div className="flex gap-4 items-start">
          <div className="mt-1">
            <InfoIcon className="h-5 w-5 text-zinc-400" />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-zinc-200">
              Email open and click-through rates have remained relatively stable over the past 6 months, with a slight uptick in April.
            </p>
            <p className="text-zinc-400">
              This suggests consistent customer engagement through the email channel.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 