import { useState, useRef, useEffect } from "react";
import { useSceneStore } from "@/app/store/scene";
import { LocationMarkers } from "@/app/store/camera";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { useScreenSize } from "./ScreenSize";
import * as THREE from "three";
import { SpotLight, useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { createAudio } from "../../utils/audio";

//TODO - set spotlight color changes in useFrame instead of setting reactive state

//TODO figure a way to eliminate useEffects and setting state in intervals.
//according to this r3f docs: https://r3f.docs.pmnd.rs/advanced/pitfalls,
//it's better to do all in useFrame but I think for now the intervals are neccessary to achieve what I need it to do

//spotlight.current.color.set (none of the setters work except setRGB but it doesnt change entire spotlight color), need to figure out why to eliminate useEffect and intervals

type VisualizerMesh = THREE.InstancedMesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
>;

const SPOT_COLOR_CHANGE_MS = 12_000;
const SPOT_SPEED_CHANGE_MS = 24_000;
const ANALYSER_OBJ_WIDTH = 0.03;
const ANALYSER_OBJ_HEIGHT = 0.08;
const ANALYSER_OBJ_SPACE = 1.5;
const ANALYSER_Y_POS = 1500;
const LEFT_SPOT_COLORS = [0xb00c3f, 0xa855f7, 0x006cff, 0xff00b9];
const RIGHT_SPOT_COLORS = [0x1d4ed8, 0x22c55e, 0xff9300, 0x00ff46];

const KRK_INTERACT_POS = [-3, 0, 1];
const KRK_INTERACT_TARGET = [-3, 0, 0];
const KRK_LOCATION_MARKER_POS = [-2.9, 0.1, 0.8]; //was [-3.8, 1.6, 0]

export default function KrkDynamic() {
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { isAudioPlaying, setIsAudioPlaying } = useSceneStore((state) => state);

  const { camGoTo, camReset, isLocationDisabled } = useAnimateCamera();

  const rightSpotlightRef = useRef<THREE.SpotLight>(null);
  const leftSpotlightRef = useRef<THREE.SpotLight>(null);
  const visualiserRef = useRef<VisualizerMesh>(null);

  const { scene } = useGLTF("./3D/krk_single.glb");
  const obj = new THREE.Object3D();

  const { isMobile } = useScreenSize();

  useCursor(isHover);

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

      visualiserRef.current.material.color.setHSL(avg / 100, 0.75, 0.75);

      visualiserRef.current.instanceMatrix.needsUpdate = true;
      visualiserRef.current.updateMatrixWorld();
    }
  });

  const onSpeakerClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();

    if (isLocationDisabled(LocationMarkers.Krk)) return;

    setIsAudioPlaying(!isAudioPlaying);

    if (isAudioPlaying) endRave();
    else startRave();
  };

  const startRave = (): void => {
    gain.connect(ctx.destination);
    ctx.resume();

    if (isMobile) {
      camGoTo(
        {
          pos: KRK_INTERACT_POS,
          target: KRK_INTERACT_TARGET,
          orbitEnabled: true,
          activeMarker: LocationMarkers.Krk,
        },
        {
          title: "Leave Speaker",
          position: KRK_LOCATION_MARKER_POS,
          camPos: KRK_INTERACT_POS,
          camTarget: KRK_INTERACT_TARGET,
          clickHandler: () => {
            setIsAudioPlaying(false);
            gain.disconnect();
          },
        }
      );
    }
  };

  const endRave = (): void => {
    gain.disconnect();
    if (isMobile) camReset(KRK_INTERACT_POS, KRK_INTERACT_TARGET);
  };

  return (
    <>
      <primitive
        onClick={onSpeakerClick}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => (
          e.stopPropagation(), setIsHover(true)
        )}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => (
          e.stopPropagation(), setIsHover(false)
        )}
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
