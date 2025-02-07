'use client';
import { useState, useEffect } from "react";
import callAPI, { payload } from "@/app/api/api";
import { LocationContext } from "@/app/utils/context";
import Conditions from "@/app/ui/Components/conditions";
import Forecast from "@/app/ui/Components/forecast";
import Statistics from "@/app/ui/Components/stats";
import Featured from "@/app/ui/Components/featured";
import Header from "@/app/ui/Components/header";

const Home = () => {
    // states for current location, weather payload data, and initial application load
    const [location, updateLocation] = useState<string>("Atlanta");
    const [weather, updateWeather] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await callAPI(location);
                updateWeather(response);
            }

            catch (error) {
                console.log(`Failed to fetch data from backend: ${error instanceof Error ? error.message : error}`);
            }

            finally {
                setIsLoading(false);
            }
        }
        fetchWeatherData();
    }, [location]);

    // if initial API response data isn't ready yet, display temporary loading screen
    if (isLoading) return (<div>Loading...</div>);

    return (
        <main className="h-dvh flex flex-col">
            <div className="container pb-4 flex-1 mx-auto flex flex-col">
                <LocationContext.Provider value={updateLocation}>
                    <Header city={weather.information.location} country={weather.information.country} />
                    <div className="grid grid-cols-1 basis-full xl:grid-cols-2 xl:basis4/5 gap-4">
                        <Conditions data={weather} />
                        <Forecast data={weather} />
                        <Statistics data={weather} />
                        <Featured />
                    </div>
                </LocationContext.Provider>
            </div>
        </main>
    );
}

export default Home;
