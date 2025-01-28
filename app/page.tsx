'use client';
import { useState, useEffect, createContext } from "react";
import Dashboard from "./ui/Dashboard/page";
import Header from "./ui/Header/page";
import callAPI, { payload } from "./api/api";

type LocationContextType = React.Dispatch<React.SetStateAction<string>>;

export const LocationContext = createContext<LocationContextType | undefined>(undefined);

const Home = () => {
    const [location, updateLocation] = useState<string>("Atlanta");
    const [weather, updateWeather] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // setIsLoading(true);
                const response = await callAPI(location);
                updateWeather(response);
                // console.log("Successfully fetched data from backend");
                // console.log(response);
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
                    <Dashboard data={weather} />
                </LocationContext.Provider>
            </div>
        </main>
    );
}

export default Home;
