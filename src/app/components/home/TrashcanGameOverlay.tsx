import { useCameraStore, LocationMarkers } from "@/app/store/camera";
import { useSceneStore } from "@/app/store/scene";

export default function TrashcanGameOverlay() {
  const { activeMarker } = useCameraStore((state) => state);
  const { trashcanGameStatus, setTrashcanGameStatus } = useSceneStore(
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
      {trashcanGameStatus !== "started" && (
        <>
          <div className="absolute text-white top-[270px] left-[60px] text-lg text-right z-[8388637]">
            Click/tap the screen to throw the paper
          </div>
          <div className="absolute text-white top-[340px] left-[150px] text-[15px] text-right z-[8388637]">
            <button
              onClick={() => setTrashcanGameStatus("started")}
              className="px-5 py-2 rounded-lg bg-primary-4 font-semibold"
            >
              Start Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}
