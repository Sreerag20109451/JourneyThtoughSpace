import { useQuery } from "@tanstack/react-query";
import { neoLookup } from "../backend-apis/neo-apis";
import { useParams } from "react-router";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  accordionDetailsClasses,
  AccordionSummary,
  Box,
  Chip,
  CircularProgress,
  Fade,
  Grid,
  Paper,
  Tooltip,
  Typography,
  type AccordionSlots,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { getNasaImageCollections, getRandomImage } from "../backend-apis/imageSearch";

export const NeoObjectCard = () => {

    const[imageurl, setImageUrl] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isError, isPending } = useQuery({
    queryKey: ["neolookup"],
    queryFn: () => neoLookup(parseInt(id!!)),
  });


  const {data : imagedata, isPending : imagePending, isError : imageError} = useQuery({
    queryKey: ['imageSearch', ],
    queryFn: () => getNasaImageCollections(data?.name || "asteroid")
  });






  if (isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <div>Error loading data</div>
      </Box>
    );
  }







  if (data) {

  
    return (


<div className="flex flex-col">



   <Grid container spacing={0}> 
   { imagePending && <Grid size={{xs: 12, sm: 12, md: 6}}>
   <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}><CircularProgress/></Paper>
  </Grid>}
 {imageError && <Grid size={{xs: 12, sm: 12, md: 6}}>
   <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>No image found</Paper>
  </Grid>}
 { imagedata && <Grid size={12}>
   <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
    <Typography variant="h5">  {data.is_potentially_hazardous_asteroid ? (
      <>
        <Tooltip title="Potentially Hazardous Asteroid" arrow>
          <span style={{ cursor: "help" }}>⚠️ </span>
        </Tooltip>
        {data.name}
      </>
    ) : (
      data.name
    )}</Typography>
    </Paper>
  </Grid>}
   
   </Grid>
        <Accordion
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade as AccordionSlots["transition"] }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expanded
              ? {
                  [`& .${accordionClasses.region}`]: {
                    height: "auto",
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "block",
                  },
                }
              : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              General Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 1.5,
    backgroundColor: "#1e1e1e", 
    padding: 2,
    borderRadius: 2,
  }}
>
  <Chip
    label={`JPL Reference Id: ${data.neo_reference_id}`}  color="primary"
    sx={{
        color: "black",
      fontWeight: 500,
    }}
  />
  <Chip
    label={`JPL View`}
    component="a"
    color="primary"
    href={data.nasa_jpl_url}
    sx={{
      color: "black",
    }}
  />
  <Chip
    label={`Absolute Magnitude (H): ${data.absolute_magnitude_h}`} color="primary"
    sx={{
      color: "black",
    }}
  />
  <Chip
    label={`Designation: ${data.designation}`} color="primary"
    sx={{
        color: "black",
    }}
  />
</Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              Orbital Data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              Close Approach Data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>


        
    );
  }
};
