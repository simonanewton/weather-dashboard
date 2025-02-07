import { faArrowsDownToLine, faClock, faDroplet, faEye, faWind } from "@fortawesome/free-solid-svg-icons";
import { faClock as faClockAlt } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { payload } from "@/app/api/api";
import StatsBlock from "@/app/ui/Subcomponents/stats-block";

const convertUnixtoTime = (unixTimestamp: number, timezoneOffset: number) => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date: Date = new Date(adjustedTimestamp * 1000);
    const hours: number = date.getUTCHours();
    const minutes: number = date.getUTCMinutes();

    const timePeriod: string = hours >= 12 ? "PM" : "AM";
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes} ${timePeriod}`;
}

const Statistics = ({ data }: { data: payload }) => {
    let stats: { title: string, value: string | number, metric: string, icon: IconDefinition }[] = [
        { title: "Pressure", value: data.weather.pressure, metric: " in", icon: faArrowsDownToLine },
        { title: "Humidity", value: data.weather.humidity, metric: "%", icon: faDroplet },
        { title: "Visibility", value: data.weather.visibility, metric: " mi", icon: faEye },
        { title: "Wind Speed", value: data.weather.windSpeed, metric: " mph", icon: faWind },
        { title: "Sunrise", value: convertUnixtoTime(data.weather.sunrise, data.information.timezone), metric: "", icon: faClockAlt },
        { title: "Sunset", value: convertUnixtoTime(data.weather.sunset, data.information.timezone), metric: "", icon: faClock }
    ];

    return (
        <div className="px-4 py-4 sm:px-8 sm:py-4 content-center border-solid border-2 rounded-2xl">
            <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map(stat => <StatsBlock key={stat.title} data={stat} />)}
            </div>
        </div>
    );
}

export default Statistics;
