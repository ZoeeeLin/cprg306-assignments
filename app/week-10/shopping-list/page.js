"use client"

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import { useState, useEffect } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page(){

    const { user } = useUserAuth();

    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = async(newItem) => {
        try {
            const userId = user.uid;
            const itemId = await addItem(userId, newItem);
            setItems((prevItems) => [...prevItems, newItem ]);
        } catch (error) {
            console.error("Error adding item: ", error);
        }
    }
    const handleItemSelect = (selectItem) => {
        const parts = selectItem.split(`,`);
        const cleanedName = parts[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        setSelectedItemName(cleanedName);
    }

    const loadItems = async () => {
        try {
            const userId = user.uid;
            const itemList = await getItems(userId);
            setItems(itemList);
        } catch (error) {
            console.error("Error loading items: ", error);
        }
    }

    useEffect( () => {
        loadItems();
    }, [user]);

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
                        <Link className="linkStyles" href="../week-10">Back to Login page</Link>
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