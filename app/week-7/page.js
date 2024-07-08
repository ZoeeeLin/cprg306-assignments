"use client"

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";
import MealIdeas from "./meal-ideas";

export default function Page(){

    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (newItem) => {
        setItems([...itemsData, newItem ]);
    }
    const handleItemSelect = (selectItem) => {
        const parts = selectItem.split(`,`);
        const cleanedName = parts[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        setSelectedItemName(cleanedName);
    }

    return(
        <main className="min-h-screen bg-blue-200 flex">
            <div className="w-1/2">
                <NewItem onAddItem={handleAddItem}/>
                <ItemList items={items} onItemSelect={handleItemSelect}/>
            </div>
            <div className="w-1/2">
                <MealIdeas ingredient={selectedItemName} />
            </div>
            <div>
                <Link className="linkStyles" href="../">Back to Root page</Link>
            </div>
        </main>
    );
}