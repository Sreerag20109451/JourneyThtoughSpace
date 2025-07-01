import { HomeFilled } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, Typography } from "@mui/material"
import { Link, useRouteError } from "react-router"

export const  ErrorPage = () => {


    const error = useRouteError()


    return(
        <main className="flex min-w-full max-w-full justify-center items-center ">

<Typography variant="h3">Oops!</Typography>
      <Typography variant="h6">Sorry, an unexpected error has occurred.</Typography>
     
      <Link to="/" className="home-link">

      <IconButton loadingIndicator={<CircularProgress/>}><HomeFilled></HomeFilled></IconButton>
       
      </Link>


        </main>
    )
}