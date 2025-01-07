import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface GeographyBreakdownProps {
  selectedRegions: Set<string>;
}

export const GeographyBreakdown = ({ selectedRegions }: GeographyBreakdownProps) => {
  const geographyData = [
    {
      name: "AMER",
      investments: 2500000,
      beneficiaries: 45000,
      volunteers: 1200,
    },
    {
      name: "EMEA",
      investments: 1800000,
      beneficiaries: 35000,
      volunteers: 800,
    },
    {
      name: "APJC",
      investments: 1500000,
      beneficiaries: 25000,
      volunteers: 600,
    },
  ];

  const beneficiariesByPillar = [
    { name: "STEAM", value: 40, color: "#10B981" },
    { name: "Skills Development", value: 25, color: "#6366F1" },
    { name: "Sustainability", value: 20, color: "#FBBF24" },
    { name: "Social Impact", value: 15, color: "#A855F7" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Breakdown by geography</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="investments" fill="#10B981" />
              <Bar dataKey="beneficiaries" fill="#6366F1" />
              <Bar dataKey="volunteers" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Beneficiaries by pillar</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={beneficiariesByPillar}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {beneficiariesByPillar.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {beneficiariesByPillar.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};