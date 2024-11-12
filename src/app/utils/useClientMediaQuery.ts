import { useState, useEffect } from "react";

export default function useClientMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = (e: MediaQueryListEvent): void => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", handleMatchChange);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return matches;
}
