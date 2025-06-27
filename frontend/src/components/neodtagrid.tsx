import { useQuery } from "@tanstack/react-query"
import { neoBrowse } from "../backend-apis/neo-apis"
import type { NeoBrowseResponse } from "../shared/types"
import { CircularProgress, Box } from "@mui/material"
import { NeoTable } from "./table"
import { useState } from "react"
import { Pagination } from "./pagination"


export const NeoDataGrid = () => {

    const [pagenum, setPagenum] = useState(1)

    const { data, isPending, isError } = useQuery<NeoBrowseResponse>({
        queryKey: ['neodatabrowsed', pagenum],
        queryFn: () => neoBrowse(pagenum)
    })


    const handlePageChange = (page : string) => {

        window.scrollTo({ top: 0, behavior: "smooth" }); 

        if(page === "Previous") return setPagenum(pagenum - 1)
        if(page === "Next") return setPagenum(pagenum + 1)
        if(parseInt(page) > 0) return setPagenum(parseInt(page))
    }

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

        console.log(data)
        return (
       
       
            <Box width="100%" > 
            <div className="flex flex-col  space-y-10">
                
            <NeoTable  neoObjects={data.near_earth_objects}/> 
            <Pagination pagenum={pagenum} totalnum={data.page.total_pages} onPageChange={handlePageChange}/>
            </div>
               
                
            </Box>
        
    )

    }
   
}