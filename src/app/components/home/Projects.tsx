import { useState, useRef } from "react";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import { useScreenSize } from "./ScreenSize";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture, Text, Billboard } from "@react-three/drei";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Project, PROJECTS } from "../../constants/projects";
import { navOutWithGhostAnchor } from "@/app/utils/anchor";
import PictureFrame from "./PictureFrame";
import ProjectFrame from "./ProjectFrame";

//TODO - make this more responsive based on viewport width

const PROJECTS_INTERACT_VIEW = [-2.5, 1.4, -4.5];
const PROJECTS_INTERACT_VIEW_MOBILE = [-3, 1.4, -5];
const PROJ_COLUMNS = 3;
const PROJ_X_SPACING = 1.3;
const PROJ_Z_SPACING = 0.02;
const PROJ_Y_SPACING = 1;

const PROJ_TEXT_ANIMATE_TO = [0.2, 0.9, 2];
const PROJ_TEXT_ANIMATE_TO_MOBILE = [0, 1.5, 2];
const PROJ_LOCATION_MARKER_POS = [-0.1, 2.5, -2.7];

const allProjectImages = PROJECTS.flatMap((project) => project.images);

allProjectImages.map((image) => useTexture.preload(image));

const ProjectsFrame = () => {
  const {
    cameraValues,
    activeMarker,
    setCameraValues,
    setLocationMarker,
    setIsOverlayHidden,
  } = useSceneStore((state) => state);

  const { isMobile } = useScreenSize();

  const projectsView = isMobile
    ? PROJECTS_INTERACT_VIEW_MOBILE
    : PROJECTS_INTERACT_VIEW;

  const onProjectsEnterClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();

    setLocationMarker({
      title: "Leave Projects",
      position: PROJ_LOCATION_MARKER_POS,
      onClickAction: () => {
        setCameraValues({
          cachedPos: projectsView,
          cachedTarget: cameraValues.target,
          pos: [0, 0, 4],
          target: [0, 0, 0],
          orbitEnabled: true,
          activeMarker: undefined,
        });
        setIsOverlayHidden(false);
      },
    });

    setCameraValues({
      cachedPos: cameraValues.pos,
      cachedTarget: cameraValues.target,
      pos: projectsView,
      target: [0, 0, 0],
      orbitEnabled: false,
      activeMarker: LocationMarkers.Projects,
    });

    setIsOverlayHidden(true);
  };

  return (
    <PictureFrame
      imageUrl="./projectbrack.png"
      color={0x000000}
      name="projects-frame"
      scale={[0.6, 0.6, 0.05]}
      position={[-1.4, 1.2, -1.95]}
      rotation={[0, 0.58, 0]}
      disabled={activeMarker !== null}
      onClick={onProjectsEnterClick}
    />
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activeProj, setActiveProj] = useState<Project | null>(null);

  const { setIsMarkerHidden } = useSceneStore((state) => state);

  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);

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

  const [groupProps, springApi] = useSpring(
    {
      to: { scale: 1, pos: textAnimatePos },
      from: { scale: 0, pos: [2, 2, 2] },
      config: config.default,
      reset: true,
      immediate: true,
    },
    []
  );

  const handleProjectSelection = (
    e: ThreeEvent<MouseEvent>
  ): boolean | null => {
    e.stopPropagation();
    const clickedProjId = Number(e.object.name.split("-")[2]);
    const activeProject = projects.find((project) => project.selected) ?? null;

    if (activeProject?.id === clickedProjId) {
      setActiveProj(null);
      setProjects(PROJECTS);
      setIsMarkerHidden(false);
      return false;
    }

    if (activeProject && activeProject.id !== clickedProjId) return null;

    const projectsWithSelection = projects.map((project) => ({
      ...project,
      selected: project.id === clickedProjId,
    }));

    const selection =
      projectsWithSelection.find((project) => project.selected) ?? null;

    setActiveProj(selection);
    setProjects(projectsWithSelection);
    setIsMarkerHidden(true);

    springApi.start({
      to: { scale: 1, pos: textAnimatePos },
      from: { scale: 0, pos: [2, 2, 2] },
      config: config.default,
      reset: true,
    });

    return true;
  };

  return (
    <>
      <ProjectsFrame />
      <group
        ref={groupRef}
        position={[-0.4, 1, -2.66]}
        rotation={[0, -2.55, 0]}
      >
        {projects.map((project, index) => {
          const col = index % PROJ_COLUMNS;
          const row = Math.floor(index / PROJ_COLUMNS);

          const xPos = col * PROJ_X_SPACING;
          const zPos = col * PROJ_Z_SPACING;
          const yPos = -row * PROJ_Y_SPACING;

          return (
            <ProjectFrame
              key={project.id}
              project={project}
              position={[xPos, yPos, zPos]}
              handleProjectSelection={handleProjectSelection}
            />
          );
        })}
        <animated.group
          position={groupProps.pos as unknown as THREE.Vector3}
          scale={groupProps.scale as unknown as THREE.Vector3}
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
            >
              {activeProj?.name}
            </Text>
            <Text
              maxWidth={0.2}
              position={isMobile ? [0, -0.58, 0] : [0, -0.18, 0]}
              anchorX="center"
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
            >
              {activeProj?.description}
            </Text>
            <Text
              maxWidth={0.2}
              position={isMobile ? [0, -0.7, 0] : [0, -0.3, 0]}
              anchorX="center"
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
            >
              {activeProj && activeProj.tech.map((item) => item).join(", ")}
            </Text>
            <Text
              onClick={() => navOutWithGhostAnchor(activeProj?.githubUrl ?? "")}
              position={isMobile ? [-0.07, -0.8, 0] : [-0.07, -0.38, 0]}
              anchorX="center"
              fontSize={0.02}
              letterSpacing={-0.02}
              fontStyle="italic"
            >
              {activeProj && "🔗Github"}
            </Text>
          </Billboard>
        </animated.group>
      </group>
      {activeProj && (
        <EffectComposer enabled={!!activeProj} multisampling={0}>
          <Vignette
            offset={0.2}
            darkness={0.9}
            eskil={false}
            blendFunction={BlendFunction.NORMAL}
          />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={4} />
        </EffectComposer>
      )}
    </>
  );
}
