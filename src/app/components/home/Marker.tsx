import * as THREE from "three";
import { Html, Circle } from "@react-three/drei";

interface MarkerProps {
  title?: string;
  position: number[];
  titleTextClass?: string;
  circleBoxColor?: string;
  circleBoxText?: string;
  children: React.ReactNode;
  visible: boolean;
  onClickAction?: (...args: any[]) => any;
}

export default function Marker({
  title,
  position,
  titleTextClass,
  circleBoxColor,
  circleBoxText,
  children,
  visible,
  onClickAction,
}: MarkerProps) {
  return (
    <mesh position={new THREE.Vector3(...position)}>
      <Html>
        <div
          onClick={onClickAction}
          className={`${onClickAction && "cursor-pointer"} 
          ${visible ? "opacity-100" : "opacity-0"}
          flex justify-start  transition-opacity duration-200 items-center min-w-[7em]`}
        >
          <div
            className={`${circleBoxColor ?? "bg-white"} ${
              circleBoxText ?? "text-black text-xl"
            } w-[1.5em] h-[1.5em] rounded-full text-center font-bold`}
          >
            <div className="inline-block align-middle">{children}</div>
          </div>
          {title && (
            <div className="inline-block align-middle">
              <h1
                className={`${
                  titleTextClass ?? "text-white"
                } text-lg min-w-[10em] pl-2`}
              >
                {title}
              </h1>
            </div>
          )}
        </div>
      </Html>
    </mesh>
  );
}
