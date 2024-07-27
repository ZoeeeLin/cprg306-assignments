import { db } from "../_utils/firebase";
import { collection, getDoc, addDoc, query, doc } from "firebase/firestore";

export async function getItems(userId){
    const docRef = doc(db, "users", userId);
    const itemCollectionRef = collection(docRef, "items");
    const queryItems = query(itemCollectionRef);
    const querySnap = await getDoc(queryItems);
    const itemList = [];

    try {
        querySnap.array.forEach(element => {
            let thisItem = {
                id: doc.id,
                ...doc.data()
            }
            itemList.push(thisItem);
        });
        return itemList;
    } catch (error) {
        console.log(error);
    }
}

export async function addItem(userId, item){
    try {
        const docRef = doc(db, "users", userId);
        const itemCollectionRef = collection(db, "users", userId, "items");
        const addItemPromise = await addDoc(itemCollectionRef, item);
        return addItemPromise.id;
    } catch (error) {
        console.log(error);
    }
}

