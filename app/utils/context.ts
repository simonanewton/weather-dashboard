import { createContext } from "react";

type LocationContextType = React.Dispatch<React.SetStateAction<string>>;

export const LocationContext = createContext<LocationContextType | undefined>(undefined);
