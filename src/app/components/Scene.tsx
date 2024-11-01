"use client";
import { Suspense, useState } from "react";
import { SOCIALS } from "../constants/socials";
import {
  Center,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import Laptop from "./Laptop";
import PictureFrame from "./PictureFrame";

//TODO - fix 'any' type casts

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
      onPointerOver={(e: any) => {
        gl.domElement.style.cursor = "pointer";
      }}
      onPointerOut={(e: any) => {
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
  return (
    <primitive
      // position={[-1.5, -3.2, 3.2]}
      position={[-3.4, -1.86, 2.0]}
      scale={3.8}
      object={scene}
    />
  );
};

const RedbullSingle = () => {
  const { scene } = useGLTF("./3D/redbull_single.glb");
  return <primitive position={[1.0, 1.16, -1]} scale={0.1} object={scene} />;
};

const KrkStudioMonitorRipInPieceInPeace = () => {
  const { scene } = useGLTF("./3D/krk_single.glb");
  return (
    <primitive
      rotation={[0, 0.6, 0]}
      position={[-3, 0, 0]}
      scale={0.4}
      object={scene}
    />
  );
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
    <div
      // style={{
      //   background: "url('./lol.jpg')",
      //   backgroundPosition: "50%",
      // }}
      className="w-dvh h-dvh bg-primary-5"
    >
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
      <Suspense fallback="Loading...">
        <Canvas dpr={[1, 2]} shadows>
          <Physics paused={paused} key={0} timeStep={1 / 60}>
            <fog attach="fog" args={["rgb(16,16,16)", 0, 10]} />

            <Environment preset="city" />

            <group position={[0, -0.5, 0]}>
              <Desk />
              <Laptop />
              <BitcoinMachine />
              <Redbulls />
              <RedbullSingle />
              <KrkStudioMonitorRipInPieceInPeace />
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
                    //color
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
              // autoRotate
              autoRotateSpeed={0.02}
              maxPolarAngle={Math.PI / 2.3}
              minPolarAngle={Math.PI / 2.8}
              enableZoom={false}
              enablePan={true}
            />
            <PerspectiveCamera makeDefault fov={65} position={[0, 0, 4]}>
              <spotLight
                position={[10, 10, 5]}
                angle={0.1}
                penumbra={1}
                intensity={10}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
            </PerspectiveCamera>
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}
