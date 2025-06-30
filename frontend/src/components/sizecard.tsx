import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import type { EstimatedDiameter } from "../shared/types";
import { BarChart } from '@mui/x-charts/BarChart';

interface DimensionProps{

  estimatedDiameter: EstimatedDiameter
}

type Metric = keyof EstimatedDiameter;
const availlableMetrics : Metric[] = ["kilometers", "meters", "miles", "feet"];

export const SizeCard = ({estimatedDiameter} :  DimensionProps) => {

  const [metric, setMetric] = useState<Metric>("kilometers");
  const [isResult, setIsResult] = useState<boolean>(false);
  const xAxis = ["Min Diameter", "Max Diameter"];
  const [series, setSeries] =  useState<number[] | null>(null);

  const handleChange = (event: SelectChangeEvent) : void => {


    const selectedMetric = event.target.value as Metric;
    setMetric(selectedMetric);
    setGraph(selectedMetric);
  }


  const setGraph = (metric : Metric) => {

    console.log(estimatedDiameter[metric]);
    const min = estimatedDiameter[metric].estimated_diameter_min;
    const max = estimatedDiameter[metric].estimated_diameter_max;
    const left = min/2
    const right = max * 2
    setSeries([min, max]);
    setIsResult(true);

  }

  
 
  return (
    <>
     <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Scale</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={metric}
          label="Metric"
          onChange={(event) => {handleChange(event)}}
        >{
          availlableMetrics.map((availableMetric) => (

            <MenuItem value={availableMetric}>{availableMetric.charAt(0).toUpperCase()+availableMetric.slice(1)}</MenuItem>
          ))
        }
        </Select>
      </FormControl>

      {
        isResult &&
      <Paper>
        <BarChart
       xAxis={[{ data: xAxis!! }]}
      series={[
        {
          data: series!!,
        },
      ]}
      height={300}
      layout="vertical"
      barLabel= {(item, context) => {
        return `${item.value?.toFixed(2)} ${ metric.includes("kilo") ? "KM": metric.charAt(0).toUpperCase()+metric.slice(1)}`;
      }}
    />
      </Paper>
      }
    </Box>
      </>
  );
}; 
