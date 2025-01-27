// import { useEffect, useState } from "react";
import Dashboard from "./ui/Dashboard/page";
import Header from "./ui/Header/page";
import callAPI from "./api/api";

const loadWeatherData = async (location: string) => {
    try {
        const response = await callAPI(location);
        console.log("Successfully fetched data from backend.");
        console.log(response);
    }

    catch (error) {
        throw new Error(`Failed to fetch data from backend: ${error instanceof Error ? error.message : error}`);
    }
}

// loadWeatherData("Atlanta");

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
