import { useProgress } from "@react-three/drei";

export default function SceneLoadingCircle() {
  const { progress } = useProgress();
  return (
    <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-3/4  md:w-[500px]">
      <div className="flex items-center gap-4 justify-center -left-1/2 -top-1/2 items-center flex-col">
        <div className="relative size-40">
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-zinc-800"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-primary-4"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={progress - 100}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-2xl font-bold text-primary-4">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
