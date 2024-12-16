import { useState, useEffect } from "react";
import { useSceneStore } from "@/app/store/scene";
import { copyTextToClipboard } from "@/app/utils/text";
import { CopyIcon } from "../UI/Icons";
import Editor from "react-simple-code-editor";
import { Prism, highlight, languages } from "prismjs/components/prism-core.js";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "./laptop-themes.css";

type LaptopContent = {
  id: number;
  content: JSX.Element;
  title?: string;
};

const VideoDisplay = ({ url }: { url: string }) => {
  const { resetLaptopContent } = useSceneStore((state) => state);
  return (
    <div className="text-white text-sm w-[334px] h-[216px] relative bg-black">
      <button
        onClick={resetLaptopContent}
        className="w-20 h-2 px-2 py-4 bg-primary-3 rounded-bl-md top-0 right-0 text-center items-center flex justify-center absolute"
      >
        Back
      </button>
      <iframe className="w-full h-full" src={url} />
    </div>
  );
};

const VSCodeTheme = () => {
  const defaultCode = `//Write some code to preview theme
type DoGreeting = (msg: string) => void;

async function getGreeting(id: number): Promise<Greeting> {
const res = await fetch("/greet/" + id);
const data = await res.json();
return data;
};
doAncientProverb("That and 50 cents would get you a cup of coffee");
`;

  const themeOptions = [
    "ilyat",
    "ilyat-mariana",
    "ilyat-poimandres",
    "ilyat-poimandres-darker",
  ];

  const [activeTheme, setActiveTheme] = useState<number>(0);
  const [code, setCode] = useState<string>(defaultCode);
  const { resetLaptopContent } = useSceneStore((state) => state);

  const handleThemeChange = (): void => {
    setActiveTheme(
      activeTheme === themeOptions.length - 1 ? 0 : activeTheme + 1
    );
  };

  return (
    <div className="w-[334px] h-[216px] flex bg-[#262A33] flex-col relative">
      <header className="flex bg-[#23262E] border-b border-[#1B1D23] py-1 px-3 w-full justify-between">
        <a
          href="https://github.com/theljwhite/ilyat"
          rel="noreferrer"
          target="_blank"
          className="underline text-white text-xs cursor-pointer hover:text-primary-2"
        >
          Get the themes
        </a>
        <button
          onClick={handleThemeChange}
          className="underline text-xs text-white cursor-pointer hover:text-primary-2"
        >
          Toggle theme
        </button>
        <button
          onClick={resetLaptopContent}
          className="underline text-xs text-white cursor-pointer hover:text-primary-2"
        >
          Go back
        </button>
      </header>
      <div className="flex flex-row h-full w-full">
        <div className="bg-[#23262E] flex justify-center pt-2 border-r border-[#1B1D23] h-full w-1/4">
          <span className="text-[#00e8c6] uppercase text-[8px] text-center">
            Explorer
          </span>
        </div>
        <div data-theme={themeOptions[activeTheme]}>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.ts)}
            padding={10}
            style={{
              fontSize: 12,
              width: "250px",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  const { setActiveLaptopContent } = useSceneStore((state) => state);

  return (
    <div className="w-[334px] h-[216px] bg-primary-5">
      <div className="flex justify-center flex-col pt-4 items-center">
        <h1 className="text-white text-xl">LJ&apos;s Quick Links</h1>
        <div className="text-primary-2 text-sm flex flex-row items-center justify-center gap-1">
          Contact: theljwhite@gmail.com
          <button
            onClick={() => copyTextToClipboard("theljwhite@gmail.com")}
            className="cursor-pointer hover:opacity-75"
          >
            <CopyIcon size={14} />
          </button>
        </div>
      </div>
      <div className="mx-10 py-4 flex flex-col gap-2 items-start">
        {laptopContent.map((content) => {
          return (
            <span
              onClick={() => setActiveLaptopContent(content.id)}
              key={content.id}
              className="text-neutral-22 hover:text-primary-3 text-sm underline cursor-pointer text-primary-3"
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
    title: "Preview my VSCode theme",
    content: <VSCodeTheme />,
  },
  {
    id: 2,
    title: "View a highly motivational video",
    content: <VideoDisplay url="https://www.youtube.com/embed/_qzG28ZPFRY" />,
  },
  {
    id: 3,
    title: "Find me a better quality version of this",
    content: <VideoDisplay url="https://www.youtube.com/embed/Q9QcNmtED6g" />,
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
