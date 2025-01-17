import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatsBlock = ({ title, value, metric, icon }: { title: string, value: string, metric: string, icon: IconDefinition }) => {
    return (
        <div className="p-3 flex flex-col justify-around gap-4 border-solid border-2 rounded-xl text-center font-medium">
            <p className="text-md">{title}</p>
            <FontAwesomeIcon icon={icon} size="lg" />
            <p className="text-sm font-semibold">{value}{metric}</p>
        </div>
    );
}

export default StatsBlock;
