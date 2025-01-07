import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { calculateRegionalMetrics } from "../utils/regionData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DashboardMetricsProps {
  selectedRegions: Set<string>;
}

type TimePeriod = 'month' | 'quarter' | 'year';

export const DashboardMetrics = ({ selectedRegions }: DashboardMetricsProps) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('year');
  const regionalData = calculateRegionalMetrics(selectedRegions, timePeriod);

  // Aggregate metrics across selected regions
  const aggregatedMetrics = {
    totalInvestment: regionalData.reduce((sum, region) => sum + region.metrics.totalInvestment, 0),
    beneficiaries: regionalData.reduce((sum, region) => sum + region.metrics.beneficiaries, 0),
    volunteerHours: regionalData.reduce((sum, region) => sum + region.metrics.volunteerHours, 0),
    projects: regionalData.reduce((sum, region) => sum + region.metrics.projects, 0),
  };

  // Aggregate program distribution
  const programDistribution = regionalData.reduce((acc, region) => {
    region.programDistribution.forEach(prog => {
      const existing = acc.find(p => p.name === prog.name);
      if (existing) {
        existing.value += prog.value;
      } else {
        acc.push({ ...prog });
      }
    });
    return acc;
  }, [] as { name: string; value: number }[]);

  // Aggregate impact metrics
  const impactMetrics = regionalData.reduce((acc, region) => {
    region.impactMetrics.forEach(metric => {
      const existing = acc.find(m => m.name === metric.name);
      if (existing) {
        existing.value += metric.value;
      } else {
        acc.push({ ...metric });
      }
    });
    return acc;
  }, [] as { name: string; value: number }[]);

  const metrics = [
    {
      title: "Total Investment",
      value: `$${(aggregatedMetrics.totalInvestment / 1000000).toFixed(1)}M`,
      change: "+15%",
      positive: true,
    },
    {
      title: "Total Beneficiaries",
      value: aggregatedMetrics.beneficiaries.toLocaleString(),
      change: "+12%",
      positive: true,
    },
    {
      title: "Volunteer Hours",
      value: aggregatedMetrics.volunteerHours.toLocaleString(),
      change: "+8%",
      positive: true,
    },
    {
      title: "Projects",
      value: aggregatedMetrics.projects.toString(),
      change: "+5%",
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Select
          value={timePeriod}
          onValueChange={(value: TimePeriod) => setTimePeriod(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="h-64">
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
    </div>
  );
};
