import * as THREE from "three";
import { PROJECTS } from "../../constants/projects";
import PictureFrame from "./PictureFrame";

export default function ProjectsStage() {
  return (
    <group position={[0, 0, 0]}>
      {PROJECTS.map((project) => {
        return <PictureFrame imageUrl={project.images[0]} color={0x006cff} />;
      })}
    </group>
  );
}
