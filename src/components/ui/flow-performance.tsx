"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

// Reusing the same data structure for now - you can modify this later
const chartData = [
  { month: "Jan", clickRate: 75, openRate: 65, orderRate: 45 },
  { month: "Feb", clickRate: 50, openRate: 45, orderRate: 35 },
  { month: "Mar", clickRate: 80, openRate: 70, orderRate: 55 },
  { month: "Apr", clickRate: 65, openRate: 55, orderRate: 40 },
  { month: "May", clickRate: 70, openRate: 60, orderRate: 45 },
  { month: "Jun", clickRate: 45, openRate: 40, orderRate: 30 },
]

const chartConfig = {
  clickRate: {
    label: "Click Rate",
    color: "hsl(217, 91%, 60%)"
  },
  openRate: {
    label: "Open Rate",
    color: "hsl(214, 32%, 91%)"
  },
  orderRate: {
    label: "Place Order Rate",
    color: "hsl(0, 0%, 100%)"
  },
} satisfies ChartConfig

const MetricCard = ({ value, label, change }: { value: string, label: string, change: number }) => (
  <div className="flex flex-col gap-1">
    <div className="text-2xl font-semibold">{value}</div>
    <div className="text-sm text-zinc-400">{label}</div>
    <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {change >= 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
      {Math.abs(change)}%
    </div>
  </div>
)

export function FlowPerformance() {
  return (
    <Card className="bg-black border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Flow Performance</CardTitle>
        <div className="text-sm text-zinc-400">Total Recipients</div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-[1fr,auto] gap-8">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              height={300}
            >
              <CartesianGrid 
                vertical={false} 
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="4"
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a' }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="clickRate"
                stackId="a"
                fill="var(--color-clickRate)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="openRate"
                stackId="a"
                fill="var(--color-openRate)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="orderRate"
                stackId="a"
                fill="var(--color-orderRate)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>

          {/* Metrics */}
          <div className="flex flex-col gap-8">
            <MetricCard value="3,456" label="Click Rate" change={2.5} />
            <MetricCard value="$30,980" label="Open Rate" change={-2.5} />
            <MetricCard value="102,990" label="Place Order Rate" change={0.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 