import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  {
    title: "Total Students",
    value: "15,234",
    change: "+12%",
    positive: true,
  },
  {
    title: "Volunteer Hours",
    value: "45,678",
    change: "+8%",
    positive: true,
  },
  {
    title: "Community Impact",
    value: "$2.3M",
    change: "+15%",
    positive: true,
  },
  {
    title: "Projects",
    value: "234",
    change: "+5%",
    positive: true,
  },
];

const socialMetrics = [
  { name: "Partner Posts", value: 450 },
  { name: "AWS Volunteer Posts", value: 320 },
  { name: "Beneficiary Posts", value: 280 },
  { name: "LinkedIn Posts", value: 180 },
  { name: "Print Ads", value: 45 },
  { name: "Local Media", value: 65 },
  { name: "Paid Articles", value: 28 },
  { name: "Earned Articles", value: 92 },
  { name: "Partner Surveys", value: 150 },
  { name: "Stakeholder Surveys", value: 85 },
];

const chartData = [
  { name: "STEAM", value: 4000 },
  { name: "Skills", value: 3000 },
  { name: "Sustainability", value: 2000 },
  { name: "Hyperlocal", value: 2780 },
  { name: "Volunteering", value: 1890 },
];

export const DashboardMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 card-hover">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <span className={`ml-2 text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Program Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment & Social Impact Metrics</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={socialMetrics} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};