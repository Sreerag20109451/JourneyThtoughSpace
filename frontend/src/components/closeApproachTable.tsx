import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type {
  CloseApproachData,
  MissDistance,
  RelativeVelocity,
} from "../shared/types";
import type {
  MissDistanceUnit,
  RelativeVelocityUnit,
} from "./closeApproachForm";
import CloseApproachDataForm from "./closeApproachForm";
import { Box, Button, Typography, type SelectChangeEvent } from "@mui/material";

interface CloseApproachDataProps {
  closeApproachData: CloseApproachData[];
}

export default function CloseApprochTable({
  closeApproachData,
}: CloseApproachDataProps) {
  const [data, setData] =
    React.useState<CloseApproachData[]>(closeApproachData);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const [orbitBody, setOrbitBody] = React.useState<string | null>(null);
  const [relativeVelocity, setRelativeVelocity] =
    React.useState<RelativeVelocityUnit>("kilometers_per_hour");
  const [missDistance, setMissDistance] =
    React.useState<MissDistanceUnit>("astronomical");

  const handleRelativeVelocity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRelativeVelocity(
      (
        event.target as HTMLInputElement
      ).value.toString() as RelativeVelocityUnit
    );
  };

  const handleMissDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissDistance(
      (event.target as HTMLInputElement).value.toString() as MissDistanceUnit
    );
  };
  const handleOrbitBody = (event: SelectChangeEvent<string | null>) => {  
    setOrbitBody(event.target.value);
};

const resetSearch = () => {

  setData(closeApproachData);
  setIsSubmitted(false);
  setOrbitBody(null);
  setRelativeVelocity("kilometers_per_hour");
  setMissDistance("astronomical");

}

const handleSubmit = () => {
  const newCloseApproachData = closeApproachData.filter((cadata) => {
      return cadata.orbiting_body === orbitBody;
  });
  setData(newCloseApproachData);
  setIsSubmitted(true);
};
 
  if(!isSubmitted){
    return(

      <CloseApproachDataForm orbitingBody={orbitBody} handleMissDistance={handleMissDistance} handleSubmit={handleSubmit} handleOrbitBody={handleOrbitBody} handleRelativeVelocity={handleRelativeVelocity} />
    )

  }
  if (isSubmitted && data.length <= 0) {
    return (
      <>
      <Box sx={{width : "55%", display:"flex", flexDirection: "column", alignItems : "center", justifyContent : "center", gap: 2}}>
        <Typography variant="body1">No data available</Typography>
        <Button color="error"  variant="contained" onClick={resetSearch}>
          Reset Search
        </Button>

      </Box>
      </>
    )
  }

  if (isSubmitted && closeApproachData.length > 0) {
    return (
      <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Orbital Body</TableCell>
              <TableCell align="right">Close Approach Date</TableCell>
              <TableCell align="right">Relative Velocity</TableCell>
              <TableCell align="right">Miss Distance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((cadata) => (
              <TableRow
                key={cadata.close_approach_date_full}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{cadata.orbiting_body}</TableCell>
                <TableCell align="right">
                  {cadata.close_approach_date}
                </TableCell>
                <TableCell align="right">
                  {parseInt(cadata.relative_velocity[relativeVelocity]).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {parseInt(cadata.miss_distance[missDistance]).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button color="error"  variant="contained" onClick={resetSearch}>
          Reset Search
        </Button>
      
      </Box>
    );
  }
}
