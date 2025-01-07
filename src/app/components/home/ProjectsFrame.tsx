import { useSceneStore, LocationMarkers } from "@/app/store/scene";
import { useScreenSize } from "./ScreenSize";
import { type ThreeEvent } from "@react-three/fiber";
import PictureFrame from "./PictureFrame";

import { useCameraStore } from "@/app/store/camera";

const PROJECTS_INTERACT_VIEW = [-2.5, 1.4, -4.5];
const PROJECTS_INTERACT_VIEW_MOBILE = [-3, 1.4, -5];
const PROJ_LOCATION_MARKER_POS = [-0.1, 2.5, -2.7];

export default function ProjectsFrame() {
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
}
