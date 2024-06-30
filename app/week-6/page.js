"use client"

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";

export default function Page(){

    const [items, setItems] = useState(itemsData);
    const handleAddItem = (newItem) => {
        setItems([...itemsData, newItem ]);
    }

    return(
        <main className="min-h-screen bg-blue-200">
            <div>
                <NewItem onAddItem={handleAddItem}/>
            </div>
            <div>
                <ItemList items={items}/>
            </div>
            <Link className="linkStyles" href="../">Back to Root page</Link>
        </main>
    );
}