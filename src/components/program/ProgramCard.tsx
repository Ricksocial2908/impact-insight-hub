import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Program } from "@/types/programs";
import { adjustValueForTimePeriod } from "@/utils/timeAdjustments";
import { SubProgramSection } from "./SubProgramSection";

interface ProgramCardProps {
  program: Program;
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
          <div className="space-y-6">
            {program.subPrograms.map((subProgram) => (
              <SubProgramSection
                key={subProgram.name}
                subProgram={subProgram}
                timePeriod={timePeriod}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};