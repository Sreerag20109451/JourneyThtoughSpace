import { useQuery } from "@tanstack/react-query"
import { neoLookup } from "../backend-apis/neo-apis"
import { useParams } from "react-router"
import { Box, CircularProgress } from "@mui/material";

export const NeoObjectCard = () => {


    const {id} =  useParams<{id: string}>();


    const {data, isError, isPending} = useQuery({
        queryKey : [ "neolookup"],
        queryFn : () => neoLookup(parseInt(id!!))
    })
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
        )
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
        )
    }

    if(data){

        return (
            <>{data.id}</>
        )

    }

   



}