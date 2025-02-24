"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Get last 6 months
const getLastSixMonths = () => {
  const months = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    months.push(date.toLocaleString('default', { month: 'long' }))
  }
  return months
}

// Generate realistic fluctuating data with upward trend
const generateFluctuatingData = (baseValue: number, trend: number, volatility: number) => {
  return Array(6).fill(0).map((_, i) => {
    const trendValue = baseValue + (trend * i)
    const randomFluctuation = (Math.random() - 0.5) * volatility
    return Math.max(0, trendValue + randomFluctuation)
  })
}

const months = getLastSixMonths()
const repeatCustomers = generateFluctuatingData(45, 8, 15)
const newCustomers = generateFluctuatingData(80, -6, 10)
const shopifyRevenue = generateFluctuatingData(100, 12, 20)
const loyaltySubscriptions = generateFluctuatingData(30, 5, 8)
const skioSubscriptions = generateFluctuatingData(20, 7, 10)

const retentionData = months.map((month, i) => ({
  month,
  repeat: repeatCustomers[i],
  newCustomer: newCustomers[i],
  shopifyRevenue: shopifyRevenue[i],
  loyaltySubscriptions: loyaltySubscriptions[i],
  skioSubscriptions: skioSubscriptions[i],
}))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#333] p-3 rounded-lg shadow-lg">
        <p className="font-medium text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RetentionChart() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#212121] text-white">
      <CardHeader>
        <CardTitle>Customer Retention & Revenue Analysis</CardTitle>
        <CardDescription className="text-gray-400">Last 6 Months Performance</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={retentionData}>
            <CartesianGrid vertical={false} stroke="#333" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="#666"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#666"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              name="Repeat Customers"
              type="monotone"
              dataKey="repeat"
              stroke="#F7B928"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="New Customers"
              type="monotone"
              dataKey="newCustomer"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="Shopify Revenue (K)"
              type="monotone"
              dataKey="shopifyRevenue"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="LoyaltyLion Subs"
              type="monotone"
              dataKey="loyaltySubscriptions"
              stroke="#EC4899"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="Skio Subs"
              type="monotone"
              dataKey="skioSubscriptions"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Overall metrics trending up by 18.5% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-gray-400">
              Strong growth in subscriptions and repeat customers
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
