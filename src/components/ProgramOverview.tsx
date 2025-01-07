import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProgramOverviewProps {
  selectedRegions?: Set<string>;
}

const programs = [
  {
    name: "STEAM",
    ytdInvestment: "$2.5M",
    subPrograms: [
      {
        name: "Think Big Space",
        metrics: [
          { label: "Number of spaces", value: "12", goal: "15" },
          { label: "Number of students", value: "5,234", goal: "6,000" },
          { label: "Hours of STEAM training", value: "15,678", goal: "20,000" },
        ],
      },
      {
        name: "Mobile Think Big Space",
        metrics: [
          { label: "Number of spaces", value: "8", goal: "10" },
          { label: "Number of students", value: "3,456", goal: "4,000" },
          { label: "Hours of STEAM training", value: "10,234", goal: "12,000" },
        ],
      },
      {
        name: "Offline coding",
        metrics: [
          { label: "Number of students", value: "2,345", goal: "3,000" },
          { label: "Hours of STEAM training", value: "8,567", goal: "10,000" },
          { label: "Projects completed", value: "156", goal: "200" },
        ],
      },
      {
        name: "Think Big Circle",
        metrics: [
          { label: "Active participants", value: "890", goal: "1,000" },
          { label: "Online sessions", value: "234", goal: "300" },
        ],
      },
      {
        name: "Other STEAM sponsorships",
        metrics: [
          { label: "Number of students", value: "1,234", goal: "1,500" },
          { label: "Hours of sessions", value: "4,567", goal: "5,000" },
        ],
      },
    ],
  },
  {
    name: "Local Skills Development",
    ytdInvestment: "$1.8M",
    subPrograms: [
      {
        name: "Data Center Technician Training",
        metrics: [
          { label: "Students trained", value: "456", goal: "500" },
          { label: "Students employed", value: "389", goal: "425" },
          { label: "Employment value created", value: "$2.3M", goal: "$2.5M" },
        ],
      },
      {
        name: "Other IT skills programs",
        metrics: [
          { label: "Students trained", value: "789", goal: "1,000" },
          { label: "Students employed", value: "634", goal: "800" },
          { label: "Employment value created", value: "$3.1M", goal: "$3.5M" },
        ],
      },
      {
        name: "Non IT skilling programs",
        metrics: [
          { label: "Community members trained", value: "1,234", goal: "1,500" },
          { label: "Local business value", value: "$890K", goal: "$1M" },
        ],
      },
    ],
  },
  {
    name: "Sustainability",
    ytdInvestment: "$3.2M",
    subPrograms: [
      {
        name: "Water programs",
        metrics: [
          { label: "Gallons benefiting communities", value: "2.3M", goal: "2.5M" },
          { label: "Community members benefited", value: "45,678", goal: "50,000" },
          { label: "Villages/Counties benefited", value: "89", goal: "100" },
        ],
      },
      {
        name: "Renewable energy programs",
        metrics: [
          { label: "MW energy generated", value: "45", goal: "50" },
          { label: "Buildings supported", value: "234", goal: "250" },
          { label: "Community members benefited", value: "12,345", goal: "15,000" },
        ],
      },
      {
        name: "Biodiversity projects",
        metrics: [
          { label: "Trees planted", value: "12,345", goal: "15,000" },
          { label: "Species protected", value: "45", goal: "50" },
          { label: "Area protected (acres)", value: "890", goal: "1,000" },
          { label: "Carbon offset (tons)", value: "2,345", goal: "2,500" },
        ],
      },
    ],
  },
  {
    name: "Hyperlocal",
    ytdInvestment: "$1.5M",
    subPrograms: [
      {
        name: "Community fund",
        metrics: [
          { label: "Funds launched", value: "23", goal: "25" },
          { label: "Fund recipients", value: "156", goal: "175" },
          { label: "Total value", value: "$1.2M", goal: "$1.5M" },
          { label: "Community beneficiaries", value: "34,567", goal: "40,000" },
          { label: "Economic value created", value: "$2.3M", goal: "$2.5M" },
        ],
      },
      {
        name: "Community Infrastructure",
        metrics: [
          { label: "Project value", value: "$890K", goal: "$1M" },
          { label: "Beneficiaries", value: "23,456", goal: "25,000" },
          { label: "Villages/Counties benefited", value: "45", goal: "50" },
          { label: "Facilities improved", value: "78", goal: "100" },
        ],
      },
    ],
  },
  {
    name: "Volunteering",
    ytdInvestment: "$500K",
    subPrograms: [
      {
        name: "Take on a cause",
        metrics: [
          { label: "Projects", value: "89", goal: "100" },
          { label: "Volunteer events", value: "234", goal: "250" },
          { label: "Volunteer hours", value: "12,345", goal: "15,000" },
          { label: "Unique volunteers", value: "890", goal: "1,000" },
          { label: "Communities impacted", value: "45", goal: "50" },
        ],
      },
    ],
  },
  {
    name: "Sentiment & Social Impact",
    ytdInvestment: "$300K",
    subPrograms: [
      {
        name: "Social Media",
        metrics: [
          { label: "Partner posts", value: "450", goal: "500" },
          { label: "AWS volunteer posts", value: "320", goal: "400" },
          { label: "Beneficiary posts", value: "280", goal: "300" },
          { label: "LinkedIn posts", value: "180", goal: "200" },
        ],
      },
      {
        name: "Print Media",
        metrics: [
          { label: "Print ads", value: "45", goal: "50" },
          { label: "Local media coverage", value: "65", goal: "75" },
          { label: "Paid articles", value: "28", goal: "30" },
          { label: "Earned articles", value: "92", goal: "100" },
        ],
      },
      {
        name: "Surveys",
        metrics: [
          { label: "Partner surveys", value: "150", goal: "175" },
          { label: "Stakeholder surveys", value: "85", goal: "100" },
        ],
      },
    ],
  },
];

export const ProgramOverview = ({ selectedRegions }: ProgramOverviewProps) => {
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
                <div className="border-b pb-2">
                  <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                  <p className="text-sm text-gray-500">YTD Investment: {program.ytdInvestment}</p>
                </div>
                <div className="space-y-4">
                  {program.subPrograms.map((subProgram) => (
                    <div key={subProgram.name} className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">{subProgram.name}</h4>
                      <div className="space-y-1">
                        {subProgram.metrics.map((metric) => (
                          <div key={metric.label} className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">{metric.label}</span>
                            <div className="flex gap-2">
                              <span className="text-gray-900">{metric.value}</span>
                              <span className="text-gray-400">|</span>
                              <span className="text-gray-500">Goal: {metric.goal}</span>
                            </div>
                          </div>
                        ))}
                      </div>
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
