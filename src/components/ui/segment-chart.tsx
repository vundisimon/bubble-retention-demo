"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector, ResponsiveContainer, Cell, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const segmentData = [
  { 
    name: "VIP Loyalists",
    value: 15,
    revenue: "$125K",
    growth: "+22%",
    fill: "#F7B928",
    details: "4+ purchases, AOV $285"
  },
  { 
    name: "Subscription Champions",
    value: 12,
    revenue: "$98K",
    growth: "+18%",
    fill: "#10B981",
    details: "Active in 2+ programs"
  },
  { 
    name: "Rising Stars",
    value: 18,
    revenue: "$75K",
    growth: "+15%",
    fill: "#6366F1",
    details: "2-3 purchases, high engagement"
  },
  { 
    name: "At-Risk High-Value",
    value: 8,
    revenue: "$45K",
    growth: "-5%",
    fill: "#EC4899",
    details: "No purchase in 60 days"
  },
  { 
    name: "Loyalty Opportunities",
    value: 22,
    revenue: "$65K",
    growth: "+8%",
    fill: "#8B5CF6",
    details: "Not in loyalty program"
  },
  { 
    name: "New Customers",
    value: 25,
    revenue: "$55K",
    growth: "New",
    fill: "#2DD4BF",
    details: "First purchase in 30 days"
  },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#333] p-3 rounded-lg shadow-lg">
        <p className="font-medium text-white">{data.name}</p>
        <p className="text-sm text-gray-300">Segment Size: {data.value}%</p>
        <p className="text-sm text-gray-300">Revenue: {data.revenue}</p>
        <p className="text-sm text-gray-300">Growth: {data.growth}</p>
        <p className="text-sm text-gray-300">{data.details}</p>
      </div>
    );
  }
  return null;
};

export function SegmentChart() {
  return (
    <Card className="flex flex-col bg-[#212121] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Customer Segmentation Analysis</CardTitle>
        <CardDescription className="text-gray-400">Distribution & Performance Metrics</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={segmentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {segmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          VIP & Subscription segments up 20% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-gray-400">
          Total customer base: 25,000 | Total Revenue: $463K
        </div>
      </CardFooter>
    </Card>
  )
}
