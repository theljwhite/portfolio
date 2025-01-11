import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import { useScreenSize } from "./ScreenSize";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { type ThreeEvent } from "@react-three/fiber";
import PictureFrame from "./PictureFrame";

const PROJECTS_INTERACT_VIEW = [-2.5, 1.4, -4.5];
const PROJECTS_INTERACT_VIEW_MOBILE = [-3, 1.4, -5];
const PROJ_LOCATION_MARKER_POS = [-0.1, 2.5, -2.7];

export default function ProjectsFrame() {
  const { activeMarker, setIsOverlayHidden } = useCameraStore((state) => state);
  const { isMobile } = useScreenSize();

  const { camGoTo, isLocationDisabled } = useAnimateCamera();

  const projectsView = isMobile
    ? PROJECTS_INTERACT_VIEW_MOBILE
    : PROJECTS_INTERACT_VIEW;

  const onProjectsEnterClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();

    if (isLocationDisabled(LocationMarkers.Projects)) return;

    camGoTo(
      {
        pos: projectsView,
        target: [0, 0, 0],
        orbitEnabled: false,
        activeMarker: LocationMarkers.Projects,
      },
      {
        title: "Leave Projects",
        position: PROJ_LOCATION_MARKER_POS,
        camPos: projectsView,
        camTarget: [0, 0, 0],
      }
    );

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
      disabled={activeMarker.current !== null}
      onClick={onProjectsEnterClick}
    />
  );
}
