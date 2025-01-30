import { faCloud, faCloudBolt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import ForecastBlock from "@/app/ui/Subcomponents/forecast-block";
import { payload } from "@/app/api/api";

type ForecastBlock = {
    title: string,
    icon: IconDefinition,
    temperature: number
}

let hourlyForecast: ForecastBlock[] = [
    { title: "6AM", icon: faCloud, temperature: 60 },
    { title: "9AM", icon: faCloud, temperature: 61 },
    { title: "12PM", icon: faCloud, temperature: 62 },
    { title: "3PM", icon: faCloud, temperature: 63 },
    { title: "6PM", icon: faCloud, temperature: 64 }
];

let fiveDayForecast: ForecastBlock[] = [
    { title: "Monday", icon: faCloudBolt, temperature: 71 },
    { title: "Tuesday", icon: faCloudBolt, temperature: 72 },
    { title: "Wednesday", icon: faCloudBolt, temperature: 73 },
    { title: "Thursday", icon: faCloudBolt, temperature: 74 },
    { title: "Friday", icon: faCloudBolt, temperature: 75 }
];

const Forecast = ({ data }: { data: payload }) => {
    return (
        <div className="px-6 py-4 content-center">
            <p className="pb-3 text-lg font-semibold text-center">Hourly Forecast</p>
            <div className="grid grid-cols-5 justify-center gap-5 w-10/12 mx-auto">
                {hourlyForecast.map(data => <ForecastBlock key={data.title} title={data.title} icon={data.icon} temperature={data.temperature} />)}
            </div>

            <p className="py-3 text-lg font-semibold text-center">Weekly Forecast</p>
            <div className="grid grid-cols-5 justify-center gap-5 w-10/12 mx-auto">
                {fiveDayForecast.map(data => <ForecastBlock key={data.title} title={data.title.slice(0, 3)} icon={data.icon} temperature={data.temperature} />)}
            </div>
        </div>
    );
}

export default Forecast;
