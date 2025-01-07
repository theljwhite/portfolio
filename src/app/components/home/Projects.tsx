import { useMemo, useRef, memo } from "react";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import { useScreenSize } from "./ScreenSize";
import { useSpring, useSprings, animated, config } from "@react-spring/three";
import * as THREE from "three";
import { useThree, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture, Text, Billboard } from "@react-three/drei";
import {
  DepthOfField,
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Project, PROJECTS } from "../../constants/projects";
import { navOutWithGhostAnchor } from "@/app/utils/anchor";
import ProjectFrame from "./ProjectFrame";

//TODO - make this more responsive based on viewport width
//NOTE - this is experimental, using refs as suggested by R3F docs
//otherwise, there's a massive FPS drop on mobile when animating if state is set causing a re-render of this comp and its children
//may be able to refactor the structure of this tree to avoid that and use state,
//or other things like memoizing. or also lerping anims w/ useFrame instead of the springs.
//but this works for now for a first pass and is smooth using useRefs.

const PROJ_COLUMNS = 3;
const PROJ_X_SPACING = 1.3;
const PROJ_Z_SPACING = 0.02;
const PROJ_Y_SPACING = 1;

const PROJ_TEXT_ANIMATE_TO = [0.2, 0.9, 2];
const PROJ_TEXT_ANIMATE_TO_MOBILE = [0, 1.5, 2];

const ANIMATE_FRAME_POS = [0.9, -0.2, 2];
const ANIMATE_FRAME_POS_MOBILE = [0.93, -0.2, 2];
const ANIMATE_FRAME_ROTATION = [-0.1, -0.08, 0];
const ANIMATE_FRAME_ROTATION_MOBILE = [0, 0, 0];

const allProjectImages = PROJECTS.flatMap((project) => project.images);

allProjectImages.map((image) => useTexture.preload(image));

