import { useQuery } from "@tanstack/react-query"
import { neoBrowse } from "../backend-apis/neo-apis"
import type { NeoBrowseResponse } from "../shared/types"
import { CircularProgress, Box } from "@mui/material"
import { NeoTable } from "./table"


export const NeoDataGrid = () => {
    const { data, isPending, isError } = useQuery<NeoBrowseResponse>({
        queryKey: ['neodatabrowsed'],
        queryFn: neoBrowse
    })

    if (isPending) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="200px" // Adjust as needed
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
                minHeight="200px" // Adjust as needed
            >
                <div>Error loading data</div>
            </Box>
        )
    }

    if(data){

        console.log(data)
        return (
       
       
            <Box width="100%" > 
                <NeoTable  neoObjects={data.near_earth_objects}/> 
            </Box>
        
    )

    }
   
}