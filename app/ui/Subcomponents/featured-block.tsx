'use client';
import { useContext } from "react";
import { LocationContext } from "@/app/api/context";

const FeaturedBlock = ({ name }: { name: [string, string] }) => {
    let updateLocation = useContext(LocationContext);
    if (!updateLocation) throw new Error("Must be wrapped in a LocationContext.Provider");

    return (
        <button onClick={() => updateLocation(name[0])} className="p-4 border-solid border-2 rounded-xl text-center font-medium">
            {name[0]}, {name[1]}
        </button>
    );
}

export default FeaturedBlock;
