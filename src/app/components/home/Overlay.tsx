"use client";

import { useRouter } from "next/navigation";
import { useSceneStore } from "@/app/store/scene";

//TODO - temp fix for three JS canvas getting high zIndex of 8388636 when occlude = "blending" is set,
//that's why the z indexes here are so high for now.

export default function Overlay() {
  const { setIsAudioPlaying } = useSceneStore((state) => state);

  const router = useRouter();

  const onProjectsClick = (): void => {
    setIsAudioPlaying(false);
    router.push("/projects");
  };

  return (
    <div>
      <div className="absolute text-white top-[40px] right-[160px] text-[15px] text-right z-[8388637]">
        LJ WHITE
        <br />
        PORTFOLIO
      </div>
      <div
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        className="absolute text-white top-[40px] right-[40px] text-[15px] text-right z-[8388637]"
      >
        —
        <br />
        {new Date().toLocaleDateString()}
      </div>
      <div style={{ position: "absolute", right: 40, top: "50%" }}>
        {/* <NavHamburgerIcon width={54} height={23} /> */}
        {/* TODO a navbar */}
      </div>
      <div className="text-white absolute z-[8388637] bottom-[20px] md:bottom-[120px] md:left-[120px] left-[20px] md:text-[18px]">
        Full stack developer
        <br />
        from Fayetteville, WV
        <br />
        <br />
        <div className="relative mt-2.5 inline-block">
          <button
            onClick={onProjectsClick}
            className="text-[15px] font-semibold tracking-[2px] hover:opacity-75"
          >
            PROJECTS
          </button>
          <div className="mt-1.5 h-[2.5px] bg-[#3e3e3d] w-full" />
        </div>
        <br />
      </div>
      {/* TODO AudioPlayer will go here */}
    </div>
  );
}
