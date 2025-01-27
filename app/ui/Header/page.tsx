const Header = ({ city }: { city: string }) => {
    return (
        <div className="py-4 text-center">
            <p className="pb-2 text-2xl font-semibold">Weather Dashboard App</p>
            <p className="text-lg font-medium">{city}</p>
        </div>
    );
}

export default Header;
