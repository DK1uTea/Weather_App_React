import axios from 'axios';

// get weather infor from api of openweathermap
export const getWeather = async (req, res) => {
    const {city} = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (e) {
        res.status(400).json({message: "City not found!"});
    }
}