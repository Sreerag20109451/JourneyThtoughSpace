import type React from "react";

import"../index.css";
import { AppBar, Grid } from "@mui/material";
import { Outlet } from "react-router";
import DrawerAppBar from "./appbar";




export const Layout = () => {



    return (
        <main className="bg-space-grid w-screen min-h-screen"> 
        <DrawerAppBar/>
       <Outlet/>
        </main>
    )

}