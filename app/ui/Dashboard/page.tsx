import Conditions from "./conditions";
import Forecast from "./forecast";
import Statistics from "./stats";
import Featured from "./featured";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 basis-full xl:grid-cols-2 xl:basis4/5 divide-x divide-y">
            <Conditions />
            <Forecast />
            <Statistics />
            <Featured />
        </div>
    );
}
