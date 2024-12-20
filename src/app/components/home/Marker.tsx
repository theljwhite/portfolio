import * as THREE from "three";
import { Html } from "@react-three/drei";

interface MarkerProps {
  title: string;
  position: number[];
  textColor: string;
  circleBoxColor: string;
  circleBoxText: string;
  children: React.ReactNode;
  visible: boolean;
  onClickAction?: (...args: any[]) => any;
}

export default function Marker({
  title,
  position,
  textColor,
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
            className={`${circleBoxColor} ${circleBoxText} w-[1.5em] h-[1.5em] rounded-full text-center font-bold`}
          >
            <div className="inline-block align-middle">{children}</div>
          </div>
          <div className="inline-block align-middle">
            <h1 className={`${textColor} text-lg min-w-[7em] pl-2`}>{title}</h1>
          </div>
        </div>
      </Html>
    </mesh>
  );
}
