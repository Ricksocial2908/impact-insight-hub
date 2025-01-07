import { Card } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { ProgramOverview } from "@/components/ProgramOverview";
import { RegionsFilter } from "@/components/RegionsFilter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";

const Index = () => {
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <header className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                Program Impact Dashboard
              </h1>
              <p className="text-gray-600">
                Tracking our community initiatives and their impact
              </p>
            </div>
            <RegionsFilter 
              selectedRegions={selectedRegions} 
              onRegionSelect={setSelectedRegions} 
            />
          </header>

          <DashboardMetrics selectedRegions={selectedRegions} />
          <ProgramOverview />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;