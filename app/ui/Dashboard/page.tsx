import Conditions from "./conditions";
import Forecast from "./forecast";
import Statistics from "./stats";
import Featured from "./featured";
import { payload } from "../../api/api";

export default function Dashboard({ data }: { data: payload }) {
    return (
        <div className="grid grid-cols-1 basis-full xl:grid-cols-2 xl:basis4/5 divide-x divide-y">
            <Conditions data={data} />
            <Forecast data={data} />
            <Statistics data={data} />
            <Featured />
        </div>
    );
}
