"use client"

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import { useState } from "react";

export default function Page(){
    
    const [login, setLogin] = useState();
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    
    // Sign in to Firebase with GitHub authentication
    async function handleSignIn(){
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    
    // Sign out of Firebase
    async function handleSignOut(){
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <main className="min-h-screen bg-blue-200">
            {user ? (
                // User logged in
                <div className="max-w-md mx-auto p-8">
                    <p>Welcome, {user.displayName} ({user.email})</p>
                    <Link href="./week-8/shopping-list" className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white hover:bg-blue-500 text-center">shopping-list Page</Link><br />
                    <button onClick={handleSignOut} className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white hover:bg-blue-500">
                        Sign Out
                    </button>
                </div>
            ) : (
                // User not logged in
                <div className="max-w-md mx-auto p-8">
                    <button onClick={handleSignIn} className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white hover:bg-blue-500">Login</button>
                </div>
            )}

            <div>
                <Link className="linkStyles" href="../">Back to Root page</Link>
            </div>
        </main>
    );
}

