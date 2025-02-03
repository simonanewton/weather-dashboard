import { faMoon, faSun, faCloudMoon, faCloudSun, faCloud, faCloudMoonRain, faCloudShowersHeavy, faCloudBolt, faSnowflake, faSmog, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type filteredForecast = { time: string, conditions: IconDefinition, temperature: number }[];

//---------------------------------------------------------------------------------------------------------------------
// matches conditions descriptor with corresponding FontAwesome Icon, uses sunrise and sunset timstamps to support nighttime icons
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
        case "fog":
        case "haze":
            icon = faSmog;
            break;
        default:
            icon = faCloud;
            break;
    }
    return icon;
}

//---------------------------------------------------------------------------------------------------------------------
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
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${month} ${day}${suffix}, ${year}`;
}

// convert a unix timestamp to hours, minutes, and time period with respect to timezone, ex. '5:03 PM'
export const convertUnixtoTime = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date: Date = new Date(adjustedTimestamp * 1000);
    const hours: number = date.getUTCHours();
    const minutes: number = date.getUTCMinutes();

    const timePeriod: string = hours >= 12 ? "PM" : "AM";
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes} ${timePeriod}`;
}

// convert a unix timestamp to hour and time period with respect to timezone, ex. '5PM'
export const convertUnixtoHour = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date: Date = new Date(adjustedTimestamp * 1000);
    const hours: number = date.getUTCHours();

    const timePeriod: string = hours >= 12 ? "pm" : "am";
    const formattedHours: number = hours % 12 || 12;

    return `${formattedHours}${timePeriod}`;
}

//---------------------------------------------------------------------------------------------------------------------
// filters a five day forecast into an array of time, conditions, and temperature for the first five timestamps
export const filterHourlyForecast = (forecast: any): filteredForecast => {
    const filtered: filteredForecast = [];
    const numTimestamps = 5;

    for (let i = 0; i < numTimestamps; i++) {
        filtered.push({
            time: convertUnixtoHour(forecast.list[i].dt, forecast.city.timezone),
            conditions: matchIcon(forecast.list[i].weather[0].description, forecast.list[i].dt, forecast.city.sunrise, forecast.city.sunset),
            temperature: Math.round(forecast.list[i].main.temp)
        });
    }

    return filtered;
}

// filters a five day forecast into an array of time, conditions, and temperature for each day
export const filterWeeklyForecast = (forecast: any): filteredForecast => {
    const calendarDay = new Map();

    forecast.list.forEach((timestamp: any) => {
        const dateKey = new Date((timestamp.dt + forecast.city.timezone) * 1000).toISOString().split("T")[0];
        if (!calendarDay.has(dateKey)) calendarDay.set(dateKey, []);
        calendarDay.get(dateKey).push(timestamp);
    });

    let filtered: any = Array.from(calendarDay.values()).map(day => {
        const firstDt = day[0].dt;
        const conditionCounts = new Map();
        let mostFrequentCondition: string = "";
        let maxCount = 0;
        let tempHigh = 0;

        day.forEach(({ weather, main }: { weather: any, main: any }) => {
            const condition = weather[0].description;

            conditionCounts.set(condition, (conditionCounts.get(condition) || 0) + 1);
            if (conditionCounts.get(condition) > maxCount) {
                maxCount = conditionCounts.get(condition);
                mostFrequentCondition = condition;
            }

            if (main.temp > tempHigh) tempHigh = main.temp;
        });

        return {
            time: convertUnixtoWeekday(firstDt, forecast.city.timezone).slice(0, 3),
            conditions: matchIcon(mostFrequentCondition, 2, 1, 3),
            temperature: Math.round(tempHigh)
        };
    });

    if (filtered.length > 5) filtered.shift();

    return filtered;
}
