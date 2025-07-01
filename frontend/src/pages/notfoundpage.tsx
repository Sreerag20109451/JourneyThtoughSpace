import { HomeFilled } from "@mui/icons-material"
import {  Box, CircularProgress, IconButton, Typography } from "@mui/material"
import { Link } from "react-router"
import DrawerAppBar from "../components/appbar"

export const  NotFoundPage = () => {




    return(
    <main className="bg-space-grid w-screen min-h-screen flex items-center justify-center"> 
    <DrawerAppBar/>
    <Box component="main" sx={{ maxHeight : "100%" ,  width: "100%" }} className="mx-auto my-auto">
    <Typography variant="h3"color="error" >Uh Oh!!!</Typography>
      <Typography variant="h5" color="error">Sorry, the path that you have requested is not found!</Typography>
    
      <Link to="/" className="home-link">
      <IconButton loadingIndicator={<CircularProgress/>}><HomeFilled></HomeFilled></IconButton>
      </Link>
  </Box>
    </main>
    )
}