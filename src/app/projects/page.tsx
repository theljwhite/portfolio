import Link from "next/link";
import { SOCIALS } from "../constants/socials";

export default function Projects() {
  return (
    <div className="h-dvh w-dvh bg-neutral-22 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center px-4 gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-primary-1 font-bold text-[3rem] tracking-tighter">
            Coming Soon
          </h1>
          <p className="text-gray-800 text-center text-lg tracking-tighter">
            For now, you can see most of my projects on{" "}
            <a
              className="underline text-primary-4 hover:opacity-75"
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            or my{" "}
            <a
              className="underline text-primary-4 hover:opacity-75"
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </p>
        </div>
        <Link
          href="/"
          className="bg-primary-1 text-center rounded-full tracking-tight w-full p-4 block md:hidden"
        >
          Return back to home scene
        </Link>
      </div>
    </div>
  );
}
