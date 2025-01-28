import { faMoon, faSun, faCloudMoon, faCloudSun, faCloud, faCloudMoonRain, faCloudShowersHeavy, faCloudBolt, faSnowflake, faSmog, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type filteredForecast = { time: number, conditions: string, temperature: number }[];

export const filterHourlyForecast = (forecastArray: any): filteredForecast => {
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

export const filterWeeklyForecast = (forecastArray: any): filteredForecast => {
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

export const matchIcon = (conditions: string, time: number, sunrise: number, sunset: number): IconDefinition => {
    let darkOutside: boolean = time < sunrise || time >= sunset;
    let icon: IconDefinition;

    switch (conditions) {
        case "clear sky":
            icon = darkOutside ? faMoon : faSun;
            break;
        case "partly cloudy":
        case "scattered clouds":
            icon = darkOutside ? faCloudMoon : faCloudSun;
            break;
        case "broken clouds":
            icon = faCloud;
            break;
        case "shower rain":
        case "rain":
            icon = darkOutside ? faCloudMoonRain : faCloudShowersHeavy;
            break;
        case "thunderstorm":
            icon = faCloudBolt;
            break;
        case "snow":
            icon = faSnowflake;
            break;
        case "mist":
            icon = faSmog;
            break;
        default:
            icon = faCloud;
            break;
    }
    return icon;
}

// convert a unix timestamp to the day of the week with respect to timezone, ex. 'Monday'
export const convertUnixtoWeekday = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date = new Date(adjustedTimestamp * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    return day;
}

// convert a unix timestamp to long-form date with respect to timezone, ex. 'January 28th, 2025'
export const convertUnixtoDate = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date = new Date(adjustedTimestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${month} ${day}${suffix}, ${year}`;
}

// convert a unix timestamp to hours, minutes, and time period with respect to timezone, ex. '5:03 PM'
export const convertUnixtoTime = (unixTimestamp: number, timezoneOffset: number) => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date: Date = new Date(adjustedTimestamp * 1000);
    const hours: number = date.getUTCHours();
    const minutes: number = date.getUTCMinutes();

    const timePeriod: string = hours >= 12 ? "PM" : "AM";
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes} ${timePeriod}`;
}
