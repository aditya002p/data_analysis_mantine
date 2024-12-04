import { agriData } from "./data";

interface CropData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: number | string;
}

interface MaxMinCrop {
  Year: string;
  CropWithMaxProduction: string;
  CropWithMinProduction: string;
}

// Helper function to safely extract the last year from a year string
const extractLastYear = (yearString: string): string => {
  return yearString.split(",").pop()?.trim() || "";
};

// Helper function to safely parse crop production
const safeParseCropProduction = (
  production: number | string | undefined
): number => {
  if (production === undefined) return 0;

  const parsed = Number(production);
  return isNaN(parsed) ? 0 : parsed;
};

export const calculateMaxMinCrop = (
  data: CropData[] = agriData
): MaxMinCrop[] => {
  // Group data by year using Map for better performance
  const groupedByYear = new Map<string, CropData[]>();

  for (const crop of data) {
    const year = extractLastYear(crop.Year);

    if (!groupedByYear.has(year)) {
      groupedByYear.set(year, []);
    }

    groupedByYear.get(year)?.push(crop);
  }

  // Calculate max and min crops for each year
  return Array.from(groupedByYear.entries()).map(([year, yearData]) => {
    // Find crop with max production
    const maxCrop = yearData.reduce((maxCropSoFar, currentCrop) => {
      const maxProduction = safeParseCropProduction(
        maxCropSoFar["Crop Production (UOM:t(Tonnes))"]
      );
      const currentProduction = safeParseCropProduction(
        currentCrop["Crop Production (UOM:t(Tonnes))"]
      );

      return currentProduction > maxProduction ? currentCrop : maxCropSoFar;
    });

    // Find crop with min production
    const minCrop = yearData.reduce((minCropSoFar, currentCrop) => {
      const minProduction = safeParseCropProduction(
        minCropSoFar["Crop Production (UOM:t(Tonnes))"]
      );
      const currentProduction = safeParseCropProduction(
        currentCrop["Crop Production (UOM:t(Tonnes))"]
      );

      return currentProduction < minProduction ? currentCrop : minCropSoFar;
    });

    return {
      Year: year,
      CropWithMaxProduction: maxCrop["Crop Name"] || "N/A",
      CropWithMinProduction: minCrop["Crop Name"] || "N/A",
    };
  });
};
