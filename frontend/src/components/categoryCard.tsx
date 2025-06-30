import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { getNasaImageCollections, getRandomImage } from '../backend-apis/imageSearch';
import { CircularProgress } from '@mui/material';

import "../index.css" 
import { Link } from 'react-router';
interface CategoryCardProps {

    name: string;
    searchWord: string;
    description: string;
    url : string


}




export default function CategoryCard({name, searchWord, description, url}: CategoryCardProps) {

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const {data, isPending, isError} = useQuery({
    queryKey: ['imageSearch', searchWord],
    queryFn: () => getNasaImageCollections(searchWord),
  });


  React.useEffect(() => {
    if (!data) return;
    
      const nasaimageurl = getRandomImage(data);
      console.log(nasaimageurl);
      
      setImageUrl(nasaimageurl);

      setInterval(() => {
        const nasaimageurl = getRandomImage(data);
        console.log(nasaimageurl);
        
        setImageUrl(nasaimageurl);
      }, 5000); 
  
  }, [data]);



  return (
    <div className="scale-up-animation">
    <Card square={false}raised={true} sx={{height : 550, maxWidth : 640}}>

<div style={{ height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
  {isPending && <CircularProgress />}
  {isError && <Typography variant='body1'>No image available</Typography>}
  {imageUrl && (
    <CardMedia 
      sx={{padding: "10px" , height: '100%', width: '100%', objectFit: 'cover'}}
      image={imageUrl}
      title={name}
    />
  )}
</div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {description}
        </Typography>
      </CardContent>
      <CardActions sx={{width : "100%" , padding : "30px"}}>
        <Link to={url} style={{ textDecoration: 'none', width: '100%' }}>
        <Button variant='contained' size="large">Start</Button>
        </Link>
      </CardActions>
    </Card>
    </div>
  );
}
