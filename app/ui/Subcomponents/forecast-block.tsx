import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForecastBlock = ({ title, icon, temperature }: { title: string, icon: IconDefinition, temperature: number }) => {
    return (
        <div className="p-2 flex flex-col justify-around border-solid border-2 rounded-xl text-center font-medium gap-3">
            <p className="text-md">{title}</p>
            <FontAwesomeIcon icon={icon} size="lg" />
            <p className="text-md">{temperature}°</p>
        </div>
    );
}

export default ForecastBlock;
