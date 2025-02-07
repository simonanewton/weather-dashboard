import FeaturedBlock from "@/app/ui/Subcomponents/featured-block";

const cities: [string, string][] = [
    ['Atlanta', 'Georgia'],
    ['Los Angeles', 'California'],
    ['Dallas', 'Texas'],
    ['Paris', 'France'],
    ['Bamako', 'Mali'],
    ['Tokyo', 'Japan']
];

const Featured = () => {
    return (
        <div className="px-4 sm:px-8 py-4 content-center border-solid border-2 rounded-2xl">
            <p className="pb-3 text-xl md:text-lg font-semibold text-center">Featured Cities</p>
            <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-2 gap-5 w-100 xl:w-11/12 mx-auto">
                {cities.map(city => <FeaturedBlock key={city[0]} name={city} />)}
            </div>
        </div>
    );
}

export default Featured;
