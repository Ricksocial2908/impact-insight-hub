import { useState } from "react";
import { Card } from "@/components/ui/card";
import { RegionsFilter } from "@/components/RegionsFilter";
import { motion } from "framer-motion";
import { MetricsOverview } from "@/components/metrics/MetricsOverview";
import { PerformanceMetrics } from "@/components/metrics/PerformanceMetrics";
import { GeographyBreakdown } from "@/components/metrics/GeographyBreakdown";
import { Header } from "@/components/Header";

const Metrics = () => {
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
                AWS InCommunities Goals
              </h1>
              <p className="text-gray-600">
                Detailed metrics and performance overview
              </p>
            </div>
            <RegionsFilter 
              selectedRegions={selectedRegions} 
              onRegionSelect={setSelectedRegions} 
            />
          </header>

          <MetricsOverview selectedRegions={selectedRegions} />
          <PerformanceMetrics selectedRegions={selectedRegions} />
          <GeographyBreakdown selectedRegions={selectedRegions} />
        </motion.div>
      </div>
    </div>
  );
};

export default Metrics;