function Projects() {
  const { activeMarker } = useSceneStore((state) => state);

  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);
  const activeProjRef = useRef<Project | null>(null);

  const textRefs = useRef<{
    [key: string]: { text: string; visible: boolean };
  }>({
    name: { text: "", visible: false },
    description: { text: "", visible: false },
    tech: { text: "", visible: false },
    github: { text: "", visible: false },
  });

  const { viewport } = useThree();
  const { size, isMobile } = useScreenSize();

  const billboardResponseRatio = Math.abs(window.innerWidth / 2000 - 0.8);
  const billboardXPos =
    size === "xxl" ? 0 : isMobile ? 0.75 : billboardResponseRatio;

  const billboardScaleRatio =
    size === "xxl" ? viewport.width / 10 : viewport.width / 8;

  const textAnimatePos = isMobile
    ? PROJ_TEXT_ANIMATE_TO_MOBILE
    : PROJ_TEXT_ANIMATE_TO;

  const frameRotation = isMobile
    ? ANIMATE_FRAME_ROTATION_MOBILE
    : ANIMATE_FRAME_ROTATION;

  const frameAnimatePos = isMobile
    ? ANIMATE_FRAME_POS_MOBILE
    : ANIMATE_FRAME_POS;

  const projectsWithPositions = useMemo(
    () =>
      PROJECTS.map((project, index) => {
        const col = index % PROJ_COLUMNS;
        const row = Math.floor(index / PROJ_COLUMNS);

        const xPos = col * PROJ_X_SPACING;
        const zPos = col * PROJ_Z_SPACING;
        const yPos = -row * PROJ_Y_SPACING;
        return { ...project, position: [xPos, yPos, zPos] };
      }),
    []
  );

  const [textProps, textSpringApi] = useSpring(
    {
      to: { scale: 1, pos: textAnimatePos },
      from: { scale: 0, pos: [2, 2, 2] },
      config: isMobile ? config.wobbly : config.default,
      reset: false,
      immediate: false,
    },
    []
  );

  const [frameProps, frameSpringApi] = useSprings(
    projectsWithPositions.length,
    projectsWithPositions.map((project) => {
      return {
        pos: project.position,
        rotation: [0, 0, 0],
        from: {
          pos: project.position,
          rotation: [0, 0, 0],
        },
        config: isMobile ? config.wobbly : config.default,
        reset: false,
        immediate: false,
      };
    }),
    []
  );

  const handleProjectSelection = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();

    if (activeMarker !== LocationMarkers.Projects) return;

    const objId = Number(e.object.name.split("-")[2]);

    const clickedProj = projectsWithPositions.find(
      (project) => project.id === objId
    );
    const isAlreadySelected = activeProjRef.current?.id === objId;

    if (
      (activeProjRef.current &&
        clickedProj?.id !== activeProjRef?.current.id) ||
      !clickedProj
    ) {
      return;
    }

    frameSpringApi.current[objId].start({
      to: {
        pos: isAlreadySelected ? clickedProj.position : frameAnimatePos,
        rotation: isAlreadySelected ? [0, 0, 0] : frameRotation,
      },
      from: {
        pos: isAlreadySelected ? frameAnimatePos : clickedProj.position,
        rotation: isAlreadySelected ? frameRotation : [0, 0, 0],
      },
    });

    if (isAlreadySelected) {
      activeProjRef.current = null;
      changeProjTextVisible(false);
      return;
    }

    activeProjRef.current = clickedProj;
    handleShowProjectText(clickedProj);
  };

  const handleShowProjectText = (project: Project): void => {
    textRefs.current.name.text = project.name;
    textRefs.current.description.text = project.description ?? "";
    textRefs.current.tech.text = project.tech.join(", ");

    changeProjTextVisible(true);

    textSpringApi.start({
      to: { scale: 1, pos: textAnimatePos },
      from: { scale: 0, pos: [2, 2, 2] },
    });
  };

  const changeProjTextVisible = (visible: boolean): void => {
    Object.values(textRefs.current).forEach((ref) => (ref.visible = visible));
  };

  return (
    <>
      <group
        ref={groupRef}
        position={[-0.4, 1, -2.66]}
        rotation={[0, -2.55, 0]}
      >
        {projectsWithPositions.map((project, index) => {
          return (
            <animated.group
              key={project.id}
              position={frameProps[index].pos as unknown as THREE.Vector3}
              rotation={frameProps[index].rotation as unknown as THREE.Euler}
              onClick={handleProjectSelection}
            >
              <ProjectFrame
                key={project.id}
                project={project}
                activeProjRef={activeProjRef}
              />
            </animated.group>
          );
        })}
        <animated.group
          position={textProps.pos as unknown as THREE.Vector3}
          scale={textProps.scale as unknown as THREE.Vector3}
          ref={textGroupRef}
        >
          <Billboard
            position={[billboardXPos, 0, 0]}
            scale={isMobile ? 2.6 : billboardScaleRatio}
          >
            <Text
              maxWidth={0.2}
              position={[0, 0, 0]}
              anchorX="center"
              fontSize={0.04}
              letterSpacing={-0.06}
              lineHeight={0.9}
              ref={(el) => (textRefs.current.name = el)}
              visible={false}
            >
              Name
            </Text>

            <Text
              maxWidth={0.2}
              position={isMobile ? [0, -0.58, 0] : [0, -0.18, 0]}
              anchorX="center"
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
              ref={(el) => (textRefs.current.description = el)}
              visible={false}
            >
              Description
            </Text>
            <Text
              maxWidth={0.2}
              position={isMobile ? [0, -0.7, 0] : [0, -0.3, 0]}
              anchorX="center"
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
              ref={(el) => (textRefs.current.tech = el)}
              visible={false}
            >
              Tech
            </Text>
            <Text
              onClick={() =>
                navOutWithGhostAnchor(activeProjRef?.current?.githubUrl ?? "")
              }
              position={isMobile ? [-0.07, -0.8, 0] : [-0.07, -0.38, 0]}
              anchorX="center"
              fontSize={0.02}
              letterSpacing={-0.02}
              fontStyle="italic"
              ref={(el) => (textRefs.current.github = el)}
              visible={false}
            >
              🔗Github
            </Text>
          </Billboard>
        </animated.group>
      </group>
      {activeProjRef.current && !isMobile && (
        <EffectComposer
          enabled={!!activeProjRef.current && !isMobile}
          multisampling={0}
        >
          <Vignette
            offset={0.2}
            darkness={0.9}
            eskil={false}
            blendFunction={BlendFunction.NORMAL}
          />

          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={4} />

          {/* <ToneMapping
            blendFunction={BlendFunction.NORMAL}
            adaptive={true}
            resolution={256}
            middleGrey={0.6}
            // minLuminance={4}
            maxLuminance={16.0}
            averageLuminance={1}
            adaptationRate={1.0}
          /> */}
        </EffectComposer>
      )}
    </>
  );
}

export default memo(Projects);
