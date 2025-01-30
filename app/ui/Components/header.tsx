const Header = ({ city, country }: { city: string, country: string }) => {
    return (
        <div className="py-4 text-center">
            <p className="pb-2 text-2xl font-semibold">Weather Dashboard</p>
            <p className="text-lg font-medium">{city}, {country}</p>
        </div>
    );
}

export default Header;
