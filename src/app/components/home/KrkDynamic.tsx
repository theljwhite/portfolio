import { useState, useRef, useEffect } from "react";
import { useSceneStore } from "@/app/store/scene";
import useClientMediaQuery from "@/app/utils/useClientMediaQuery";
import * as THREE from "three";
import { SpotLight, useBounds, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import type {
  SpotLight as TSpotLight,
  InstancedMesh as TInstancedMesh,
} from "three";
import { suspend } from "suspend-react";
import { createAudio } from "../../utils/audio";

//TODO fix any type's, optimizations

//TODO figure a way to eliminate useEffects and setting state in intervals.
//according to this r3f docs: https://r3f.docs.pmnd.rs/advanced/pitfalls,
//it's better to do all in useFrame but I think for now the intervals are neccessary to achieve what I need it to do

//TODO - because of HTML occlude="blending" bug, the onPointerOver's here,
//for now have to use the document.body to set cursor pointer.
//when fixed, they can use gl.domElement.style.cursor = "pointer" from useThree's gl

//TODO - the way in which the audio is created and works is going to be refactored here,
//because it seems a little hacky but also, it'll need to be because I plan on
//making it an audio player in which different songs can be played, not just 1 from a file.
//so this works for now but will be changed.

//spotlights originally used visible={isAudioPlaying} to hide the lights until speaker click,
//but with this, there was a slight "lag" when clicking
//the speaker to start the audio, so instead for now it is using position to "hide" them,
//and it gets rid of the lag when speaker is clicked but more processing on initial render. for now I will leave it this way.

const SPOT_COLOR_CHANGE_MS = 12_000;
const SPOT_SPEED_CHANGE_MS = 24_000;
const ANALYSER_OBJ_WIDTH = 0.03;
const ANALYSER_OBJ_HEIGHT = 0.08;
const ANALYSER_OBJ_SPACE = 1.5;
const ANALYSER_Y_POS = 1500;
const LEFT_SPOT_COLORS = [0xb00c3f, 0xa855f7, 0x006cff, 0xff00b9];
const RIGHT_SPOT_COLORS = [0x1d4ed8, 0x22c55e, 0xff9300, 0x00ff46];

export default function KrkDynamic() {
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const { isAudioPlaying, setIsAudioPlaying } = useSceneStore((state) => state);

  const rightSpotlightRef = useRef<TSpotLight>(null);
  const leftSpotlightRef = useRef<TSpotLight>(null);
  const visualiserRef = useRef<TInstancedMesh>(null);

  const { scene } = useGLTF("./3D/krk_single.glb");
  const obj = new THREE.Object3D();
  const bounds = useBounds();
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  const {
    gain,
    ctx,
    update: updateAudio,
    data,
  } = suspend(() => createAudio("./Chee.mp3"), ["./Chee.mp3"]);

  useEffect(() => {
    if (isAudioPlaying) {
      const indexIntervalId = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % LEFT_SPOT_COLORS.length);
      }, SPOT_COLOR_CHANGE_MS);

      const speedIndexId = setInterval(() => {
        setSpeedMultiplier(2);
      }, SPOT_SPEED_CHANGE_MS);

      return () => {
        clearInterval(indexIntervalId);
        clearInterval(speedIndexId);
      };
    } else {
      gain.disconnect();
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

  const onSpeakerClick = (e: ThreeEvent<any>): void => {
    setIsAudioPlaying(!isAudioPlaying);
    e.stopPropagation();

    if (isAudioPlaying) {
      gain.disconnect();

      if (isMobile) {
        bounds.moveTo([0, 0, 4]).lookAt({ target: [-1, 0, -2] });
      }
    } else {
      gain.connect(ctx.destination);
      ctx.resume();

      if (isMobile) {
        bounds.moveTo([-3, 0, 1]).lookAt({ target: [-3, 0, 0] });
      }
    }
  };

  return (
    <>
      <primitive
        onClick={(e: ThreeEvent<any>) => onSpeakerClick(e)}
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

      <SpotLight
        ref={leftSpotlightRef}
        penumbra={1}
        distance={10}
        angle={0.35}
        attenuation={10}
        anglePower={4}
        intensity={isAudioPlaying ? 2 : 0}
        color={LEFT_SPOT_COLORS[colorIndex]}
        position={isAudioPlaying ? [-3, 3, 2] : [10_000, 10_000, 10_000]}
      />
      <SpotLight
        ref={rightSpotlightRef}
        penumbra={1}
        distance={10}
        angle={0.35}
        attenuation={10}
        anglePower={4}
        intensity={isAudioPlaying ? 2 : 0}
        color={RIGHT_SPOT_COLORS[colorIndex]}
        position={isAudioPlaying ? [3, 3, 2] : [10_000, 10_000, 10_000]}
      />

      <instancedMesh
        castShadow
        ref={visualiserRef}
        position={[-3.3, 1.2, 0]}
        args={[null, null, data.length] as any}
        visible={isAudioPlaying}
      >
        <planeGeometry args={[ANALYSER_OBJ_WIDTH, ANALYSER_OBJ_HEIGHT]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}
