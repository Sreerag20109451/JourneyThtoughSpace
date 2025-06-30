import { useEffect, useState } from "react"
import type { NeoFeedResponse } from "../shared/types";
import { useQuery } from "@tanstack/react-query";
import { Box,  CircularProgress,  Typography } from "@mui/material";
import { getLiveFeed } from "../backend-apis/neo-apis";
import NeoListItem from "./neolistitem";

export const LiveNeoFeed = () =>{


    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const [feedData, setFeedData] = useState<NeoFeedResponse | null>(null);

    const {data, isPending, isError} = useQuery <NeoFeedResponse, Error>({

        queryKey: ["neoFeed"],
        queryFn: getLiveFeed
    })



    useEffect(() => {
    

        if(!data || !data.near_earth_objects) return;


        setFeedData(data);

    }, [data]);



    if(isPending) {

        return (
            <Box sx={{display:"flex", height: "100%", justifyContent : "center", alignItems: "center"}}>

                <CircularProgress size={50} />

            </Box>
        )
    }

    if(isError){

        return (

            <Box sx={{display:"flex", justifyContent : "center", alignItems: "center"}}>
        
            <Typography variant="h4" color="error"/>
            </Box>
        )

      
    }

    if (!feedData || !feedData.near_earth_objects[date]) {
        return (
          <Box sx={{ p: 5 }}>
            <Typography variant="h6" align="center">
              No NEO data available for {date}
            </Typography>
          </Box>
        );
      }

            return (
             <NeoListItem feedData={feedData} date={date} ></NeoListItem>

            )
      



}