import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForecastBlock = ({ title, icon, temperature }: { title: string, icon: IconDefinition, temperature: number }) => {
    return (
        <div className="p-4 flex flex-col justify-around border-solid border-2 rounded-xl text-center font-medium gap-4">
            <p className="">{title}</p>
            <FontAwesomeIcon icon={icon} size="xl" />
            <p className="text-lg">{temperature}°</p>
        </div>
    );
}

export default ForecastBlock;
