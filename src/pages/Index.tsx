import { useState } from "react";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { ProgramOverview } from "@/components/ProgramOverview";
import { RegionsSidebar } from "@/components/RegionsSidebar";

export type SelectedRegions = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const Index = () => {
  // Initialize all regions as selected
  const [selectedRegions, setSelectedRegions] = useState<SelectedRegions>({
    AMER: {
      existing: true,
      ml: true,
      expansion: true,
      prospective: true,
    },
    EMEA: {
      existing: true,
      ml: true,
      expansion: true,
      prospective: true,
    },
    APJC: {
      existing: true,
      ml: true,
      expansion: true,
      prospective: true,
    },
  });

  const handleRegionToggle = (region: string, type: string, value: boolean) => {
    setSelectedRegions((prev) => ({
      ...prev,
      [region]: {
        ...prev[region],
        [type]: value,
      },
    }));
  };

  // Convert selected regions to Set for metrics calculation
  const getSelectedRegionsSet = () => {
    const selectedSet = new Set<string>();
    Object.entries(selectedRegions).forEach(([region, types]) => {
      Object.entries(types).forEach(([type, isSelected]) => {
        if (isSelected) {
          selectedSet.add(`${region}-${type}`);
        }
      });
    });
    return selectedSet;
  };

  return (
    <div className="flex min-h-screen">
      <RegionsSidebar
        selectedRegions={selectedRegions}
        onRegionToggle={handleRegionToggle}
      />
      <main className="flex-1 p-8">
        <DashboardMetrics selectedRegions={getSelectedRegionsSet()} />
        <div className="mt-8">
          <ProgramOverview selectedRegions={getSelectedRegionsSet()} />
        </div>
      </main>
    </div>
  );
};

export default Index;