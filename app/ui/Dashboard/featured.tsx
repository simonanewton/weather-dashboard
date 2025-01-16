import FeaturedBlock from "./featured-block";

const cities: string[] = ["Atlanta, Georgia", "Los Angeles, California", "Dallas, Texas", "Paris, France", "Bamako, Mali", "Tokyo, Japan"]

const Featured = () => {
    return (
        <div className="p-8">
            <p className="pb-5 text-2xl font-semibold text-center">Featured Cities</p>
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                {cities.map(city => <FeaturedBlock key={city} name={city} />)}
            </div>
        </div>
    );
}

export default Featured;
