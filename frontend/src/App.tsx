
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
import { NeoSearch } from './components/neosearch'
import { ErrorPage } from './pages/errorpage'
import { NotFoundPage } from './pages/notfoundpage'




export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement : <ErrorPage/>,
    children : [
      {
        index: true,
        element: <Homepage />,
        errorElement : <ErrorPage/>
      },
    ]
  },
  {
    path: "neo",
    element: <NeoDashBoard/>,
    children:[{
      index: true,
      element: <NeoDataGrid />,
      errorElement : <ErrorPage/>,
    },
  {
    path: ":id",
    element : <NeoObjectCard />,
    errorElement : <ErrorPage/>,
  }, 
  {
    path : "feed/live",
    element : <LiveNeoFeed/>,
    errorElement : <ErrorPage/>,
  },
  {
    path : "feed/historical",
    element : <NeoFeedByDate/>,
    errorElement : <ErrorPage/>,
  },
  {
    path : "search/nameorid",
    element : <NeoSearch/>,
    errorElement : <ErrorPage/>,
  },
  


],  },

{
  path : "*",
  element: <NotFoundPage/>,
  children :[
    {
      

    }
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
