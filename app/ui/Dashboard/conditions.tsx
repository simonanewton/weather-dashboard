import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Sunny - faSun, faMoon
// Partly Cloudy - faCloudSun, faCloudMoon
// Cloudy - faCloud
// Rain - faCloudShowersHeavy
// Thunderstorm - faCloudBolt
// Snow - faSnowflake
// Mist/Fog - faSmog

const Conditions = () => {
    return (
        <div className="p-8 flex justify-around items-center">
            <div className="space-y-10">
                <div>
                    <p className="text-2xl font-semibold">Monday</p>
                    <p className="text-lg">December 15th, 2024</p>
                </div>
                <div>
                    <p className="text-3xl font-semibold">71°F</p>
                    <p className="text-lg">High 73°F Low 61°F</p>
                </div>
            </div>
            <div className="space-y-14">
                <div className="justify-self-center">
                    <FontAwesomeIcon className="" icon={faSmog} size="4x" />
                </div>
                <div>
                    <p className="text-xl font-semibold">Partly Cloudy</p>
                    <p className="text-lg">Feels Like 70°F</p>
                </div>
            </div>
        </div>
    );
}

export default Conditions;
