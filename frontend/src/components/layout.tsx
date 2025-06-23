

import"../index.css";
import { AppBar, Box, createTheme, Grid } from "@mui/material";
import { Outlet } from "react-router";
import DrawerAppBar from "./appbar";




export const Layout = () => {



    return (
   
        <main className="bg-space-grid w-screen min-h-screen"> 
        <DrawerAppBar/>
        <Box component="main" sx={{ maxHeight : "100%" ,  width: "100%", marginTop : "-40px" }}>
        <Outlet />
      </Box>
        </main>
        
    )

}