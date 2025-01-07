import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SubProgram } from "@/types/programs";
import { adjustValueForTimePeriod } from "@/utils/timeAdjustments";

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
              Investment: {adjustValueForTimePeriod(program.ytdInvestment, timePeriod)}
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
                          {adjustValueForTimePeriod(metric.value, timePeriod)}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">
                          Goal: {adjustValueForTimePeriod(metric.goal, timePeriod)}
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