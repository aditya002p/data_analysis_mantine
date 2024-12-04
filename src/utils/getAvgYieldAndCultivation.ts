import { agriData } from "./data";

interface CropData {
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number | string;
}

interface CropStatistics {
  CropName: string;
  AverageYield: string;
  AverageCultivationArea: string;
}

// Helper function to safely parse numeric values
const safeParseFloat = (value: number | string | undefined): number => {
  if (value === undefined) return 0;

  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? 0 : parsed;
};

export const getAvgYieldAndCultivation = (
  data: CropData[] = agriData
): CropStatistics[] => {
  // Use Map for more efficient grouping
  const groupedByCrop = new Map<string, CropData[]>();

  // Group data by crop name
  for (const item of data) {
    const cropName = item["Crop Name"];
    const cropGroup = groupedByCrop.get(cropName) || [];
    cropGroup.push(item);
    groupedByCrop.set(cropName, cropGroup);
  }

  // Calculate statistics using more functional approach
  return Array.from(groupedByCrop.entries()).map(([cropName, cropData]) => {
    const totalYears = cropData.length;

    const yieldSum = cropData.reduce(
      (sum, item) =>
        sum +
        safeParseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]),
      0
    );

    const areaSum = cropData.reduce(
      (sum, item) =>
        sum + safeParseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]),
      0
    );

    return {
      CropName: cropName,
      AverageYield: (yieldSum / totalYears).toFixed(3),
      AverageCultivationArea: (areaSum / totalYears).toFixed(3),
    };
  });
};
