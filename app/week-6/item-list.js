"use client"

import { useState } from "react";
import Item from "./item";

export default function ItemList({items}){

    let itemArray = items.map( (item) => ({...item}));

    const [sortBy, setSortBy] = useState("name");
    const [grouped, setGrouped] = useState(false);

    const displayItems = grouped ?
    Object.entries(itemArray.reduce( (groupedItems, item) => {
        const category = item.category;
        if (groupedItems[category] == null) groupedItems[category] = [];
        groupedItems[category].push(item);
        return groupedItems;
    }, {}))
    : itemArray.sort( (a,b) => {
            let nameA = a[sortBy].toUpperCase();
            let nameB = b[sortBy].toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
    })

    const handleSortClick = (event) => {
        setSortBy(event.target.value);
        setGrouped(false);
    }
    const handleGroupedClick = () => setGrouped(true);

    return(
        <div className="max-w-md mx-auto p-18">
            <h1 className="text-white text-4xl font-bold mb-6 p-3 text-center">Shopping List</h1>
            <div className="mb-4">
                <label className="font-bold">Sort By: </label>
                <button className="p-1 m-1 w-28 bg-blue-300 border border-cyan-500 rounded font-bold" onClick={handleSortClick} value="name">Name</button>
                <button className="p-1 m-1 w-28 bg-blue-400 border border-cyan-500 rounded font-bold" onClick={handleSortClick} value="category">Category</button>
                <button className="p-1 m-1 w-28 bg-blue-500 border border-cyan-500 rounded font-bold" onClick={handleGroupedClick}>Grouped category</button>
            </div>

            <ul>
                {grouped ? (
                    displayItems.map(([category, item]) => (
                        <li key={category}>
                            <h2 className="font-bold text-lg capitalize">{category}:</h2>
                            <ul>
                                {item.map((item) => (
                                    <Item key={item.id} itemObj = {item} />
                                ))}
                            </ul>
                        </li>
                    ))
                )
                : (displayItems.map((item) => (
                    <Item key={item.id} itemObj = {item} />
                )))}
            </ul>
        </div>
    );
}