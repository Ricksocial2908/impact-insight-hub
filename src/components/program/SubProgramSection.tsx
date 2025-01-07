import { SubProgram } from "@/types/programs";
import { MetricItem } from "./MetricItem";
import { motion } from "framer-motion";

interface SubProgramSectionProps {
  subProgram: SubProgram;
  timePeriod: 'month' | 'quarter' | 'year';
}

export const SubProgramSection = ({ subProgram, timePeriod }: SubProgramSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-3">
        {subProgram.metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricItem
              label={metric.label}
              value={metric.value}
              goal={metric.goal}
              details={metric.details}
              timePeriod={timePeriod}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};