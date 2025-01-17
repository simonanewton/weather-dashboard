import { faArrowsDownToLine, faClock, faDroplet, faEye, faWind } from "@fortawesome/free-solid-svg-icons";
import { faClock as faClockAlt } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import StatsBlock from "./stats-block";

const Statistics = () => {

    const convertUnixTime = (unixTimestamp: number) => {
        const date: Date = new Date(unixTimestamp * 1000);
        const hours: number = date.getHours();
        const minutes: number = date.getMinutes();

        const timePeriod: string = hours >= 12 ? "PM" : "AM";
        const formattedHours: number = hours % 12 || 12;
        const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${formattedHours}:${formattedMinutes} ${timePeriod}`;
    }

    let stats: { title: string, value: string, metric: string, icon: IconDefinition }[] = [
        {
            title: "Pressure",
            value: (Math.round(1019 * 0.02953)).toString(),
            metric: " in",
            icon: faArrowsDownToLine
        },
        {
            title: "Humidity",
            value: (33).toString(),
            metric: "%",
            icon: faDroplet
        },
        {
            title: "Visibility",
            value: (Math.round(10000 * 0.000621371)).toString(),
            metric: " mi",
            icon: faEye
        },
        {
            title: "Wind Speed",
            value: (17).toString(),
            metric: " mph",
            icon: faWind
        },
        {
            title: "Sunrise",
            value: convertUnixTime(1736858535),
            metric: "",
            icon: faClockAlt
        },
        {
            title: "Sunset",
            value: convertUnixTime(1736895045),
            metric: "",
            icon: faClock
        }
    ];

    return (
        <div className="p-8 content-center">
            <div className="grid grid-rows-2 grid-cols-3 gap-4">
                {stats.map(stat => <StatsBlock key={stat.title} title={stat.title} value={stat.value} metric={stat.metric} icon={stat.icon} />)}
            </div>
        </div>
    );
}

export default Statistics;
