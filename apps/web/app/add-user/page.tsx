
"use client"

import { useEffect } from "react";

export default function Home() {
    async function addUser() {
        const response = await fetch("http://localhost:3001/addUser");
        const data = await response.json();
        console.log(data);
    }
    useEffect(() => {
        addUser()
    }, []);

    return (
        <div>
            <h1>This is testing page</h1>
        </div>
    );
}
