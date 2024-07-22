"use client"

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";

export default function Page(){

    const { user } = useUserAuth();

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
            {user ? (
                <div className="flex">
                    <div>
                        <NewItem onAddItem={handleAddItem}/>
                        <ItemList items={items} onItemSelect={handleItemSelect}/>
                    </div>
                    <div>
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                    <div>
                        <Link className="linkStyles" href="../week-8">Back to Login page</Link>
                        <br></br>
                        <Link className="linkStyles" href="../">Back to Root page</Link>
                    </div>
                </div>
            ): (
                <div>
                <Link className="linkStyles" href="../page.js">Back to Login page</Link>
                </div>
            )}
        </main>
    );
}