import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart as BarChartIcon, Users, Clock, FolderGit2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { calculateRegionalMetrics } from "../utils/regionData";
import { adjustValueForTimePeriod, getTimeMultiplier } from "../utils/timeAdjustments";
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
  const timeMultiplier = getTimeMultiplier(timePeriod);

  // Aggregate metrics across selected regions
  const aggregatedMetrics = {
    totalInvestment: regionalData.reduce((sum, region) => sum + region.metrics.totalInvestment, 0) * timeMultiplier,
    beneficiaries: Math.round(regionalData.reduce((sum, region) => sum + region.metrics.beneficiaries, 0) * timeMultiplier),
    volunteerHours: Math.round(regionalData.reduce((sum, region) => sum + region.metrics.volunteerHours, 0) * timeMultiplier),
    projects: Math.round(regionalData.reduce((sum, region) => sum + region.metrics.projects, 0) * timeMultiplier),
  };

  // Adjust program distribution data
  const programDistribution = regionalData.reduce((acc, region) => {
    region.programDistribution.forEach(prog => {
      const existing = acc.find(p => p.name === prog.name);
      if (existing) {
        existing.value += prog.value * timeMultiplier;
      } else {
        acc.push({ ...prog, value: prog.value * timeMultiplier });
      }
    });
    return acc;
  }, [] as { name: string; value: number }[]);

  // Adjust impact metrics data
  const impactMetrics = regionalData.reduce((acc, region) => {
    region.impactMetrics.forEach(metric => {
      const existing = acc.find(m => m.name === metric.name);
      if (existing) {
        existing.value += metric.value * timeMultiplier;
      } else {
        acc.push({ ...metric, value: metric.value * timeMultiplier });
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
      icon: <BarChartIcon className="w-4 h-4 text-primary" />,
    },
    {
      title: "Total Beneficiaries",
      value: aggregatedMetrics.beneficiaries.toLocaleString(),
      change: "+12%",
      positive: true,
      icon: <Users className="w-4 h-4 text-primary" />,
    },
    {
      title: "Volunteer Hours",
      value: aggregatedMetrics.volunteerHours.toLocaleString(),
      change: "+8%",
      positive: true,
      icon: <Clock className="w-4 h-4 text-primary" />,
    },
    {
      title: "Projects",
      value: aggregatedMetrics.projects.toString(),
      change: "+5%",
      positive: true,
      icon: <FolderGit2 className="w-4 h-4 text-primary" />,
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
              <div className="flex items-center gap-3 mb-2">
                {metric.icon}
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              </div>
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
          <div className="flex items-center gap-2 mb-4">
            <BarChartIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900">Program Investment Distribution</h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <BarChartIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900">Key Impact Metrics</h3>
          </div>
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