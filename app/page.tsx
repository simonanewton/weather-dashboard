'use client';
import { useState, useEffect } from "react";
import callAPI, { payload } from "./api/api";
import { LocationContext } from "./api/context";
import Conditions from "./ui/Dashboard/conditions";
import Forecast from "./ui/Dashboard/forecast";
import Statistics from "./ui/Dashboard/stats";
import Featured from "./ui/Dashboard/featured";
import Header from "./ui/Dashboard/header";

const Home = () => {
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

    if (isLoading) return (<div>Loading...</div>);

    return (
        <main className="h-dvh">
            <div className="container min-h-full mx-auto flex flex-col border-solid border-2 divide-y">
                <LocationContext.Provider value={updateLocation}>
                    <Header city={weather.information.location} country={weather.information.country} />
                    <div className="grid grid-cols-1 basis-full xl:grid-cols-2 xl:basis4/5 divide-x divide-y">
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
