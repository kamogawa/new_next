import Link from "next/link";

function Tomato() {
  return (
    <div>
      <h2>Link pages</h2>
      <Link href="/">
        <a>Move to index</a>
      </Link>
    </div>
  );
}

export default Tomato;
