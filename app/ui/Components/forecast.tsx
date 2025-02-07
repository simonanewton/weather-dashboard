import { payload } from "@/app/api/api";
import ForecastBlock from "@/app/ui/Subcomponents/forecast-block";

const Forecast = ({ data }: { data: payload }) => {
    return (
        <div className="px-4 sm:px-8 py-2 content-center border-solid border-2 rounded-2xl">
            <p className="pb-4 pt-2 md:pb-2 md:pt-0 text-xl md:text-lg font-semibold text-center">Hourly Forecast</p>
            <div className="grid grid-cols-1 md:grid-cols-5 justify-center gap-3 md:gap-5 md:9/12 xl:w-11/12 mx-auto">
                {data.forecast.hourly.map(timestamp => <ForecastBlock key={timestamp.time} data={timestamp} />)}
            </div>

            <p className="pb-4 pt-8 md:pb-2 md:pt-3 text-xl md:text-lg font-semibold text-center">Weekly Forecast</p>
            <div className="grid grid-cols-1 md:grid-cols-5 justify-center gap-3 md:gap-5 md:9/12 xl:w-11/12 mx-auto">
                {data.forecast.weekly.map(timestamp => <ForecastBlock key={timestamp.time} data={timestamp} />)}
            </div>
        </div>
    );
}

export default Forecast;
