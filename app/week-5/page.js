"use client"

import Link from "next/link";
import ItemList from "./item-list";

export default function Page(){
    return(
        <main className="min-h-screen bg-blue-200">
            <ItemList />
            <Link className="linkStyles" href="../">Back to Root page</Link>
        </main>
    );
}