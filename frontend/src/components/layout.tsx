

import"../index.css";
import { AppBar, Box, createTheme, Grid } from "@mui/material";
import { Outlet } from "react-router";
import DrawerAppBar from "./appbar";
import { BrowseGallery, CalendarMonth, DateRange, LiveTv, Search, SearchOff } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

const navigation = [
  {
    segment: 'neo',
    title: 'Browse',
    icon: <BrowseGallery />,
    
  },
  {
    segment: 'neo/feed',
    title: 'Feeds',
    icon: <CalendarMonth />,
    children: [
      {
        segment: 'neo/feed/live',
        title: 'Live Feed',
        icon: <LiveTv />,
      },
      {
        segment: 'neo/feed/historical',
        title: 'Historical Feeds',
        icon: <DateRange />,
      },
    ],
  },
  {
    segment: 'neo/search',
    title: 'Search',
    icon: <Search />,
    children: [
      {
        segment: 'neo/search/nme',
        title: 'Search By name',
        icon: <SearchOff />,
      },
    ]
  }



]
  

const BRANDING = {
  title: 'NEO Explorer',
};


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const Layout = () => {



    return (
      <ReactRouterAppProvider navigation={navigation} branding={BRANDING} theme={darkTheme}>
        <main className="bg-space-grid w-screen min-h-screen"> 
        <DrawerAppBar/>
        <Box component="main" sx={{ maxHeight : "100%" ,  width: "100%", marginTop : "-40px" }}>
        <Outlet />
      </Box>
        </main>
        </ReactRouterAppProvider>
    )

}