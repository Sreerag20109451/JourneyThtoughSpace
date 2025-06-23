
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { BrowseGallery, DateRange, LiveTv, Search, SearchTwoTone } from '@mui/icons-material';
import { NeoDataGrid } from '../components/neodtagrid';
import { Outlet } from 'react-router';
import { browserRouter } from '../App';

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

  const router = useDemoRouter('/');

  const demoWindow = window !== undefined ? window() : undefined;
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
        <DashboardLayout  >
         <Outlet/>
        </DashboardLayout>
 
  
  );
}
