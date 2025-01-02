import { useState, useEffect, createContext, useContext } from "react";

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface ScreenContextState {
  size: ScreenSize;
  isMobile: boolean;
}

const ScreenSizeContext = createContext<ScreenContextState | undefined>(
  undefined
);

export const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [size, setSize] = useState<ScreenSize>("xxl");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const getScreenSize = (): ScreenSize => {
    const width = window.innerWidth;

    if (width < 640) return "xs";
    if (width < 768) return "sm";
    if (width < 1024) return "md";
    if (width < 1280) return "lg";
    if (width < 1536) return "xl";
    return "xxl";
  };

  useEffect(() => {
    const handleResize = (): void => {
      const screenSize = getScreenSize();
      setSize(screenSize);
      setIsMobile(screenSize === "xs" || screenSize === "sm");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ size, isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = (): ScreenContextState => {
  const ctx = useContext(ScreenSizeContext);

  if (ctx === undefined) throw new Error("Missing ScreenSizeProvider wrapper");

  return ctx;
};
