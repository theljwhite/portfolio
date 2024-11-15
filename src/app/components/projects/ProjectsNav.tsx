import Link from "next/link";
import { DiscordIcon, GithubIcon, SoundcloudIcon, XIcon } from "../UI/Icons";

export default function ProjectsNav() {
  return (
    <div className="bg-transparent w-full z-100 top-0 fixed">
      <div
        style={{
          backgroundColor: "hsla(0, 0%, 100%, 0.85)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.06)",
        }}
        className="absolute z-[-1] w-full h-full"
      />
      <nav className="px-6 mx-auto h-16 flex max-w-7xl items-center justify-end gap-2">
        <a className="flex items-center mr-auto ring-2 ring-transparent rounded">
          <h1 className="font-bold text-xl md:text-2xl flex flex-row tracking-tighter items-baseline leading-8">
            <span className="text-primary-1">ljwhite</span>
            <span className="ml-1 text-primary-4">projects</span>
          </h1>
        </a>
        <Link
          href="/"
          style={{ color: "rgba(75, 85, 99, 1)" }}
          className="text-sm p-2 whitespace-nowrap -ml-2 mr-4 relative ring-2 ring-transparent cursor-pointer"
        >
          <span className="text-center hidden md:block">Go to Home ↗</span>
        </Link>
        <div className="flex flex-row gap-4 text-primary-1">
          <XIcon size={21} />
          <DiscordIcon size={24} />
          <GithubIcon size={24} />
          <SoundcloudIcon size={24} />
        </div>

        <button className="text-black -mr-2 rounded p-2 border-none bg-transparent">
          {/* TODO Navbar hamburger menu */}
        </button>
      </nav>
    </div>
  );
}
