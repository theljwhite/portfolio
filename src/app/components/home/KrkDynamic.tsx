import { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { SpotLight, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import type {
  SpotLight as TSpotLight,
  InstancedMesh as TInstancedMesh,
} from "three";
import { suspend } from "suspend-react";
import { createAudio } from "../../utils/audio";

//TODO fix any type's.

//TODO figure a way to eliminate useEffects and setting state in intervals.
//according to this r3f docs: https://r3f.docs.pmnd.rs/advanced/pitfalls,
//it's better to do all in useFrame but I think for now the intervals are neccessary to achieve what I need it to do

//TODO - because of HTML occlude="blending" bug, the onPointerOver's here,
//for now have to use the document.body to set cursor pointer.
//when fixed, they can use gl.domElement.style.cursor = "pointer" from useThree's gl

const SPOT_COLOR_CHANGE_MS = 12_000;
const SPOT_SPEED_CHANGE_MS = 24_000;
const ANALYSER_OBJ_WIDTH = 0.03;
const ANALYSER_OBJ_HEIGHT = 0.08;
const ANALYSER_OBJ_SPACE = 1.5;
const ANALYSER_Y_POS = 1500;

export default function KrkDynamic() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const rightSpotlightRef = useRef<TSpotLight>();
  const leftSpotlightRef = useRef<TSpotLight>();
  const visualiserRef = useRef<TInstancedMesh>();

  const timeRef = useRef<number | undefined>(0);

  const { scene } = useGLTF("./3D/krk_single.glb");
  const obj = new THREE.Object3D();

  const leftSpotlightColors: number[] = [
    0xb00c3f, 0xa855f7, 0x006cff, 0xff00b9,
  ];
  const rightSpotlightColors: number[] = [
    0x1d4ed8, 0x22c55e, 0xff9300, 0x00ff46,
  ];

  const {
    gain,
    ctx,
    update: updateAudio,
    data,
  } = suspend(() => createAudio("./Chee.mp3"), ["./Chee.mp3"]);

  useEffect(() => {
    if (isAudioPlaying) {
      timeRef.current = performance.now() / 1000;

      const indexIntervalId = setInterval(() => {
        setColorIndex(
          (prevIndex) => (prevIndex + 1) % leftSpotlightColors.length
        );
      }, SPOT_COLOR_CHANGE_MS);

      const speedIndexId = setInterval(() => {
        setSpeedMultiplier(2);
      }, SPOT_SPEED_CHANGE_MS);

      return () => {
        clearInterval(indexIntervalId);
        clearInterval(speedIndexId);
      };
    }
  }, [isAudioPlaying]);

  useFrame((state) => {
    if (
      rightSpotlightRef.current &&
      leftSpotlightRef.current &&
      visualiserRef.current &&
      isAudioPlaying
    ) {
      const elapsedTime = state.clock.getElapsedTime();

      const xPos = Math.sin(elapsedTime * speedMultiplier) * 2;
      const yPos = Math.cos(elapsedTime * speedMultiplier) * 2;

      rightSpotlightRef.current.target.position.x = xPos;
      rightSpotlightRef.current.target.position.y = yPos;

      leftSpotlightRef.current.target.position.x = xPos;
      leftSpotlightRef.current.target.position.y = yPos;

      const { avg } = updateAudio();

      for (let i = 0; i < data.length; i++) {
        const widthSpace = ANALYSER_OBJ_WIDTH * ANALYSER_OBJ_SPACE;

        obj.position.set(
          i * widthSpace - (data.length * widthSpace) / 2,
          data[i] / ANALYSER_Y_POS,
          0
        );
        obj.updateMatrix();
        visualiserRef.current.setMatrixAt(i, obj.matrix);
      }

      (visualiserRef.current.material as any).color.setHSL(
        avg / 100,
        0.75,
        0.75
      );

      visualiserRef.current.instanceMatrix.needsUpdate = true;
      visualiserRef.current.updateMatrixWorld();
    }
  });

  const onSpeakerClick = (): void => {
    setIsAudioPlaying(!isAudioPlaying);
    if (isAudioPlaying) gain.disconnect();
    else gain.connect(ctx.destination);
  };

  return (
    <>
      <primitive
        onClick={onSpeakerClick}
        onPointerOver={(e: ThreeEvent<any>) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        rotation={[0, 0.6, 0]}
        position={[-3, 0, 0]}
        scale={0.4}
        object={scene}
      />

      <group visible={isAudioPlaying}>
        <SpotLight
          ref={leftSpotlightRef as any}
          penumbra={1}
          distance={10}
          angle={0.35}
          attenuation={10}
          anglePower={4}
          intensity={2}
          color={leftSpotlightColors[colorIndex]}
          position={[-3, 3, 2]}
        />
        <SpotLight
          ref={rightSpotlightRef as any}
          penumbra={1}
          distance={10}
          angle={0.35}
          attenuation={10}
          anglePower={4}
          intensity={2}
          color={rightSpotlightColors[colorIndex]}
          position={[3, 3, 2]}
        />

        <Suspense fallback={<span>AUDIO LOADING</span>}>
          <instancedMesh
            castShadow
            ref={visualiserRef as any}
            position={[-3.3, 1.2, 0]}
            args={[null, null, data.length] as any}
          >
            <planeGeometry args={[ANALYSER_OBJ_WIDTH, ANALYSER_OBJ_HEIGHT]} />
            <meshBasicMaterial toneMapped={false} />
          </instancedMesh>
        </Suspense>
      </group>
    </>
  );
}
