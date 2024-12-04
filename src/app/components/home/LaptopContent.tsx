import { useSceneStore } from "@/app/store/scene";
import { copyTextToClipboard } from "@/app/utils/text";
import { CopyIcon } from "../UI/Icons";

type LaptopContent = {
  id: number;
  content: JSX.Element;
  title?: string;
};

const MotivationalVideo = () => {
  const { resetLaptopContent } = useSceneStore((state) => state);
  return (
    <div className="text-white text-sm w-[334px] h-[216px] relative bg-black">
      <button
        onClick={resetLaptopContent}
        className="w-20 h-4 p-4 bg-primary-3 rounded-bl-md top-0 right-0 text-center items-center flex justify-center absolute"
      >
        Back
      </button>
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/_qzG28ZPFRY?autoplay=1"
      />
    </div>
  );
};

const VSCodeTheme = () => {
  const { resetLaptopContent } = useSceneStore((state) => state);

  return (
    <div className="w-[334px] h-[216px] flex flex-col gap-2 relative">
      <header className="flex absolute top-0 bg-neutral-24 py-1 px-3 w-full justify-between">
        <a
          href="https://github.com/theljwhite/TODO"
          rel="noreferrer"
          target="_blank"
          className="underline text-white cursor-pointer"
        >
          Get the theme
        </a>
        <button onClick={resetLaptopContent} className="underline text-white">
          Go back
        </button>
      </header>
      {/* <img
        className="w-full h-full"
        src="https://github.com/myaaghubi/Andromeda-Mariana-VScode/raw/main/images/andromeda-mariana.png"
      /> */}
      <div className="w-full h-full mt-10">
        <pre>
          <code className="language-typescript">const variable = 'raw';</code>
        </pre>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  const { setActiveLaptopContent } = useSceneStore((state) => state);

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white text-xl">LJ&apos;s Quick Links</h1>
        <div className="text-neutral-22 text-sm flex flex-row items-center justify-center gap-1">
          Contact: theljwhite@gmail.com
          <button
            onClick={() => copyTextToClipboard("theljwhite@gmail.com")}
            className="cursor-pointer hover:opacity-75"
          >
            <CopyIcon size={14} />
          </button>
        </div>
      </div>
      <div className="py-4 flex flex-col gap-4 items-start">
        {laptopContent.map((content) => {
          return (
            <span
              onClick={() => setActiveLaptopContent(content.id)}
              key={content.id}
              className="text-neutral-22 text-sm underline cursor-pointer text-primary-4"
            >
              {content.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const laptopContent: LaptopContent[] = [
  {
    id: 0,
    title: undefined,
    content: <QuickLinks />,
  },
  {
    id: 1,
    title: "Preview my VSCode theme (coming soon, for fun)",
    content: <VSCodeTheme />,
  },
  {
    id: 2,
    title: "View a highly motivational video",
    content: <MotivationalVideo />,
  },
];

export default function LaptopContent() {
  const { activeLaptopContent } = useSceneStore((state) => state);

  return (
    <div className="flex justify-center flex-col w-[334px] h-[216px] items-center">
      <div className={activeLaptopContent !== null ? "block" : "hidden"}>
        {laptopContent[activeLaptopContent ?? 0].content}
      </div>
    </div>
  );
}
