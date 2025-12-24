import express from "express";

const router = express.Router();
const baseURL = "https://api.openweathermap.org/data/3.0/onecall";
const appid = process.env.OPENWEATHER_API_KEY;

router.get('/', (req, res) => {
    console.log('Received a request at /');
    res.send('Hello, World');
});

router.get('/general-data', async (req, res) => {
    console.log('Received a request at /general-data');
    const { lat, lon, units = "metric", lang = "en" } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
        error: "lat y lon son obligatorios",
        });
    }
    console.log('Fetching data from OpenWeather API');
    const data = await fetch(`${baseURL}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${appid}`);
    
    res.status(200).json(await data.json());
});

export default router;