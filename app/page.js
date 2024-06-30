import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <Link className="linkStyles" href="./week-2">week-2 page</Link>
      <br></br>
      <Link className="linkStyles" href="./week-3">week-3 page</Link>
      <br></br>
      <Link className="linkStyles" href="./week-4">week-4 page</Link>
      <br></br>
      <Link className="linkStyles" href="./week-5">week-5 page</Link>
      <br></br>
      <Link className="linkStyles" href="./week-6">week-6 page</Link>
      <br></br>
    </main>
  );
}
