import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  {
    title: "Total Investment",
    value: "$10.1M",
    change: "+15%",
    positive: true,
  },
  {
    title: "Total Beneficiaries",
    value: "156,789",
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
    title: "Projects",
    value: "234",
    change: "+5%",
    positive: true,
  },
];

const programDistribution = [
  { name: "STEAM", value: 2500000 },
  { name: "Skills", value: 1800000 },
  { name: "Sustainability", value: 3200000 },
  { name: "Hyperlocal", value: 1500000 },
  { name: "Volunteering", value: 500000 },
  { name: "Social Impact", value: 300000 },
];

const impactMetrics = [
  { name: "Students Reached", value: 12345 },
  { name: "Employment Created", value: 1023 },
  { name: "Trees Planted", value: 12345 },
  { name: "Water Saved (Gal)", value: 2300000 },
  { name: "Communities Impacted", value: 234 },
  { name: "Volunteer Events", value: 890 },
  { name: "Media Coverage", value: 230 },
  { name: "Partner Engagement", value: 156 },
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Program Investment Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Impact Metrics</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactMetrics} layout="vertical">
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