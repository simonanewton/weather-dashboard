// 'use client';

// import { useEffect, useState } from 'react';
// import fetchMap from '../../api/weather';

// function WeatherMap(): JSX.Element {
//     const [imageSrc, setImageSrc] = useState<string | null>(null);

//     useEffect(() => {
//         const loadImage = async (): Promise<void> => {
//             try {
//                 const imageUrl = await fetchMap(); // Call the utility function
//                 setImageSrc(imageUrl); // Set the fetched image URL
//             } catch (error) {
//                 console.error((error as Error).message);
//             }
//         };

//         loadImage();
//     }, []);

//     return (
//         <div className="">
//             {imageSrc ? (
//                 <img src={imageSrc} alt="Fetched from third-party API" />
//             ) : (
//                 <p>Loading image...</p> // Fallback UI while loading
//             )}
//         </div>
//     );
// }

// export default WeatherMap;

export default function Statistics() {
    return (
        <div className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Porro doloremque iste id repellat suscipit vero praesentium
            nostrum quibusdam similique, molestias minus obcaecati
            expedita mollitia molestiae? Accusantium aliquam veritatis
            excepturi repellendus?
        </div>
    );
}
