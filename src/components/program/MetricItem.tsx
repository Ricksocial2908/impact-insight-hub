import { Metric } from "@/types/programs";
import { adjustValueForTimePeriod } from "@/utils/timeAdjustments";
import { ProgressGraph } from "./ProgressGraph";

interface MetricItemProps {
  metric: Metric;
  timePeriod: 'month' | 'quarter' | 'year';
}

export const MetricItem = ({ metric, timePeriod }: MetricItemProps) => {
  const adjustedValue = adjustValueForTimePeriod(metric.value, timePeriod);
  const adjustedGoal = adjustValueForTimePeriod(metric.goal, timePeriod);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">{metric.label}</span>
        <span className="text-gray-900">{adjustedValue}</span>
      </div>
      <ProgressGraph 
        value={adjustedValue} 
        goal={adjustedGoal} 
        timePeriod={timePeriod}
      />
    </div>
  );
};