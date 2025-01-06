import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const programs = [
  {
    name: "STEAM",
    metrics: [
      { label: "Think Big Spaces", value: "12" },
      { label: "Students Reached", value: "5,234" },
      { label: "Training Hours", value: "15,678" },
    ],
  },
  {
    name: "Local Skills Development",
    metrics: [
      { label: "Students Trained", value: "1,234" },
      { label: "Employment Rate", value: "85%" },
      { label: "Value Created", value: "$890K" },
    ],
  },
  {
    name: "Sustainability",
    metrics: [
      { label: "Water Saved", value: "2.3M Gal" },
      { label: "Trees Planted", value: "12,345" },
      { label: "Communities Impacted", value: "45" },
    ],
  },
  {
    name: "Hyperlocal",
    metrics: [
      { label: "Funds Launched", value: "23" },
      { label: "Recipients", value: "156" },
      { label: "Total Value", value: "$1.2M" },
    ],
  },
  {
    name: "Volunteering",
    metrics: [
      { label: "Projects", value: "89" },
      { label: "Volunteer Hours", value: "12,345" },
      { label: "Unique Volunteers", value: "890" },
    ],
  },
];

export const ProgramOverview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Program Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 card-hover">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                <div className="space-y-3">
                  {program.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{metric.label}</span>
                      <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};