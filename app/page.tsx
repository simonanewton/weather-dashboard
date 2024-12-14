import SideNav from "@/app/ui/SideNav/page";
import Dashboard from "./ui/Dashboard/page";
import Header from "./ui/Header/page";

export default function Home() {
    return (
        <main className="h-dvh py-5">
            <div className="container h-full mx-auto flex flex-col border-solid border-2 divide-y">
                <Header />
                <div className="flex-1 flex flex-row divide-x">
                    <SideNav />
                    <Dashboard />
                </div>
            </div>
        </main>
    );
}
