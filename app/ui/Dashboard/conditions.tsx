import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Conditions = () => {
    return (
        <div className="px-20 flex justify-between">
            <div className="flex flex-col justify-center">
                <div className="pb-16">
                    <p className="text-4xl font-semibold">Monday</p>
                    <p className="text-xl">December 15th, 2024</p>
                </div>
                <div>
                    <p className="text-6xl font-semibold">71°F</p>
                    <p className="text-xl">High: 73°F Low: 61°F</p>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <FontAwesomeIcon className="pb-16" icon={faSmog} size="7x" />
                <div>
                    <p className="text-2xl font-semibold">Partly Cloudy</p>
                    <p className="text-xl">Feels Like: 70°F</p>
                </div>
            </div>
        </div>
    );
}

export default Conditions;
