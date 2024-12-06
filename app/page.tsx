import SideNav from "@/app/ui/SideNav/page";
import Block from "@/app/ui/Dashboard/block";

export default function Home() {
    return (
        <main className="h-dvh py-5">
            <div className="container h-full mx-auto flex flex-col border-solid border-2 divide-y">
                <h1 className="py-4 text-center text-3xl">Weather Dashboard App</h1>
                <div className="flex-1 flex flex-row divide-x">
                    <SideNav />
                    <div className="grid grid-cols-1 basis-full md:grid-cols-2 md:basis4/5 divide-x divide-y">
                    <Block />
                    <Block />
                    <Block />
                    <Block />
                    </div>
                </div>
            </div>
        </main>
    );
}
