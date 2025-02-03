import { payload } from "@/app/api/api";
import ForecastBlock from "@/app/ui/Subcomponents/forecast-block";

const Forecast = ({ data }: { data: payload }) => {
    return (
        <div className="px-6 py-4 content-center">
            <p className="pb-3 text-lg font-semibold text-center">Hourly Forecast</p>
            <div className="grid grid-cols-5 justify-center gap-5 w-10/12 mx-auto">
                {data.forecast.hourly.map(timestamp => <ForecastBlock key={timestamp.time} data={timestamp} />)}
            </div>

            <p className="py-3 text-lg font-semibold text-center">Weekly Forecast</p>
            <div className="grid grid-cols-5 justify-center gap-5 w-10/12 mx-auto">
                {data.forecast.weekly.map(timestamp => <ForecastBlock key={timestamp.time} data={timestamp} />)}
            </div>
        </div>
    );
}

export default Forecast;
