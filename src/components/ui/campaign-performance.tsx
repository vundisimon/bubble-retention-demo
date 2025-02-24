"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface MetricProps {
  value: string
  label: string
  change: number
}

const Metric = ({ value, label, change }: MetricProps) => (
  <div className="flex flex-col gap-1">
    <div className="text-2xl font-semibold text-white">{value}</div>
    <div className="text-sm text-zinc-400">{label}</div>
    <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
      {change >= 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
      {Math.abs(change)}%
    </div>
  </div>
)

const chartData = [
  { month: "Jan", orders: 65, revenue: 55, conversion: 45 },
  { month: "Feb", orders: 45, revenue: 40, conversion: 35 },
  { month: "Mar", orders: 70, revenue: 60, conversion: 50 },
  { month: "Apr", orders: 55, revenue: 45, conversion: 40 },
  { month: "May", orders: 60, revenue: 50, conversion: 45 },
  { month: "Jun", orders: 45, revenue: 40, conversion: 35 },
]

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(216, 100%, 65%)" // Bright blue
  },
  revenue: {
    label: "Revenue",
    color: "hsl(217, 91%, 85%)" // Light blue
  },
  conversion: {
    label: "Conversion",
    color: "hsl(0, 0%, 100%)" // White
  }
} satisfies ChartConfig

interface CampaignPerformanceProps {
  title: string
  metrics: string[]
  values: string[]
  changes: number[]
}

export function CampaignPerformance({ 
  title = "Shopify Performance",
  metrics = ["Orders", "Revenue", "Conversion"],
  values = ["3,456", "$30,980", "102,990"],
  changes = [2.5, -2.5, 0.5]
}: CampaignPerformanceProps) {
  return (
    <Card className="bg-black border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="text-sm text-zinc-400">Total Recipients</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {/* Chart Legend */}
            <div className="flex gap-4 mb-4">
              {metrics.map((metric, index) => (
                <div key={metric} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: index === 0 
                        ? "hsl(216, 100%, 65%)" 
                        : index === 1 
                        ? "hsl(217, 91%, 85%)" 
                        : "white" 
                    }} 
                  />
                  <span className="text-sm text-zinc-400">{metric}</span>
                </div>
              ))}
            </div>

            <ChartContainer config={chartConfig}>
              <BarChart 
                data={chartData} 
                margin={{ top: 0, right: 0, bottom: 0, left: -32 }}
                height={300}
              >
                <CartesianGrid 
                  horizontal
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#71717a' }}
                />
                <Bar
                  dataKey="orders"
                  stackId="a"
                  fill="hsl(216, 100%, 65%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="revenue"
                  stackId="a"
                  fill="hsl(217, 91%, 85%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="conversion"
                  stackId="a"
                  fill="white"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Metrics */}
          <div className="flex flex-col gap-8">
            <Metric value={values[0]} label={metrics[0]} change={changes[0]} />
            <Metric value={values[1]} label={metrics[1]} change={changes[1]} />
            <Metric value={values[2]} label={metrics[2]} change={changes[2]} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 