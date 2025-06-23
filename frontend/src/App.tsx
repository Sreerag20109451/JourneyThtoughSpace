import { AppProvider } from '@toolpad/core/AppProvider';
import './index.css'
import { Layout } from './components/layout'
import Homepage from './pages/homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NeoPage from './pages/neopage'
import NeoDashBoard from './pages/neopage';

function App() {
  const queryClient = new QueryClient()

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children : [
        {
          index: true,
          element: <Homepage />
        },
        {
          path: "neo",
          element: <NeoDashBoard/>
        }
      ]
    }
  ])


  return (
    <AppProvider  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
    </QueryClientProvider>
     </AppProvider>
  )
}

export default App
