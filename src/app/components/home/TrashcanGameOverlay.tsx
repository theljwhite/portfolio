import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import { useSceneStore } from "@/app/store/scene";

export default function TrashcanGameOverlay() {
  const { activeMarker } = useCameraStore((state) => state);
  const { trashcanGameStatus, trashcanAttempts, trashcanMakes } = useSceneStore(
    (state) => state
  );

  return (
    <div
      className={`${
        activeMarker.current === LocationMarkers.Trashcan
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-200`}
    >
      {trashcanGameStatus === "idle" && trashcanAttempts === 0 ? (
        <div className="absolute text-center text-white max-w-[300px] top-[270px] left-[60px] text-lg z-[8388637]">
          Click, drag, &amp; release the paper to shoot it in the trash
        </div>
      ) : (
        <>
          <div className="absolute text-center text-white max-w-[300px] top-[270px] left-[60px] text-lg z-[8388637]">
            Attempts: {trashcanAttempts}
          </div>
          <div className="absolute text-center text-white max-w-[300px] top-[270px] right-[60px] text-lg z-[8388637]">
            Makes: {trashcanMakes}
          </div>
        </>
      )}
    </div>
  );
}
