import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const router = express.Router();
const apiKey = process.env.API_KEY;
router.post('/directions', async (req, res) => {
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
        return res.status(400).json({ error: "Invalid coordinates format. Expected an array with at least two coordinate pairs." });
    }

    try{
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
        const requestBosy = {
            coordinates: coordinates,
            instructions: true,
        }
        const headers = {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        }
        const response = await axios.post(url, requestBosy, { headers });
        const route = response.data;
        res.json({'route': route});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error.", details: error });
    }
});

export default router;
