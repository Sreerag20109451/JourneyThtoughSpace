
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NeoDataGrid } from '../components/neodtagrid';
import { Outlet } from 'react-router';

import { BrowseGallery, CalendarMonth, DateRange, Home, ListAltOutlined, LiveTv, Search, SearchOff } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';;

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function NeoDashBoard(props: DemoProps) {
  const { window } = props;

  const navigation = [
    {
      segment: '',
      title: 'Home',
      icon: <Home />,
      
    },
    {
      segment: 'neo',
      title: 'Browse All',
      icon: <ListAltOutlined />,
      
    },
    {
      segment: 'neo/feed',
      title: 'Feeds',
      icon: <CalendarMonth />,
      children: [
        {
          segment: 'live',
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
    homeUrl: '/neo',
  };
  
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ReactRouterAppProvider navigation={navigation} branding={BRANDING} theme={darkTheme}>
        <DashboardLayout  >
         <Outlet/>
        </DashboardLayout>
        </ReactRouterAppProvider>
 
  
  );
}
