import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForecastBlock = ({ data }: { data: { time: string, conditions: IconDefinition, temperature: number } }) => {
    return (
        <div className="p-2 flex flex-col justify-around border-solid border-2 rounded-xl text-center font-medium gap-3">
            <p className="text-md">{data.time}</p>
            <FontAwesomeIcon icon={data.conditions} size="lg" />
            <p className="text-md">{data.temperature}°</p>
        </div>
    );
}

export default ForecastBlock;
