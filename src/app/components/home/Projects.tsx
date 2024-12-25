import { useState, useRef } from "react";
import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";
import { type ThreeEvent } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { Project, PROJECTS } from "../../constants/projects";
import { navOutWithGhostAnchor } from "@/app/utils/anchor";
import PictureFrame from "./PictureFrame";
import ProjectFrame from "./ProjectFrame";
import Marker from "./Marker";

const PROJECTS_INTERACT_VIEW = [-2.5, 1.4, -4.5];
const PROJ_COLUMNS = 3;
const PROJ_X_SPACING = 1.3;
const PROJ_Z_SPACING = 0.02;
const PROJ_Y_SPACING = 1;

const PROJ_TEXT_ANIMATE_TO = [0.2, 0.78, 2]; //Y was 0.95

const ProjectsFrame = () => {
  const { cameraValues, setCameraValues, setActiveMarker, setIsOverlayHidden } =
    useSceneStore((state) => state);

  return (
    <PictureFrame
      imageUrl="./projects.png"
      color={0x000000}
      name="projects-frame"
      scale={[0.6, 0.6, 0.05]}
      position={[-1.4, 1.2, -1.95]}
      rotation={[0, 0.58, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setCameraValues({
          cachedPos: cameraValues.pos,
          cachedTarget: cameraValues.target,
          pos: PROJECTS_INTERACT_VIEW,
          target: [0, 0, 0],
          autoRotate: false,
          orbitEnabled: false,
          activeMarker: LocationMarkers.Projects,
        });
        setActiveMarker(LocationMarkers.Projects);
        setIsOverlayHidden(true);
      }}
    />
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activeProj, setActiveProj] = useState<Project | null>(null);

  const groupRef = useRef<THREE.Group>(null);

  const [groupProps, springApi] = useSpring(
    {
      to: { scale: 1, pos: PROJ_TEXT_ANIMATE_TO },
      from: { scale: 0, pos: [2, 2, 2] },
      config: config.default,
      reset: true,
      immediate: true,
    },
    []
  );

  const onProjectClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();
    const clickedProjId = Number(e.object.name.split("-")[2]);

    const activeProject = projects.find((project) => project.selected) ?? null;

    if (activeProject?.id === clickedProjId) {
      setActiveProj(null);
      return;
    }

    const projectsWithSelection = projects.map((project) => ({
      ...project,
      selected: project.id === clickedProjId,
    }));

    const selection =
      projectsWithSelection.find((project) => project.selected) ?? null;

    setActiveProj(selection);
    setProjects(projectsWithSelection);

    springApi.start({
      to: { scale: 1, pos: PROJ_TEXT_ANIMATE_TO },
      from: { scale: 0, pos: [2, 2, 2] },
      config: config.default,
      reset: true,
    });
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
              onClick={onProjectClick}
            />
          );
        })}
        <animated.group
          position={groupProps.pos as unknown as THREE.Vector3}
          scale={groupProps.scale as unknown as THREE.Vector3}
        >
          <Billboard>
            <Text
              maxWidth={0.2}
              position={[0, 0, 0]}
              fontSize={0.04}
              letterSpacing={-0.06}
              lineHeight={0.9}
            >
              {activeProj?.name}
            </Text>
            <Text
              maxWidth={0.2}
              position={[0, -0.18, 0]}
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
            >
              {activeProj?.description}
            </Text>
            <Text
              maxWidth={0.2}
              position={[0, -0.3, 0]}
              fontSize={0.016}
              letterSpacing={-0.01}
              lineHeight={1.2}
            >
              {activeProj && activeProj.tech.map((item) => item).join(", ")}
            </Text>
            <Text
              onClick={() => navOutWithGhostAnchor(activeProj?.githubUrl ?? "")}
              position={[-0.07, -0.38, 0]}
              fontSize={0.02}
              letterSpacing={-0.08}
              fontStyle="italic"
            >
              {activeProj && "🔗Github"}
            </Text>
          </Billboard>
        </animated.group>
      </group>
    </>
  );
}
