import { useEffect, useRef, type FC, type ReactNode } from "react";

//this fixes Drei <HTML> transform issues
//similar to this: https://www.npmjs.com/package/@isaac_ua/drei-html-fix

interface CanvasWrapperProps {
  children: ReactNode;
}

export const CanvasWrapper: FC<CanvasWrapperProps> = ({ children }) => {
  const canvasCtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureCanvasSize = () => {
      if (canvasCtnRef.current) {
        const { clientHeight, clientWidth } = canvasCtnRef.current;

        canvasCtnRef.current.style.width = `${
          clientWidth % 2 === 0 ? clientWidth + 1 : clientWidth
        }px`;
        canvasCtnRef.current.style.height = `${
          clientHeight % 2 !== 0 ? clientHeight + 1 : clientHeight
        }px`;
      }
    };
    measureCanvasSize();
    window.addEventListener("resize", measureCanvasSize);
    return () => {
      window.removeEventListener("resize", measureCanvasSize);
    };
  }, []);

  return (
    <div
      ref={canvasCtnRef}
      style={{
        width: "100vw",
        height: "100dvh",
      }}
    >
      {children}
    </div>
  );
};
