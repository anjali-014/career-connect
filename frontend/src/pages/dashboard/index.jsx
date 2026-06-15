import react, {useEffect} from "react";
import {useRouter} from "next/router";

//dashboard page

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("token") === null) {
            router.push("/login");
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}

