import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MetricItemProps {
  label: string;
  value: string;
  goal: string;
  details?: string[];
}

export const MetricItem = ({ label, value, goal, details }: MetricItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const progress = (Number(value.replace(/,/g, "")) / Number(goal.replace(/,/g, ""))) * 100;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex flex-col space-y-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{label}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-gray-600">
                    {value} / {goal}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current value: {value}</p>
                  <p>Goal: {goal}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CollapsibleTrigger>
      
      {details && details.length > 0 && (
        <CollapsibleContent>
          <div className="pl-4 pt-2 space-y-1">
            {details.map((detail, index) => (
              <p key={index} className="text-sm text-gray-600">{detail}</p>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};