import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { matchIcon, filterHourlyForecast, filterWeeklyForecast } from "@/app/utils/utils";

// checks for authentication key before proceeding with API calls
const authKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;
if (!authKey) throw new Error("WEATHER_API_KEY is undefined.");

//---------------------------------------------------------------------------------------------------------------------
type APIResponse = Record<string, any>;
type filteredForecast = { time: string, conditions: IconDefinition, temperature: number }[];

// outline for information used throughout the app, state key is optional
export type payload = {
    information: {
        location: string,
        state?: string,
        country: string,
        date: number,
        timezone: number
    },
    weather: {
        temperature: number,
        feels: number,
        high: number,
        low: number,
        conditions: IconDefinition,
        description: string,
        pressure: number,
        humidity: number,
        visibility: number,
        windSpeed: number,
        sunrise: number,
        sunset: number
    },
    forecast: {
        hourly: filteredForecast,
        weekly: filteredForecast
    }
}

//---------------------------------------------------------------------------------------------------------------------
// returns name, state, country, and coordinates for given city name
const fetchGeocoding = async (location: string): Promise<APIResponse> => {
    const queryParams: string = new URLSearchParams({ q: location, appid: authKey }).toString();
    const queryURL: string = `https://api.openweathermap.org/geo/1.0/direct?${queryParams}`;

    try {
        const response = await fetch(queryURL);

        if (!response.ok) throw new Error(`fetchGeocoding HTTP Error ${response.status}: ${response.statusText}`);

        return await response.json();
    }

    catch (error) {
        console.error('Error fetching current geocoding data from OpenWeatherMapAPI:', error);
        throw error;
    }
}

// retrns data for current weather conditions for given city coordinates
const fetchCurrentWeather = async (latitude: number, longitude: number): Promise<APIResponse> => {
    const queryParams: string = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: 'imperial',
        appid: authKey
    }).toString();
    const queryURL: string = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;

    try {
        const response = await fetch(queryURL);

        if (!response.ok) throw new Error(`fetchCurrentWeather HTTP Error ${response.status}: ${response.statusText}`);

        return await response.json();
    }

    catch (error) {
        console.error('Error fetching current weather data from OpenWeatherMapAPI:', error);
        throw error;
    }
}

// returns an array of weather data for the next five days in three hour segments for given city coordinates
const fetchFiveDayForecast = async (latitude: number, longitude: number): Promise<APIResponse> => {
    const queryParams: string = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: 'imperial',
        appid: authKey
    }).toString();
    const queryURL: string = `https://api.openweathermap.org/data/2.5/forecast?${queryParams}`;

    try {
        const response = await fetch(queryURL);

        if (!response.ok) throw new Error(`fetchFiveDayForecast HTTP Error ${response.status}: ${response.statusText}`);

        return await response.json();
    }

    catch (error) {
        console.error('Error fetching forecast weather data from OpenWeatherMapAPI:', error);
        throw error;
    }
}

//---------------------------------------------------------------------------------------------------------------------
// aggregates geocoding data, current weather data, and forecasted data into a weather payload to be used throughout the dashboard
const callAPI = async (location: string): Promise<payload> => {
    try {
        const locationData = (await fetchGeocoding(location))[0];
        const currentData = await fetchCurrentWeather(locationData.lat, locationData.lon);
        const forecastData = await fetchFiveDayForecast(locationData.lat, locationData.lon);

        const weatherPayload: payload = {
            information: {
                location: locationData.name,
                state: locationData.state || "N/A",
                country: locationData.country,
                date: currentData.dt,
                timezone: currentData.timezone
            },
            weather: {
                temperature: Math.round(currentData.main.temp),
                feels: Math.round(currentData.main.feels_like),
                high: Math.round(currentData.main.temp_min),
                low: Math.round(currentData.main.temp_max),
                conditions: matchIcon(currentData.weather[0].description, currentData.dt, currentData.sys.sunrise, currentData.sys.sunset),
                description: currentData.weather[0].main,
                pressure: Math.round(currentData.main.pressure * 0.02953),
                humidity: currentData.main.humidity,
                visibility: Math.round(currentData.visibility * 0.000621371),
                windSpeed: Math.round(currentData.wind.speed),
                sunrise: currentData.sys.sunrise,
                sunset: currentData.sys.sunset
            },
            forecast: {
                hourly: filterHourlyForecast(forecastData),
                weekly: filterWeeklyForecast(forecastData)
            }
        }

        return weatherPayload;
    }

    catch (error) {
        console.error("callAPI Error:", error);
        throw error;
    }
}

export default callAPI;
