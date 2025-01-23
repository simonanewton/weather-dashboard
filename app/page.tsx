import API, { APIResponse } from "./api/api";
import Dashboard from "./ui/Dashboard/page";
import Header from "./ui/Header/page";

let weatherData: APIResponse | undefined;

const loadWeatherData = async () => {
    try {
        weatherData = await API.fetchCurrentWeather();
        console.log("Successfully fetched data from backend.");
        console.log(weatherData);
    }

    catch (error) {
        throw new Error(`Failed to fetch data from backend: ${error instanceof Error ? error.message : error}`);
    }
}

loadWeatherData();

export default function Home() {
    return (
        <main className="h-dvh">
            <div className="container min-h-full mx-auto flex flex-col border-solid border-2 divide-y">
                <Header />
                <Dashboard />
            </div>
        </main>
    );
}
