import { useState, useRef, useEffect } from "react";
import { Sparkles, SpotLight, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import type { PositionalAudio as TPositionalAudio } from "three";
import type { SpotLight as TSpotLight } from "three";

//TODO fix any type's.

//TODO figure a way to eliminate useEffects and setting state in intervals.
//according to this r3f docs: https://r3f.docs.pmnd.rs/advanced/pitfalls,
//it's better to do all in useFrame but I think for now the intervals are neccessary to achieve what I need it to do

export default function Krk() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const audioRef = useRef<TPositionalAudio>();
  const rightSpotlightRef = useRef<TSpotLight>();
  const leftSpotlightRef = useRef<TSpotLight>();
  const timeRef = useRef<number | undefined>(0);

  const { scene } = useGLTF("./3D/krk_single.glb");
  const { gl, clock } = useThree();

  const SPOT_COLOR_CHANGE_SECONDS = 12_000;
  const SPOT_SPEED_CHANGE_SECONDS = 24_000;

  const leftSpotlightColors: number[] = [
    0xb00c3f, 0xa855f7, 0x006cff, 0xff00b9,
  ];
  const rightSpotlightColors: number[] = [
    0x1d4ed8, 0x22c55e, 0xff9300, 0x00ff46,
  ];

  useEffect(() => {
    if (isAudioPlaying) {
      timeRef.current = performance.now() / 1000;

      const indexIntervalId = setInterval(() => {
        setColorIndex(
          (prevIndex) => (prevIndex + 1) % leftSpotlightColors.length
        );
      }, SPOT_COLOR_CHANGE_SECONDS);

      const speedIndexId = setInterval(() => {
        setSpeedMultiplier(2);
      }, SPOT_SPEED_CHANGE_SECONDS);

      return () => {
        clearInterval(indexIntervalId);
        clearInterval(speedIndexId);
      };
    }
  }, [isAudioPlaying]);

  useFrame((state, delta) => {
    if (
      rightSpotlightRef.current &&
      leftSpotlightRef.current &&
      isAudioPlaying
    ) {
      const elapsedTime = state.clock.getElapsedTime();

      rightSpotlightRef.current.target.position.x =
        Math.sin(elapsedTime * speedMultiplier) * 2;
      rightSpotlightRef.current.target.position.y =
        Math.cos(elapsedTime * speedMultiplier) * 2;

      leftSpotlightRef.current.target.position.x =
        Math.sin(elapsedTime * speedMultiplier) * 2;
      leftSpotlightRef.current.target.position.y =
        Math.cos(elapsedTime * speedMultiplier) * 2;
    }
  });

  const onSpeakerClick = (): void => {
    setIsAudioPlaying(!isAudioPlaying);
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play();
    }

    if (audioRef.current && isAudioPlaying) {
      audioRef.current.stop();
      timeRef.current = undefined;
      setColorIndex(0);
      setSpeedMultiplier(1);
    }
  };

  return (
    <>
      <primitive
        onClick={onSpeakerClick}
        onPointerOver={() => {
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          gl.domElement.style.cursor = "default";
        }}
        rotation={[0, 0.6, 0]}
        position={[-3, 0, 0]}
        scale={0.4}
        object={scene}
      />
      <PositionalAudio ref={audioRef as any} url="./Chee.mp3" distance={1} />

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
        <Sparkles
          position={[-3, 0.8, 0]}
          count={80}
          scale={1}
          size={3}
          speed={0.9}
          color={0xfde047}
        />
      </group>
    </>
  );
}
