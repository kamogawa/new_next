import { useRouter } from "next/router";
import { useState } from "react";

const app = () => {
  const [name, setName] = useState("btc-bitcoin");
  const router = useRouter();
  return (
    <div>
      <h2>search coin</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: "12px" }} />
      <button type="button" onClick={() => router.push(`/user/${name}`)}>
        go {name}
      </button>
    </div>
  );
};

export default app;
