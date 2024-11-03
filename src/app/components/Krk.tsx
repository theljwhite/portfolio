import { useState, useRef, useEffect } from "react";
import { Sparkles, SpotLight, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import type { PositionalAudio as TPositionalAudio } from "three";
import type { SpotLight as TSpotLight, Color } from "three";

//TODO fix any type's

export default function Krk() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [leftSpotlightColor, setLeftSpotlightColor] =
    useState<number>(0xb00c3f);
  const [rightSpotlightColor, setRightSpotlightColor] =
    useState<number>(0x0c8cbf);
  const [colorIndex, setColorIndex] = useState<number>(0);

  const audioRef = useRef<TPositionalAudio>();
  const rightSpotlightRef = useRef<TSpotLight>();
  const leftSpotlightRef = useRef<TSpotLight>();

  const { scene } = useGLTF("./3D/krk_single.glb");
  const { gl } = useThree();

  const SPOT_COLOR_CHANGE_SECONDS = 12_000;
  const leftSpotlightColors: number[] = [
    0xb00c3f, 0x22c55e, 0xa855f7, 0x67e8f9,
  ];
  const rightSpotlightColors: number[] = [
    0x67e8f9, 0xa855f7, 0x22c55e, 0xb00c3f,
  ];

  useFrame((state) => {
    if (
      rightSpotlightRef.current &&
      leftSpotlightRef.current &&
      isAudioPlaying
    ) {
      const elapsedTime = state.clock.getElapsedTime();

      rightSpotlightRef.current.target.position.x = Math.sin(elapsedTime) * 2;
      rightSpotlightRef.current.target.position.y = Math.cos(elapsedTime) * 2;

      leftSpotlightRef.current.target.position.x = Math.sin(elapsedTime) * 2;
      leftSpotlightRef.current.target.position.y = Math.cos(elapsedTime) * 2;
    }
  });

  // useEffect(() => {
  //   if (isAudioPlaying) {
  //     const intervalId = setInterval(() => {
  //       setLeftSpotlightColor(leftSpotlightColors[colorIndex]);
  //       setRightSpotlightColor(rightSpotlightColors[colorIndex]);

  //       setColorIndex(colorIndex + 1);

  //       if (colorIndex === leftSpotlightColors.length - 1) {
  //         setColorIndex(0);
  //       }
  //     }, SPOT_COLOR_CHANGE_SECONDS);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [isAudioPlaying, colorIndex, leftSpotlightColor, rightSpotlightColor]);

  useEffect(() => {
    if (isAudioPlaying) {
      const intervalId = setInterval(() => {
        setColorIndex(
          (prevIndex) => (prevIndex + 1) % leftSpotlightColors.length
        );
      }, SPOT_COLOR_CHANGE_SECONDS);

      return () => clearInterval(intervalId);
    }
  }, [isAudioPlaying]);

  const onSpeakerClick = (): void => {
    setIsAudioPlaying(!isAudioPlaying);
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play();
    }

    if (audioRef.current && isAudioPlaying) {
      audioRef.current.stop();
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
      <PositionalAudio
        ref={audioRef as any}
        url="./CheeTrimmed.mp3"
        distance={1}
      />

      {isAudioPlaying && (
        <>
          <SpotLight
            ref={leftSpotlightRef as any}
            castShadow
            penumbra={1}
            distance={6}
            angle={0.35}
            attenuation={5}
            anglePower={4}
            intensity={2}
            // color={leftSpotlightColor}
            color={leftSpotlightColors[colorIndex]}
            position={[-3, 3, 2]}
          />
          <SpotLight
            ref={rightSpotlightRef as any}
            castShadow
            penumbra={1}
            distance={6}
            angle={0.35}
            attenuation={5}
            anglePower={4}
            intensity={2}
            // color={rightSpotlightColor}
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
        </>
      )}
    </>
  );
}
