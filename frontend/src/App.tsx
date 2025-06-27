
import './index.css'
import { Layout } from './components/layout'
import Homepage from './pages/homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NeoDashBoard from './pages/neopage';
import { NeoDataGrid } from './components/neodtagrid';
import { NeoObjectCard } from './components/neoObjectcard';
import { LiveNeoFeed } from './components/neoLivefeed'
import { NeoFeedByDate } from './components/neohistorical'




export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
      {
        index: true,
        element: <Homepage />
      },
    ]
  },
  {
    path: "neo",
    element: <NeoDashBoard/>,
    children:[{
      index: true,
      element: <NeoDataGrid />
    },
  {
    path: ":id",
    element : <NeoObjectCard />
  }, {
    path : "feed/live",
    element : <LiveNeoFeed/>
  },
  {
    path : "feed/historical",
    element : <NeoFeedByDate/>
  },


]
  }
])


function App() {
  const queryClient = new QueryClient()


  return (

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter}>   
       </RouterProvider>
    </QueryClientProvider>
 
  )
}

export default App
