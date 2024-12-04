import "./App.css";
import { Table, Title } from "@mantine/core";
import { calculateMaxMinCrop } from "./utils/calculateMaxMinCrop";
import { getAvgYieldAndCultivation } from "./utils/getAvgYieldAndCultivation";

interface MaxMinCropData {
  Year: string;
  CropWithMaxProduction: string;
  CropWithMinProduction: string;
}

interface AvgYieldCultivationData {
  CropName: string;
  AverageYield: string;
  AverageCultivationArea: string;
}

function App(): JSX.Element {
  const maxMinCrops = calculateMaxMinCrop().map((cropData: MaxMinCropData) => (
    <Table.Tr key={cropData.Year}>
      <Table.Td>{cropData.Year}</Table.Td>
      <Table.Td>{cropData.CropWithMaxProduction}</Table.Td>
      <Table.Td>{cropData.CropWithMinProduction}</Table.Td>
    </Table.Tr>
  ));

  const avgYieldAndCultivation = getAvgYieldAndCultivation().map(
    (cropData: AvgYieldCultivationData) => (
      <Table.Tr key={cropData.CropName}>
        <Table.Td>{cropData.CropName}</Table.Td>
        <Table.Td>{cropData.AverageYield}</Table.Td>
        <Table.Td>{cropData.AverageCultivationArea}</Table.Td>
      </Table.Tr>
    )
  );

  return (
    <>
      <Title order={1} className="title--maxmincrop">
        Crops with maximum and minimum production between the year 1950-2020
      </Title>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        id="Crop--maxProd--minProd"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{maxMinCrops}</Table.Tbody>
      </Table>

      <Title order={1} className="title--avgyield">
        Average Yield and Cultivation of Crop between the year 1950-2020
      </Title>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        id="Crop--avgYield"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{avgYieldAndCultivation}</Table.Tbody>
      </Table>
    </>
  );
}

export default App;
