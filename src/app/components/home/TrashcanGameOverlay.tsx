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
        <>
          <div className="absolute block lg:hidden text-center text-white max-w-[300px] top-[270px] left-[60px] text-lg z-[8388637]">
            Click, drag, &amp; release the paper to shoot it in the trash
          </div>
          <div className="hidden lg:block absolute max-w-[300px] text-center text-white top-[270px] right-[290px] text-lg z-[8388637]">
            Click, drag, &amp; release the paper to shoot it in the trash
          </div>
        </>
      ) : (
        <>
          <div className="block lg:hidden">
            <div className="absolute text-center text-white max-w-[300px] top-[270px] left-[60px] text-lg z-[8388637]">
              Attempts: {trashcanAttempts}
            </div>
            <div className="absolute text-center text-white max-w-[300px] top-[270px] right-[60px] text-lg z-[8388637]">
              Makes: {trashcanMakes}
            </div>
          </div>
          <div className="hidden lg:block absolute max-h-[30px] max-w-[125px] text-start text-white top-[270px] right-[475px] text-lg z-[8388637]">
            <div className="flex flex-col truncate">
              <span>Attempts: {trashcanAttempts}</span>
              <span>Makes: {trashcanMakes}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
