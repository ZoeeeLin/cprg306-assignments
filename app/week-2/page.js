import StudentInfo from "./student-info";
import Link from "next/link";

export default function Page() {
    return (
      <main>
        <h1>Shopping List</h1>
        <StudentInfo />
        <Link className="linkStyles" href="../">Back to Root page</Link>
      </main>
    );
  }