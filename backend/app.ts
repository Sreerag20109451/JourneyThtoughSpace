import express from 'express';
import { neoRouter } from './routers/neorouter';


const app : express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/neoobjects',  neoRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})