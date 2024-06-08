import Link from "next/link";
import NewItem from "./new-item";


export default function Page(){
    return(
        <main className="min-h-screen bg-blue-200">
            <NewItem />
            <Link className="linkStyles" href="../">Back to Root page</Link>
        </main>
    );
}