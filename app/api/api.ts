const authKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;
if (!authKey) throw new Error("WEATHER_API_KEY is undefined.");

type APIResponse = Record<string, any>;
type filteredForecast = { time: number, conditions: string, temperature: number }[];

export type payload = {
    information: {
        location: string,
        state?: string,
        country: string,
        date: number
    },
    weather: {
        temperature: number,
        feels: number,
        high: number,
        low: number,
        conditions: string,
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

const fetchGeocoding = async (location: string): Promise<APIResponse> => {
    const queryParams: string = new URLSearchParams({ q: location, appid: authKey }).toString();
    const queryURL: string = `http://api.openweathermap.org/geo/1.0/direct?${queryParams}`;

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

const filterHourlyForecast = (forecastArray: any): filteredForecast => {
    const filteredArray: filteredForecast = [];
    const numTimestamps = 5;

    for (let i = 0; i < numTimestamps; i++) {
        filteredArray.push({
            time: forecastArray[i].dt,
            conditions: forecastArray[i].weather[0].description,
            temperature: forecastArray[i].main.temp
        });
    }

    return filteredArray;
}

const filterWeeklyForecast = (forecastArray: any): filteredForecast => {
    const filteredArray: filteredForecast = [];

    for (let i = 0; i < forecastArray.length; i++) {
        if (forecastArray[i].dt_txt.slice(11) === "12:00:00") {
            filteredArray.push({
                time: forecastArray[i].dt,
                conditions: forecastArray[i].weather[0].description,
                temperature: forecastArray[i].main.temp
            });
        }
    }

    return filteredArray;
}

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
                date: currentData.dt
            },
            weather: {
                temperature: currentData.main.temp,
                feels: currentData.main.feels_like,
                high: currentData.main.temp_min,
                low: currentData.main.temp_max,
                conditions: currentData.weather[0].description,
                description: currentData.weather[0].main,
                pressure: currentData.main.pressure,
                humidity: currentData.main.humidity,
                visibility: currentData.visibility,
                windSpeed: currentData.wind.speed,
                sunrise: currentData.sys.sunrise,
                sunset: currentData.sys.sunset
            },
            forecast: {
                hourly: filterHourlyForecast(forecastData.list),
                weekly: filterWeeklyForecast(forecastData.list)
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
