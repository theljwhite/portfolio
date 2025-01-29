import { useState, useRef } from "react";
import { Center, useGLTF, useCursor } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";
import { useCameraStore } from "@/app/store/camera";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { LocationMarkers } from "@/app/store/camera";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { SOCIALS } from "@/app/constants/socials";
import { navOutWithGhostAnchor } from "@/app/utils/anchor";

//TODO fix any types
//TODO change soundcloud model/linked in model positions

//TODO nav out ghost anchor not working on iOS mobile (safari at least blocking it)
//works from a direct user interaction like button click,
//but wont work with buttonRef.click() for example, which is what I need for the clickable socials 3d models.
//in the mean time, I'll be looking into other ways to do this on iOS Safari.

interface SocialModelProps {
  url: string;
  onSocialClick: () => void;
}

const SOCIALS_INTERACT_POS = [0.4, 0, 2];
const SOCIALS_LOCATION_MARKER_POS = [0, 0, 0];

const SocialModel = ({ url, onSocialClick }: SocialModelProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { scene } = useGLTF(url);

  useCursor(isHover);
  return (
    <primitive
      onClick={onSocialClick}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      object={scene}
    />
  );
};

export default function Socials({ isMobile }: { isMobile: boolean }) {
  const { setIsPhysicsPaused } = useSceneStore((state) => state);
  const { activeMarker } = useCameraStore((state) => state);
  const { camGoTo, isLocationDisabled } = useAnimateCamera();

  const rigidBodyRefs = useRef<Record<string, RapierRigidBody | null>>({
    github: null,
    x: null,
    soundcloud: null,
    linkedin: null,
  });

  const handleSocialClick = (social: string): void => {
    if (isLocationDisabled(LocationMarkers.Socials)) return;

    if (activeMarker.current === null && isMobile) {
      camGoTo(
        {
          pos: SOCIALS_INTERACT_POS,
          target: [0, 0, 0],
          orbitEnabled: true,
          activeMarker: LocationMarkers.Socials,
        },
        {
          title: "Leave Socials",
          position: SOCIALS_LOCATION_MARKER_POS,
          camPos: SOCIALS_INTERACT_POS,
          camTarget: [0, 0, 0],
        }
      );
    }

    handlePhysicsAndNavOut(social);
  };

  const handlePhysicsAndNavOut = (social: string): void => {
    setIsPhysicsPaused(false);

    Object.keys(rigidBodyRefs.current).forEach((key) => {
      const rigidBody = rigidBodyRefs.current[key];

      if (rigidBody) {
        key === social ? rigidBody.wakeUp() : rigidBody.sleep();
      }
    });

    setTimeout(() => {
      navOutWithGhostAnchor(SOCIALS[social]);
    }, 3000);
  };

  return (
    <>
      <group scale={0.3} position={[0, 0, -1.2]}>
        <Center rotation={[0, -0.4, 0]} position={[-2, 1, -2]}>
          <RigidBody
            colliders="hull"
            position={[0, 0, 0]}
            enabledRotations={[true, false, true]}
            restitution={1}
            ref={(ref) => (rigidBodyRefs.current.soundcloud = ref) as any}
            canSleep
          >
            <SocialModel
              url="./3D/soundcloud.glb"
              onSocialClick={() => handleSocialClick("soundcloud")}
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
              url="./3D/linkedin.glb"
              onSocialClick={() => handleSocialClick("linkedin")}
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
              url="./3D/github.glb"
              onSocialClick={() => handleSocialClick("github")}
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
              url="./3D/x.glb"
              onSocialClick={() => handleSocialClick("x")}
            />
          </RigidBody>
        </Center>
      </group>
    </>
  );
}
