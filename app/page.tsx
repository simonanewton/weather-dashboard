import Dashboard from "./ui/Dashboard/page";
import Header from "./ui/Header/page";

export default function Home() {
    return (
        <main className="h-dvh">
            <div className="container min-h-full mx-auto flex flex-col border-solid border-2 divide-y">
                <Header />
                <Dashboard />
            </div>
        </main>
    );
}
