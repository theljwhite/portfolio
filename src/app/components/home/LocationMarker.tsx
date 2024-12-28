import * as THREE from "three";
import { useSceneStore } from "@/app/store/scene";
import { Html } from "@react-three/drei";
import { BackArrowIcon } from "../UI/Icons";

//TODO - this is a temp solution to allow leaving camera focused areas of the scene
// - this is controlled by zustand state w/ 1 rendered component in <Scene>.
// - there are issues when too many Drei <HTML> elements are rendered w/ occlude,
// - so this allows 1 to be rendered and for it to be controlled with state instead
// - of multiple <LocationMarker> rendered.

interface LocationMarkerProps {
  visible: boolean;
}

export default function LocationMarker({ visible }: LocationMarkerProps) {
  const { locationMarker } = useSceneStore((state) => state);
  const { title, position, onClickAction } = locationMarker;

  return (
    <mesh position={new THREE.Vector3(...position)}>
      <Html>
        <div
          onClick={onClickAction}
          className={`${onClickAction && "cursor-pointer"} 
            ${visible ? "opacity-100" : "opacity-0"}
            flex justify-start  transition-opacity duration-200 items-center min-w-[7em]`}
        >
          <div className="bg-white text-black text-xl w-[1.5em] h-[1.5em] rounded-full text-center font-bold">
            <div className="inline-block align-middle mb-0.5">
              <BackArrowIcon size={20} />
            </div>
          </div>
          <div className="inline-block align-middle">
            <h1 className="text-white text-lg min-w-[10em] pl-2">{title}</h1>
          </div>
        </div>
      </Html>
    </mesh>
  );
}
