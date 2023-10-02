"use client";
import {
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  ComposedChart,
  CartesianGrid,
} from "recharts";

const aggregateLeaveByRole = (data) => {
  const aggregatedData = {};

  data.forEach(({ name, leave, role }) => {
    if (role !== "") {
      if (!aggregatedData[name]) {
        aggregatedData[name] = {
          month: name,
          staffLeave: role === "staff" ? leave : 0,
          facultyLeave: role === "faculty" ? leave : 0,
        };
      } else {
        aggregatedData[name].staffLeave += role === "staff" ? leave : 0;
        aggregatedData[name].facultyLeave += role === "faculty" ? leave : 0;
      }
    }
  });

  return Object.values(aggregatedData);
};

const LineChartComponent = ({ userOverview }) => {
  const aggregatedData = aggregateLeaveByRole(userOverview);

  return (
    <ResponsiveContainer height={380} className="col-span-4">
      <ComposedChart width={500} height={300} data={aggregatedData}>
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="staffLeave"
          stroke="gray"
          name="Staff Leave"
        />
        <Line
          type="monotone"
          dataKey="facultyLeave"
          stroke="green"
          name="Faculty Leave"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
