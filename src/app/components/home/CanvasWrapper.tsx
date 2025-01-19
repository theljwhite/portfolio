import { useEffect, useRef, type FC, type ReactNode } from "react";

//this fixes Drei <HTML> transform issues
//similar to this: https://www.npmjs.com/package/@isaac_ua/drei-html-fix
//but this also still allows R3F Canvas to resize properly (Isaac's fix, at least for me, breaks Canvas during small to large window resize)

interface CanvasWrapperProps {
  children: ReactNode;
}

export const CanvasWrapper: FC<CanvasWrapperProps> = ({ children }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureCanvasSize = () => {
      if (canvasRef.current) {
        const { clientHeight, clientWidth } = canvasRef.current;
        canvasRef.current.style.width = `${
          clientWidth % 2 === 0 ? clientWidth + 1 : clientWidth
        }px`;
        canvasRef.current.style.height = `${
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
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      ref={canvasRef}
    >
      {children}
    </div>
  );
};
