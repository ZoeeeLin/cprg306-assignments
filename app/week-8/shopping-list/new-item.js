"use client";

import { useState } from "react";
import crypto from "crypto";


export default function NewItem({onAddItem}){

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    const handleSubmit = (event) => {

        event.preventDefault();

        const item = {
            id: crypto.randomBytes(8).toString('hex'),
            name,
            quantity,
            category
        }

        onAddItem(item);

        setName("");
        setQuantity(1);
        setCategory("produce");
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const handleCategoryChange = (event) => setCategory(event.target.value);

    return(
        <div>
            <div className="max-w-md mx-auto p-8">
                <h1 className="text-white text-4xl font-bold mb-6 p-3 text-center">Create A Item</h1>
                <div className="bg-slate-800 p-4 mb-4 rounded-lg border border-cyan-50">
                    <form onSubmit={handleSubmit}>
                        <input required 
                        onChange={handleNameChange} 
                        value={name} 
                        placeholder="Item name" 
                        className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white" />
                        <div className="flex space-x-4 mb-3">
                            <input required 
                            type="number"
                            min={1}
                            max={99}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white w-1/2" />
                            <select required
                            onChange={handleCategoryChange}
                            value={category}
                            className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white w-1/2"
                            placeholder="Produce">
                                <option value="" disabled>Category</option>
                                <option value="produce">Produce</option>
                                <option value="dairy">Dairy</option>
                                <option value="bakery">Bakery</option>
                                <option value="meat">Meat</option>
                                <option value="frozen">Frozen Foods</option>
                                <option value="canned">Canned Goods</option>
                                <option value="dry">Dry Goods</option>
                                <option value="beverages">Beverages</option>
                                <option value="snacks">Snacks</option>
                                <option value="household">Household</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit"
                        className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white hover:bg-blue-500">+</button>
                    </form>
                </div>
            </div>
        </div>
    );
}