"use client";

import { Suspense, useState, useRef } from "react";
import { SOCIALS } from "../../constants/socials";
import {
  Center,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import useClientMediaQuery from "@/app/utils/useClientMediaQuery";
import SceneLoading from "./SceneLoading";
import Laptop from "./Laptop";
import EthStatue from "./EthStatue";
import KrkDynamic from "./KrkDynamic";

//TODO - fix 'any' type casts and any's in general
//TODO - some of this can be consolidated

//TODO - because of HTML occlude="blending" bug, the onPointerOver's here,
//for now have to use the document.body to set cursor pointer.
//when fixed, they can use gl.domElement.style.cursor = "pointer" from useThree's gl

interface SocialModelProps {
  url: string;
  handleClick?: () => void;
}

const ALL_MODELS = [
  "./3D/desk1.glb",
  "./3D/bitcoin_atm.glb",
  "./3D/redbulls.glb",
  "./3D/redbull_single.glb",
  "./3d/soundcloud.glb",
  "./3d/linkedin.glb",
  "./3d/github.glb",
  "./3d/x.glb",
  "./3D/krk_single.glb",
  "./3D/eth_donate.glb",
  "./3D/mac-draco.glb",
];

ALL_MODELS.forEach((model) => useGLTF.preload(model));

const Desk = () => {
  const { scene } = useGLTF("./3D/desk1.glb");
  return <primitive rotation={[0, 10, 0]} scale={1} object={scene} />;
};

const SocialModel = ({ url, handleClick }: SocialModelProps) => {
  const { scene } = useGLTF(url);
  return (
    <primitive
      onClick={handleClick}
      onPointerOver={(e: ThreeEvent<any>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      object={scene}
    />
  );
};

const BitcoinMachine = ({ handleClick }: { handleClick: () => void }) => {
  const { scene } = useGLTF("./3D/bitcoin_atm.glb");
  return (
    <primitive
      onClick={handleClick}
      onPointerOver={(e: ThreeEvent<any>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
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

const RedbullSingle = ({ handleClick }: { handleClick: () => void }) => {
  const { scene } = useGLTF("./3D/redbull_single.glb");
  return (
    <primitive
      onClick={handleClick}
      onPointerOver={(e: ThreeEvent<any>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      position={[1.0, 1.16, -1]}
      scale={0.1}
      object={scene}
    />
  );
};

export default function Scene() {
  const [physicsPaused, setPhysicsPaused] = useState<boolean>(true);

  const socialRefs = useRef<Record<string, HTMLAnchorElement>>({});
  const rigidBodyRefs = useRef<Record<string, RapierRigidBody | null>>({
    github: null,
    x: null,
    soundcloud: null,
    linkedin: null,
  });
  const bitcoinAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const redbullAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  const handleSocialClick = (social: string): void => {
    setPhysicsPaused(false);

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
      <div className="hidden">
        <a
          className="hidden"
          target="_blank"
          href="https://coinmarketcap.com/currencies/bitcoin/"
          rel="noreferrer"
          ref={bitcoinAnchorRef}
        />
        <a
          className="hidden"
          target="_blank"
          href="https://www.walmart.com/ip/Red-Bull-Winter-Edition-Iced-Vanilla-Berry-Energy-Drink-12-fl-oz-4-pack-cans/5340366890"
          rel="noreferrer"
          ref={redbullAnchorRef}
        />
      </div>
      <Suspense fallback={<SceneLoading />}>
        <Canvas dpr={[1, 2]} shadows>
          <Physics paused={physicsPaused} key={0} timeStep={1 / 60}>
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
            <group position={[0, -0.5, 0]}>
              <Desk />
              <Laptop />
              <BitcoinMachine
                handleClick={() => bitcoinAnchorRef?.current?.click()}
              />
              <Redbulls />
              <RedbullSingle
                handleClick={() => redbullAnchorRef?.current?.click()}
              />
              <EthStatue />
              <KrkDynamic />
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
                  />
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
              autoRotateSpeed={0.02}
              maxPolarAngle={Math.PI / 2.3}
              minPolarAngle={Math.PI / 2.8}
              enableZoom={false}
              enablePan={true}
              target={isMobile ? [-1, 0, -2] : undefined}
            />
            <PerspectiveCamera
              makeDefault
              fov={isMobile ? 100 : 65}
              position={[0, 0, 4]}
            />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}
