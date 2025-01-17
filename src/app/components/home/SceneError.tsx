interface SceneErrorProps {
  message: string;
}

export default function SceneError({ message }: SceneErrorProps) {
  return (
    <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-3/4  md:w-[500px]">
      <div className="flex items-center gap-4 justify-center -left-1/2 -top-1/2 items-center flex-col">
        <p className="text-neutral-17">
          Unlucky, it looks like there was an error.
        </p>
        <p className="text-neutral-17">
          This project is a work in progress and I am still working to provide
          better support for some devices.
        </p>
        <p className="text-neutral-17">Error: {message}</p>
      </div>
    </div>
  );
}
