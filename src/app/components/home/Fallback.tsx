//TODO

export default function Fallback() {
  return (
    <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-3/4  md:w-[500px]">
      <div className="flex items-center gap-4 justify-center -left-1/2 -top-1/2 items-center flex-col">
        <p className="text-neutral-17">
          Sorry, it looks like WebGL is not supported on your device.
        </p>
        <p className="text-neutral-17">
          This project is a work in progress, and I haven&apos;t got around to
          creating a fallback yet, because I want the fallback to be just as
          good as the 3D interactive scene.
        </p>
        <p className="text-neutral-17">
          In the meantime, try visiting on a desktop PC or a different device.
        </p>
      </div>
    </div>
  );
}
