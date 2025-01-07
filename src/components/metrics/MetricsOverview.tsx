import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { adjustValueForTimePeriod } from "@/utils/timeAdjustments";

interface MetricsOverviewProps {
  selectedRegions: Set<string>;
}

export const MetricsOverview = ({ selectedRegions }: MetricsOverviewProps) => {
  const metrics = [
    {
      title: "STEAM",
      value: "70,100",
      label: "Number of students enrolled",
      color: "bg-blue-100",
      breakdown: [
        { label: "EMEA", value: "19000" },
        { label: "APJC", value: "18000" },
        { label: "AMER", value: "33100" },
      ],
    },
    {
      title: "Skills Development",
      value: "525",
      label: "Number of people trained",
      color: "bg-cyan-100",
      breakdown: [
        { label: "EMEA", value: "140" },
        { label: "APJC", value: "120" },
        { label: "AMER", value: "265" },
      ],
    },
    {
      title: "Sustainability",
      value: "102,000",
      label: "Number of planted trees",
      color: "bg-yellow-100",
      breakdown: [
        { label: "EMEA", value: "27000" },
        { label: "APJC", value: "25000" },
        { label: "AMER", value: "50000" },
      ],
    },
    {
      title: "Social Impact",
      value: "131,415",
      label: "Number of people impacted",
      color: "bg-purple-100",
      breakdown: [
        { label: "EMEA", value: "33150" },
        { label: "APJC", value: "32000" },
        { label: "AMER", value: "66265" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className={`p-6 ${metric.color}`}>
            <h3 className="text-sm font-medium text-gray-900">{metric.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              {metric.value}
            </p>
            <div className="space-y-1">
              {metric.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};