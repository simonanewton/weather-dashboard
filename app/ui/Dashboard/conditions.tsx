import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { payload } from "@/app/api/api";

const convertUnixtoDay = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date = new Date(adjustedTimestamp * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    return day;
}

const convertUnixtoDate = (unixTimestamp: number, timezoneOffset: number): string => {
    const adjustedTimestamp = unixTimestamp + timezoneOffset;
    const date = new Date(adjustedTimestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${month} ${day}${suffix}, ${year}`;
}

const Conditions = ({ data }: { data: payload }) => {
    return (
        <div className="p-8 flex justify-around items-center">
            <div className="space-y-10">
                <div>
                    <p className="text-2xl font-semibold">{convertUnixtoDay(data.information.date, data.information.timezone)}</p>
                    <p className="text-lg">{convertUnixtoDate(data.information.date, data.information.timezone)}</p>
                </div>
                <div>
                    <p className="text-3xl font-semibold">{data.weather.temperature}°F</p>
                    <p className="text-lg">High {data.weather.high}°F Low {data.weather.low}°F</p>
                </div>
            </div>
            <div className="space-y-14">
                <div className="justify-self-center">
                    <FontAwesomeIcon className="" icon={data.weather.conditions} size="4x" />
                </div>
                <div>
                    <p className="text-xl font-semibold">{data.weather.description}</p>
                    <p className="text-lg">Feels Like {data.weather.feels}°F</p>
                </div>
            </div>
        </div>
    );
}

export default Conditions;
