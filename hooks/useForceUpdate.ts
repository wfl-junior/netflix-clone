import { useState } from "react";

export function useForceUpdate() {
  const [count, setCount] = useState(1);
  return () => setCount(count + 1);
}
