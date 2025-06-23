
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { DateRange, LiveTv, Search, SearchTwoTone } from '@mui/icons-material';
import { NeoDataGrid } from '../components/neodtagrid';

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

  const router = useDemoRouter('/movies/lord-of-the-rings');

  const demoWindow = window !== undefined ? window() : undefined;
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider  window={demoWindow}>
      {/* preview-start */}
      <AppProvider   branding={{
    logo: <img src="https://www.ipac.caltech.edu/system/news_items/images/252/original/neos_logo.jpg?1669070894" alt="NEO logo" />,
    title: 'Near Earth Object Dashboard',
    homeUrl: '/neo',
  }} theme={darkTheme} 
        navigation={[
          {
            segment: 'Feeds',
            title: 'Feeds',
            icon: <CalendarMonthIcon />,
            children: [
              {
                segment: 'current-datetime',
                title: 'Live Feed',
                icon: <LiveTv />,
              },
              {
                segment: 'set-datetime',
                title: 'Historical Feeds',
                icon: <DateRange />,
              },
            ],
          },
          {
            segment: 'search',
            title: 'Search',
            icon: <Search />,
            children: [
              {
                segment: 'current-datetime',
                title: 'Search By name',
                icon: <SearchTwoTone />,
              },
            ],
          }
        ]}
        router={router}
        window={demoWindow}
      >
        <DashboardLayout  >
         <NeoDataGrid/>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
