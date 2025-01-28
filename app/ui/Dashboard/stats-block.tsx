import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatsBlock = ({ data }: { data: { title: string, value: string | number, metric: string, icon: IconDefinition } }) => {
    return (
        <div className="p-3 flex flex-col justify-around gap-4 border-solid border-2 rounded-xl text-center font-medium">
            <p className="text-md">{data.title}</p>
            <FontAwesomeIcon icon={data.icon} size="lg" />
            <p className="text-sm font-semibold">{data.value}{data.metric}</p>
        </div>
    );
}

export default StatsBlock;
