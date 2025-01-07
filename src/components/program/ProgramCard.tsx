import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SubProgram } from "@/types/programs";

interface ProgramCardProps {
  program: {
    name: string;
    ytdInvestment: string;
    subPrograms: SubProgram[];
  };
  index: number;
  timePeriod: 'month' | 'quarter' | 'year';
}

export const ProgramCard = ({ program, index, timePeriod }: ProgramCardProps) => {
  const getAdjustedValue = (value: string) => {
    if (value.includes('$')) {
      const numValue = parseFloat(value.replace(/[$,M]/g, ''));
      const adjustedValue = timePeriod === 'month' ? 
        numValue / 12 : timePeriod === 'quarter' ? 
        numValue / 4 : numValue;
      return `$${adjustedValue.toFixed(1)}M`;
    }
    const numValue = parseInt(value.replace(/,/g, ''));
    const adjustedValue = timePeriod === 'month' ? 
      Math.round(numValue / 12) : timePeriod === 'quarter' ? 
      Math.round(numValue / 4) : numValue;
    return adjustedValue.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glass-card p-6 card-hover">
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
            <p className="text-sm text-gray-500">
              YTD Investment: {getAdjustedValue(program.ytdInvestment)}
            </p>
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
                        <span className="text-gray-900">
                          {getAdjustedValue(metric.value)}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">
                          Goal: {getAdjustedValue(metric.goal)}
                        </span>
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
  );
};