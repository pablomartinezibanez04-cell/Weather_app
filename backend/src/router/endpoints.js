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
    console.log(`Fetching data from OpenWeather API with lat: ${lat} and lon: ${lon}`);
    const data = await fetch(`${baseURL}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${appid}`);
    
    res.status(200).json(await data.json());
});

router.get ('/data-by-date', async (req, res) => {
    console.log('Received a request at /data-by-date');
    const { lat, lon, date, units = "metric", lang = "en" } = req.query;

    if (!lat || !lon || !date) {
        console.log('Missing required query parameters');
        return res.status(400).json({
        error: "lat, lon y date son obligatorios",
        });  
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log('Invalid date format');
        return res.status(400).json({
            error: "El parámetro date debe estar en formato YYYY-MM-DD",
        });
    }
    console.log(`Comverting date ${date} to UNIX UTC timestamp`);
    const unixUtc = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    console.log(`Converted date to UNIX UTC timestamp: ${unixUtc}`);

    console.log(`Fetching data from OpenWeather API for specific date: ${date}, lat: ${lat} and lon: ${lon}`);
    const data = await fetch(`${baseURL}/timemachine?lat=${lat}&lon=${lon}&dt=${unixUtc}&units=${units}&lang=${lang}&appid=${appid}`);

    res.status(200).json(await data.json());
});

export default router;