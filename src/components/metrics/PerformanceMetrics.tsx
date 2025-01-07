import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface PerformanceMetricsProps {
  selectedRegions: Set<string>;
}

export const PerformanceMetrics = ({ selectedRegions }: PerformanceMetricsProps) => {
  const performanceData = [
    { metric: "What", value: 2.3 },
    { metric: "Who", value: 1.9 },
    { metric: "How much", value: 2.1 },
    { metric: "Contribution", value: 2.0 },
    { metric: "Low risk", value: 2.3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Funds invested</p>
            <p className="text-xl font-semibold">$15,573,835</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Funds executed</p>
            <p className="text-xl font-semibold">$11,726,619</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total direct beneficiaries</p>
            <p className="text-xl font-semibold">144,126</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Hours of volunteering</p>
            <p className="text-xl font-semibold">17,329</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">IMP Impact Dimensions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <Radar
                name="Impact"
                dataKey="value"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};