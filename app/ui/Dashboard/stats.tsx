export default function Statistics() {

    const convertUnixTime = (unixTimestamp: number) => {
        const date: Date = new Date(unixTimestamp * 1000);
        const hours: number = date.getHours();
        const minutes: number = date.getMinutes();

        const timePeriod: string = hours >= 12 ? "PM" : "AM";
        const formattedHours: number = hours % 12 || 12;
        const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${formattedHours}:${formattedMinutes} ${timePeriod}`;
    }

    return (
        <div className="">
            <p>Pressure</p>
            <p>Humidity</p>
            <p>Visibility</p>
            <p>Sunrise: {convertUnixTime(1736858535)}</p>
            <p>Sunset: {convertUnixTime(1736895045)}</p>
        </div>
    );
}
