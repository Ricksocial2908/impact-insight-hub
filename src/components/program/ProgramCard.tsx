import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Program } from "@/types/programs";
import { SubProgramSection } from "./SubProgramSection";
import { Beaker, GraduationCap, Leaf, HeartHandshake, Users, BarChart3 } from "lucide-react";

interface ProgramCardProps {
  program: Program;
  index: number;
  timePeriod: 'month' | 'quarter' | 'year';
}

const getProgramIcon = (programName: string) => {
  switch (programName) {
    case "STEAM":
      return <Beaker className="w-6 h-6 text-blue-600" />;
    case "Local Skills Development":
      return <GraduationCap className="w-6 h-6 text-cyan-600" />;
    case "Sustainability":
      return <Leaf className="w-6 h-6 text-green-600" />;
    case "Hyperlocal":
      return <HeartHandshake className="w-6 h-6 text-purple-600" />;
    case "Volunteering":
      return <Users className="w-6 h-6 text-orange-600" />;
    case "Sentiment & Social Impact":
      return <BarChart3 className="w-6 h-6 text-indigo-600" />;
    default:
      return null;
  }
};

export const ProgramCard = ({ program, index, timePeriod }: ProgramCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              {getProgramIcon(program.name)}
              <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
            </div>
            <p className="text-sm text-gray-500">
              Investment: {program.ytdInvestment}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.subPrograms.map((subProgram, subIndex) => (
              <motion.div
                key={subProgram.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: subIndex * 0.1 }}
              >
                <Card className="glass-card bg-white/40 h-full transition-all duration-300 hover:bg-white/60 hover:shadow-lg">
                  <div className="p-4">
                    <h4 className="text-md font-semibold text-gray-800 mb-3">{subProgram.name}</h4>
                    <div className="space-y-3">
                      <SubProgramSection
                        subProgram={subProgram}
                        timePeriod={timePeriod}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};