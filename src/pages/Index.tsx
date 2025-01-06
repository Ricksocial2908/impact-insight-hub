import { Card } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { ProgramOverview } from "@/components/ProgramOverview";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Program Impact Dashboard
          </h1>
          <p className="text-gray-600">
            Tracking our community initiatives and their impact
          </p>
        </header>

        <DashboardMetrics />
        <ProgramOverview />
      </motion.div>
    </div>
  );
};

export default Index;