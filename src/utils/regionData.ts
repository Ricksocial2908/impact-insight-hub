import { Region } from '../types/regions';
import { getTimeMultiplier } from './timeAdjustments';

type TimePeriod = 'month' | 'quarter' | 'year';

export const calculateRegionalMetrics = (selectedRegions: Set<string>, timePeriod: TimePeriod = 'year') => {
  const timeMultiplier = getTimeMultiplier(timePeriod);
  
  // Helper function to get the main region from a region code
  const getMainRegion = (code: string): string => {
    if (code.includes('AMER')) return 'AMER';
    if (code.includes('EMEA')) return 'EMEA';
    return 'APJC';
  };

  // Count selected regions per main region
  const regionCounts = {
    AMER: 0,
    EMEA: 0,
    APJC: 0,
  };

  selectedRegions.forEach(code => {
    const mainRegion = getMainRegion(code);
    regionCounts[mainRegion as keyof typeof regionCounts]++;
  });

  // Base metrics for each region
  const baseMetrics = {
    AMER: {
      totalInvestment: 5200000,
      beneficiaries: 78000,
      volunteerHours: 23000,
      projects: 120,
      programDistribution: {
        STEAM: 1500000,
        Skills: 1000000,
        Sustainability: 1800000,
        Hyperlocal: 900000,
      },
      impactMetrics: {
        "Students Reached": 8000,
        "Employment Created": 600,
        "Trees Planted": 8000,
        "Water Saved (Gal)": 1500000,
        "Communities Impacted": 120,
        "Volunteer Events": 450,
        "Media Coverage": 140,
        "Partner Engagement": 80,
      },
    },
  EMEA: {
    totalInvestment: 3100000,
    beneficiaries: 45000,
    volunteerHours: 15000,
    projects: 80,
    programDistribution: {
      STEAM: 700000,
      Skills: 500000,
      Sustainability: 1200000,
      Hyperlocal: 700000,
    },
    impactMetrics: {
      "Students Reached": 3000,
      "Employment Created": 280,
      "Trees Planted": 3000,
      "Water Saved (Gal)": 600000,
      "Communities Impacted": 80,
      "Volunteer Events": 290,
      "Media Coverage": 60,
      "Partner Engagement": 45,
    },
  },
  APJC: {
    totalInvestment: 1800000,
    beneficiaries: 33789,
    volunteerHours: 7678,
    projects: 34,
    programDistribution: {
      STEAM: 300000,
      Skills: 300000,
      Sustainability: 200000,
      Hyperlocal: 100000,
    },
    impactMetrics: {
      "Students Reached": 1345,
      "Employment Created": 143,
      "Trees Planted": 1345,
      "Water Saved (Gal)": 200000,
      "Communities Impacted": 34,
      "Volunteer Events": 150,
      "Media Coverage": 30,
      "Partner Engagement": 31,
    },
  },
  };

  return Object.entries(regionCounts)
    .filter(([_, count]) => count > 0)
    .map(([region, count]) => {
      const base = baseMetrics[region as keyof typeof baseMetrics];
      const ratio = count / 10; // Assuming average 10 regions per main region

      return {
        region,
        metrics: {
          totalInvestment: base.totalInvestment * ratio,
          beneficiaries: Math.round(base.beneficiaries * ratio),
          volunteerHours: Math.round(base.volunteerHours * ratio),
          projects: Math.round(base.projects * ratio),
        },
        programDistribution: Object.entries(base.programDistribution).map(([name, value]) => ({
          name,
          value: value * ratio,
        })),
        impactMetrics: Object.entries(base.impactMetrics).map(([name, value]) => ({
          name,
          value: Math.round(value * ratio),
        })),
      };
    });
};
