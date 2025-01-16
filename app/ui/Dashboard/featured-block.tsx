const FeaturedBlock = ({ name }: { name: string }) => {
    return (
        <div className="p-4 border-solid border-2 rounded-xl text-center font-medium">
            <p className="">{name}</p>
        </div>
    );
}

export default FeaturedBlock;
