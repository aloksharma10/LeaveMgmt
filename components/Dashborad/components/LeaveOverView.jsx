"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 11 //leave total in month,
  },
  {
    name: "Feb",
    total: 11 //leave total in month,
  },
  {
    name: "Mar",
    total: 11 //leave total in month,
  },
  {
    name: "Apr",
    total: 11 //leave total in month,
  },
  {
    name: "May",
    total: 11 //leave total in month,
  },
  {
    name: "Jun",
    total: 11 //leave total in month,
  },
  {
    name: "Jul",
    total: 11 //leave total in month,
  },
  {
    name: "Aug",
    total: 11 //leave total in month,
  },
  {
    name: "Sep",
    total: 11 //leave total in month,
  },
  {
    name: "Oct",
    total: 11 //leave total in month,
  },
  {
    name: "Nov",
    total: 11 //leave total in month,
  },
  {
    name: "Dec",
    total: 11 //leave total in month,
  },
]

export default function LeaveOverView() {
  return (
    <ResponsiveContainer height={350} className="col-span-4">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}