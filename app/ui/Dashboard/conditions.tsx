import { faCloud, faCloudBolt, faCloudShowersHeavy, faCloudSun, faSmog, faSnowflake, faSun, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const matchIcon = (conditions: string): [string, IconDefinition] => {
    let description: string;
    let icon: IconDefinition;

    switch (conditions) {
        case "clear sky":
            description = "Clear Sky";
            icon = faSun; // faMoon
            break;
        case "partly cloudy":
            description = "Partly Cloudy";
            icon = faCloudSun; // faCloudMoon
            break;
        case "scattered clouds":
        case "broken clouds":
            description = "Cloudy";
            icon = faCloud;
            break;
        case "shower rain":
        case "rain":
            description = "Rainy";
            icon = faCloudShowersHeavy;
            break;
        case "thunderstorm":
            description = "Stormy"
            icon = faCloudBolt;
            break;
        case "snow":
            description = "Snowy";
            icon = faSnowflake;
            break;
        case "mist":
            description = "Foggy";
            icon = faSmog;
            break;
        default:
            description = "Default";
            icon = faCloud;
            break;
    }

    const weather: [string, IconDefinition] = [description, icon];
    return weather;
}

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
