type TimePeriod = 'month' | 'quarter' | 'year';

export const adjustValueForTimePeriod = (value: string, timePeriod: TimePeriod): string => {
  // Handle monetary values (with $ and M/K suffixes)
  if (value.includes('$')) {
    const numericPart = value.replace(/[$,]/g, '');
    let baseValue = parseFloat(numericPart);
    
    // Convert M to actual value
    if (value.includes('M')) {
      baseValue *= 1000000;
    }
    // Convert K to actual value
    if (value.includes('K')) {
      baseValue *= 1000;
    }

    // Adjust based on time period
    const adjustedValue = timePeriod === 'month' ? 
      baseValue / 12 : timePeriod === 'quarter' ? 
      baseValue / 4 : baseValue;

    // Format back to original style (M/K)
    if (value.includes('M')) {
      return `$${(adjustedValue / 1000000).toFixed(1)}M`;
    }
    if (value.includes('K')) {
      return `$${(adjustedValue / 1000).toFixed(1)}K`;
    }
    return `$${adjustedValue.toLocaleString()}`;
  }

  // Handle numeric values with commas
  const numValue = parseInt(value.replace(/,/g, ''));
  const adjustedValue = timePeriod === 'month' ? 
    Math.round(numValue / 12) : timePeriod === 'quarter' ? 
    Math.round(numValue / 4) : numValue;

  return adjustedValue.toLocaleString();
};

export const getTimeMultiplier = (timePeriod: TimePeriod): number => {
  switch (timePeriod) {
    case 'month':
      return 1/12;
    case 'quarter':
      return 1/4;
    case 'year':
      return 1;
  }
};