const apikey = '8b213afb1756e36960ca5ef8252dde51';
const url = `https://tile.openweathermap.org/map/precipitation_new/2/2/1.png?appid=${apikey}`;

const fetchMap = async (): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob(); // Get the image as a blob
    return URL.createObjectURL(blob); // Convert blob to object URL for use in <img> tags
};

export default fetchMap;
