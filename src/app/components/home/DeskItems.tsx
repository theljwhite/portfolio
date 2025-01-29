import { useMemo } from "react";
import { Gltf } from "@react-three/drei";
import { type PrimitiveProps } from "@react-three/fiber";

const REDBULL_Y_POS = 1.19;
const SINGLE_REDBULL_POS = [1, REDBULL_Y_POS, -1];

const Redbull = (props: Partial<PrimitiveProps>) => {
  return <Gltf src="./3D/redbull_can.glb" scale={1.8} {...props} />;
};

export default function DeskItems() {
  //hardcoded because I'm OCD about the red bull's positions being close to where they were before I replaced an old high triangle count redbull group .glb with this 1 redbull can .glb
  const redbullGroupXandZPositions = [
    [-1.1, -1],
    [-1, -1.22],
    [-1.24, -1.24],
    [-1.25, -1],
    [-1.42, -1],
    [-1.4, -1.23],
    [-1.52, -1.3],
  ];

  const redbullGroupRotations = useMemo(
    () =>
      Array.from(
        { length: redbullGroupXandZPositions.length },
        () => Math.random() * 4
      ),
    []
  );

  return (
    <>
      <Redbull position={SINGLE_REDBULL_POS} rotation-y={1.2} />
      {redbullGroupXandZPositions.map((pos, index) => {
        return (
          <Redbull
            key={index}
            position={[pos[0], REDBULL_Y_POS, pos[1]]}
            rotation-y={redbullGroupRotations[index]}
          />
        );
      })}
    </>
  );
}
