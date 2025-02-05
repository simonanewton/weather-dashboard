import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForecastBlock = ({ data }: { data: { time: string, conditions: IconDefinition, temperature: number } }) => {
    return (
        <div className="px-12 md:px-0 py-4 md:py-2 grid grid-rows-1 md:grid-rows-3 grid-cols-3 md:grid-cols-1 justify-center border-solid border-2 rounded-xl text-center font-medium md:gap-3">
            <p className="text-md">{data.time}</p>
            <FontAwesomeIcon className="mx-auto" icon={data.conditions} size="lg" />
            <p className="text-md">{data.temperature}°</p>
        </div>
    );
}

export default ForecastBlock;
