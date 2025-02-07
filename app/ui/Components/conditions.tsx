import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { payload } from "@/app/api/api";
import { convertUnixtoWeekday, convertUnixtoDate, convertUnixtoTime } from "@/app/utils/utils";

const Conditions = ({ data }: { data: payload }) => {
    return (
        <div className="py-8 xl:py-0 flex justify-around items-center border-solid border-2 rounded-2xl">
            <div className="space-y-10">
                <div>
                    <p className="text-2xl font-semibold">{convertUnixtoWeekday(data.information.date, data.information.timezone)}</p>
                    <p className="text-lg">{convertUnixtoDate(data.information.date, data.information.timezone)}</p>
                </div>
                <div>
                    <p className="text-3xl font-semibold">{data.weather.temperature}°F</p>
                    <p className="text-lg">Feels Like {data.weather.feels}°F</p>
                </div>
            </div>
            <div className="space-y-14">
                <div className="justify-self-center">
                    <FontAwesomeIcon className="" icon={data.weather.conditions} size="4x" />
                </div>
                <div>
                    <p className="text-xl font-semibold">{data.weather.description}</p>
                    <p className="text-lg">{convertUnixtoTime(data.information.date, data.information.timezone)}</p>
                </div>
            </div>
        </div>
    );
}

export default Conditions;
