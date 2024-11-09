import { useSceneStore } from "@/app/store/scene";
import { AudioBackIcon, AudioPauseIcon, AudioForwardIcon } from "../UI/Icons";

//TODO - this is fully unfinished and will be implemented in the future

export default function AudioPlayer() {
  const { audioDetails } = useSceneStore((state) => state);

  return (
    <div style={{ zIndex: 8388637 }} className="fixed bottom-0 w-full ">
      <section className="h-12 bg-almostblack">
        <div className="w-screen relative h-full mx-12">
          <div className="flex relative h-full items-center">
            <button className="h-full w-6 ml-4">
              <AudioBackIcon size={24} />
            </button>
            <button className="h-full w-6 ml-4">
              <AudioPauseIcon size={24} />
            </button>
            <button className="h-full w-6 ml-4">
              <AudioForwardIcon size={24} />
            </button>
            <div className="mx-10 block grow items-center justify-center">
              <div className="flex">
                <div className="w-13 h-13">
                  <span className="text-primary-2 text-xs">0:00</span>
                </div>
                <div className="mx-2.5 py-2.5 block relative grow">
                  <div className="bg-white h-px absolute w-full" />
                  <div />
                </div>
                <div className="w-13 h-13">
                  <span className="text-primary-2 text-xs">2:23</span>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="xl:w-[360px] h-12 px-4 ">
              <div className="h-full flex items-center">
                <div className="mx-2.5">
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #70929c, #e6846e)",
                    }}
                    className="w-7 h-7 block"
                  >
                    <span
                      style={{
                        backgroundImage: audioDetails.artwork,
                      }}
                      className="w-7 h-7"
                    />
                  </div>
                </div>
                <div className="grow w-0">
                  <span className="text-xs text-gray-400 leading-4 h-4">
                    {audioDetails.artist}
                  </span>
                  <div className="flex w-full items-center h-4">
                    <span className="truncate text-neutral-22 leading-4 text-xs">
                      {audioDetails.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
