const authKey = process.env.WEATHER_API_KEY as string;
if (!authKey) throw new Error('WEATHER_API_KEY is undefined.');

const latitude: string = "33.7489924";
const longitude: string = "-84.3902644";

export type APIResponse = Record<string, string | number> | { message: string };

const fetchCurrentWeather = async (): Promise<APIResponse> => {
    const queryURL: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${authKey}`;

    try {
        const response = await fetch(queryURL);

        if (!response.ok) {
            return { message: `HTTP error status: ${response.status}` }
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error('Error fetching data from OpenWeatherMapAPI:', error);
        throw error;
    }
}

const fetchFiveDayForecast = async (): Promise<APIResponse> => {
    const queryURL: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${authKey}`;

    try {
        const response = await fetch(queryURL);

        if (!response.ok) {
            return { message: `HTTP error status: ${response.status}` }
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error('Error fetching data from OpenWeatherMapAPI:', error);
        throw error;
    }
}

export default {
    fetchCurrentWeather,
    fetchFiveDayForecast
}
