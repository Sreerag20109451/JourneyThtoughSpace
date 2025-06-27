import { Box, Chip, Divider, Typography } from "@mui/material";
import type { NeoFeedResponse } from "../shared/types";

interface NeoListItemProps {

    feedData  : NeoFeedResponse
    date : string

}


export default function NeoListItem( { feedData, date }: NeoListItemProps) {

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Near-Earth Objects for {date} 
      </Typography>

      {feedData.near_earth_objects[date].map((neo, index) => {
        const approach = neo.close_approach_data?.[0];

        return (
          <Box key={neo.id || index} sx={{ mb: 3 }}>
         <a href={`/neo/${neo.neo_reference_id}`}>  <Typography variant="h6">{neo.name}</Typography> </a> 

            <Typography variant="body2">
              Speed: {parseInt(approach?.relative_velocity.kilometers_per_hour).toFixed(0)} km/h
            </Typography>

            <Typography variant="body2">
              Miss Distance: {parseInt(approach?.miss_distance.kilometers).toFixed(0)} km
            </Typography>

            <Typography variant="body2">
              Estimated Diameter:{" "}
              {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} –{" "}
              {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
            </Typography>

            <Chip
              label={
                neo.is_potentially_hazardous_asteroid
                  ? "Hazardous"
                  : "Not Hazardous"
              }
              color={
                neo.is_potentially_hazardous_asteroid ? "error" : "success"
              }
              size="small"
              sx={{ mt: 1 }}
            />

            <Divider sx={{ mt: 2 }} />
          </Box>
        );
      })}
    </Box>
    )
}