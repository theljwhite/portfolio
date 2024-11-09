import { SOCIALS } from "../constants/socials";

export default function Projects() {
  return (
    <div className="h-dvh w-dvh bg-neutral-22 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-primary-1 font-bold font-third text-[4rem] tracking-tighter">
          Coming Soon
        </h1>
        <p className="text-primary-1 text-lg tracking-tighter font-third">
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
    </div>
  );
}