import CurrentConditions from "./current";
import Forecast from "./forecast";
import Statistics from "./stats";
import WeatherMap from "./map";
import { useState, useEffect } from "react";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 basis-full md:grid-cols-2 md:basis4/5 divide-x divide-y">
            <CurrentConditions />
            <Forecast />
            <Statistics />
            <WeatherMap />
        </div>
    );
}
