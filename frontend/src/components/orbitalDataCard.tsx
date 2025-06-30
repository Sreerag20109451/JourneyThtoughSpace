import {  Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import type { OrbitalData } from "../shared/types";

interface OrbitalDataCardProps {

    orbitalData : OrbitalData

}

export default function OrbitalDataCard({orbitalData} : OrbitalDataCardProps) {



    return (
        <Grid size={ {xs: 12, sm: 12, md: 6} }>
            <Card>

            <Grid container spacing={2}>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                        <Typography component="h5">{`Orbit Id : ${orbitalData.orbit_id}`}</Typography>  
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Orbit Type : ${orbitalData.orbit_class.orbit_class_type}`}</Typography>   
                        </Grid>
                      </Grid>

                      <Grid sx={{my: 4}} size = {{xs:12 ,md:12,lg:12}}>  
                        <Typography component="blockquote">{`Orbit Description : ${orbitalData.orbit_class.orbit_class_description}`}</Typography>
                       
                      </Grid>                      


                <Divider  textAlign="left" sx={{my : 2 ,}}><Typography variant="h5" sx={{pl : 4, pr: 4}}>Observation History</Typography></Divider>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                        <Typography component="blockquote">{`First Observation : ${orbitalData.first_observation_date}`}</Typography>  
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Last Observation : ${orbitalData.last_observation_date}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6,lg:3}}>  
                        <Typography component="blockquote">{`Number of Observations : ${orbitalData.observations_used}`}</Typography>
                       
                      </Grid>
                      <Grid  size = {{xs:12 ,md:6,lg:3}}>
                         
                         
                      <Typography component="blockquote">{`Data Arc in Days : ${orbitalData.data_arc_in_days}`}</Typography>
                       
                      </Grid>
                     
                    
                    </Grid>
                    <Divider  textAlign="left" sx={{my : 2 , mt: 10}}><Typography variant="h5" sx={{pl : 4, pr: 4}}>Orbital Distances and Periods</Typography></Divider>
                    <Grid container spacing={2}>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                        <Typography component="blockquote">{`Aphelion Distance : ${parseInt(orbitalData.aphelion_distance).toFixed(2)}`}</Typography>  
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Perihelion Distance : ${parseFloat(orbitalData.perihelion_distance).toFixed(2)}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Perihelion Time : ${parseFloat(orbitalData.perihelion_time).toFixed(2)}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Perihelion Argument : ${parseFloat(orbitalData.perihelion_argument).toFixed(2)}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6,lg:3}}>  
                        <Typography component="blockquote">{`Ascending Node Longitude : ${parseInt(orbitalData.ascending_node_longitude).toFixed(2)}`}</Typography>
                       
                      </Grid>
                      <Grid  size = {{xs:12 ,md:6,lg:3}}>
                         
                         
                      <Typography component="blockquote">{`Orbital Period : ${parseFloat(orbitalData.orbital_period).toFixed(2)}`}</Typography>
                       
                      </Grid>
                     
                    
                    </Grid>
                    <Divider  textAlign="left" sx={{my : 2 , mt: 10}}><Typography variant="h5" sx={{pl : 4, pr: 4}}>Orbital Angles</Typography></Divider>
                    <Grid container spacing={2}>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                        <Typography component="blockquote">{`Eccentricity : ${parseFloat(orbitalData.eccentricity).toFixed(2)}`}</Typography>  
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Equinox : ${orbitalData.equinox}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6,lg:3}}>  
                        <Typography component="blockquote">{`Inclination : ${parseInt(orbitalData.inclination).toFixed(2)}`}</Typography>
                       
                      </Grid>
                      <Grid  size = {{xs:12 ,md:6,lg:3}}>
                         
                         
                         <Typography component="blockquote">{`Semi Major Axis : ${parseFloat(orbitalData.semi_major_axis).toFixed(2)}`}</Typography>
                          
                         </Grid>
                        
                      <Grid  size = {{xs:12 ,md:6,lg:3}}>
                         
                         
                      <Typography component="blockquote">{`Jupier Tisserand Invariant : ${parseFloat(orbitalData.jupiter_tisserand_invariant).toFixed(2)}`}</Typography>
                       
                      </Grid>
                     
                    
                    </Grid>
                    <Divider  textAlign="left" sx={{my : 2 , mt: 10}}><Typography variant="h5" sx={{pl : 4, pr: 4}}>Miscellaneous</Typography></Divider>
                    <Grid container spacing={2}>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                        <Typography component="blockquote">{`Mean Anomaly : ${parseFloat(orbitalData.mean_anomaly).toFixed(2)}`}</Typography>  
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6, lg:3}}>
                           <Typography component="blockquote">{`Mean Motion : ${orbitalData.mean_motion}`}</Typography>   
                        </Grid>
                        <Grid  size = {{xs:12 ,md:6,lg:3}}>  
                        <Typography component="blockquote">{`Minimum Orbit Intersection : ${orbitalData.minimum_orbit_intersection}`}</Typography>
                       
                      </Grid>

                     
                    
                    </Grid>

                </CardContent>
            </Card>


        </Grid>
    )


}