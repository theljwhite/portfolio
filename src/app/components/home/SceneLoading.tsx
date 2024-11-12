import { useProgress } from "@react-three/drei";

export default function SceneLoading() {
  const { progress } = useProgress();
  return (
    <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-3/4  md:w-[500px]">
      <div className="flex items-center gap-4 justify-center -left-1/2 -top-1/2 items-center flex-col">
        <h1 className="relative md:text-3xl text-lg text-white">
          Loading {Math.floor(progress)}%
        </h1>
        <div className="w-full h-6 bg-zinc-800 rounded-full">
          <div
            style={{ width: `${progress}%` }}
            className="h-6 bg-primary-3 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
}
