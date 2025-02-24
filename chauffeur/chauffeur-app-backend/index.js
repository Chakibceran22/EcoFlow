import express from 'express';
import directionsRoute from './routes/directionsRoute.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors(
    {
        origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
    }
));
app.use(express.json());
const apiKey = '5b3ce3597851110001cf6248d1fed003e48940c0aceaa35ef10b009b'
app.use('/api', directionsRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})