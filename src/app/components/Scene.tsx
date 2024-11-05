"use client";
import * as THREE from "three";
import { Suspense, useState } from "react";
import { SOCIALS } from "../constants/socials";
import {
  Backdrop,
  Center,
  Cloud,
  Clouds,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  SpotLight,
  Stars,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import SceneLoading from "./UI/SceneLoading";
import Laptop from "./Laptop";
import PictureFrame from "./PictureFrame";
import EthStatue from "./EthStatue";
import Krk from "./Krk";

//TODO - fix 'any' type casts and any's in general

interface SocialModelProps {
  url: string;
  handleClick?: () => void;
}

const Desk = () => {
  const { scene } = useGLTF("./3D/desk1.glb");
  return (
    <primitive
      castShadow
      receiveShadow
      rotation={[0, 10, 0]}
      scale={1}
      object={scene}
    />
  );
};

const SocialModel = ({ url, handleClick }: SocialModelProps) => {
  const { scene } = useGLTF(url);
  const { gl } = useThree();

  return (
    <primitive
      onClick={handleClick}
      onPointerOver={() => {
        gl.domElement.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        gl.domElement.style.cursor = "default";
      }}
      castShadow
      receiveShadow
      object={scene}
    />
  );
};

const BitcoinMachine = () => {
  const { scene } = useGLTF("./3D/bitcoin_atm.glb");
  return (
    <primitive
      castShadow
      receiveShadow
      position={[1.5, 0, 1.1]}
      rotation={[0, -1, 0]}
      scale={1}
      object={scene}
    />
  );
};

const Redbulls = () => {
  const { scene } = useGLTF("./3D/redbulls.glb");
  return <primitive position={[-3.4, -1.86, 2.0]} scale={3.8} object={scene} />;
};

const RedbullSingle = () => {
  const { scene } = useGLTF("./3D/redbull_single.glb");
  return <primitive position={[1.0, 1.16, -1]} scale={0.1} object={scene} />;
};

export default function Scene() {
  const socialRefs = useRef<Record<string, HTMLAnchorElement>>({});
  const rigidBodyRefs = useRef<Record<string, RapierRigidBody | null>>({
    github: null,
    x: null,
    soundcloud: null,
    linkedin: null,
  });
  const [paused, setPaused] = useState<boolean>(true);

  const handleSocialClick = (social: string): void => {
    setPaused(false);

    Object.keys(rigidBodyRefs.current).forEach((key) => {
      const rigidBody = rigidBodyRefs.current[key];

      if (rigidBody) {
        if (key === social) rigidBody.wakeUp();
        else rigidBody.sleep();
      }
    });

    setTimeout(() => {
      if (socialRefs.current[social]) {
        socialRefs.current[social].click();
      }
    }, 3000);
  };

  return (
    <div className="w-dvh h-dvh bg-black">
      <div id="socials" className="hidden">
        {Object.keys(SOCIALS).map((social, index) => {
          return (
            <a
              key={index}
              target="_blank"
              href={SOCIALS[social]}
              rel="noreferrer"
              ref={(el) => (socialRefs.current[social] = el!) as any}
              className="hidden"
            />
          );
        })}
      </div>
      <Suspense fallback={<SceneLoading />}>
        <Canvas dpr={[1, 2]} shadows>
          <Physics paused={paused} key={0} timeStep={1 / 60}>
            <fog attach="fog" args={["rgb(16,16,16)", 0, 10]} />

            <Environment preset="city" />

            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            {/* <Clouds limit={40} material={THREE.MeshBasicMaterial}>
              <Cloud
                segments={40}
                bounds={[10, 30, 10]}
                volume={0.1}
                color={0xd580ff}
                concentrate="outside"
                fade={0}
              />
              <Cloud
                seed={1}
                scale={1}
                // bounds={[2, 30, 10]}
                volume={2}
                color={0xd580ff}
                fade={0}
                position={[2, 10, 0]}
                concentrate="random"
              />
            </Clouds> */}

            <group position={[0, -0.5, 0]}>
              <Desk />
              <Laptop />
              <BitcoinMachine />
              <Redbulls />
              <RedbullSingle />
              <EthStatue />
              <Krk />

              {/* <SpotLight
                // position={[0, 0.3, 0]}
                position={[-0.1, 0.1, 0.9]}
                penumbra={1}
                angle={0.1}
                intensity={100}
                castShadow
              /> */}

              {/* <PictureFrame
                // rotation={[-0, -1.1, 7.8]}
                // position={[-1.46, 2.1, -3.6]}
                frameImgPath="./TS_logo.png"
              /> */}

              <group scale={0.3} position={[0, 0, -1.2]}>
                <Center rotation={[0, -0.4, 0]} position={[-2, 1, -2]}>
                  <RigidBody
                    colliders="hull"
                    position={[0, 0, 0]}
                    enabledRotations={[true, false, false]}
                    restitution={1}
                    ref={(ref) =>
                      (rigidBodyRefs.current.soundcloud = ref) as any
                    }
                    canSleep
                  >
                    <SocialModel
                      url="./3d/soundcloud.glb"
                      handleClick={() => handleSocialClick("soundcloud")}
                    />
                  </RigidBody>
                </Center>
                <Center rotation={[0, 0, 0]} position={[0.1, -0.01, -2]} top>
                  <RigidBody
                    colliders="hull"
                    position={[0, 0, 0]}
                    enabledRotations={[true, false, true]}
                    restitution={1}
                    ref={(ref) => (rigidBodyRefs.current.linkedin = ref) as any}
                    canSleep
                  >
                    <SocialModel
                      url="./3d/linkedin.glb"
                      handleClick={() => handleSocialClick("linkedin")}
                    />
                  </RigidBody>
                </Center>

                <Center rotation={[0, -100, 0]} position={[-4, -0.01, -2]} top>
                  <RigidBody
                    colliders="hull"
                    position={[0, 0, 0]}
                    enabledRotations={[true, false, false]}
                    restitution={1}
                    ref={(ref) => (rigidBodyRefs.current.github = ref) as any}
                    canSleep
                  >
                    <SocialModel
                      url="./3d/github.glb"
                      handleClick={() => handleSocialClick("github")}
                    />
                  </RigidBody>
                </Center>

                <Center rotation={[0, -100, 0]} position={[2, -0.01, -2]} top>
                  <RigidBody
                    colliders="hull"
                    position={[0, 0, 0]}
                    enabledRotations={[true, false, true]}
                    restitution={1}
                    ref={(ref) => (rigidBodyRefs.current.x = ref) as any}
                    canSleep
                  >
                    <SocialModel
                      url="./3d/x.glb"
                      handleClick={() => handleSocialClick("x")}
                    />
                  </RigidBody>
                </Center>
              </group>

              <RigidBody type="fixed" colliders="cuboid" name="floor">
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                  <planeGeometry args={[10, 10]} />
                  <MeshReflectorMaterial
                    blur={[400, 100]}
                    resolution={1024}
                    mixBlur={1}
                    opacity={2}
                    depthScale={1.1}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.25}
                    roughness={1}
                    mirror={1}
                    // color={0xd580ff}
                  />
                  {/* <meshPhysicalMaterial color={0x301934} /> */}
                </mesh>
              </RigidBody>

              <mesh
                receiveShadow
                rotation-x={-Math.PI / 2}
                position={[0, 0.001, 0]}
              >
                <planeGeometry args={[10, 10]} />
                <shadowMaterial transparent color="#000000" opacity={0.4} />
              </mesh>
            </group>

            <OrbitControls
              makeDefault
              // autoRotate
              autoRotateSpeed={0.02}
              maxPolarAngle={Math.PI / 2.3}
              minPolarAngle={Math.PI / 2.8}
              enableZoom={false}
              enablePan={true}
            />

            <PerspectiveCamera makeDefault fov={65} position={[0, 0, 4]}>
              {/* <spotLight
                position={[10, 10, 5]}
                angle={0.1}
                penumbra={1}
                intensity={10}
                castShadow
                shadow-mapSize={[2048, 2048]}
              /> */}
            </PerspectiveCamera>
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}
