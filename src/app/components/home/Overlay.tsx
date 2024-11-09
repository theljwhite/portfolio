"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AudioPlayer from "./AudioPlayer";

//TODO - temp fix for three JS canvas getting high zIndex of 8388636 when occlude = "blending" is set,
//that's why the z indexes here are so high for now.

export default function Overlay() {
  const router = useRouter();

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 160,
          fontSize: "15px",
          textAlign: "right",
          zIndex: 8388637,
        }}
      >
        LJ WHITE
        <br />
        PORTFOLIO
      </div>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          fontSize: "15px",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
          zIndex: 8388637,
        }}
      >
        —
        <br />
        {new Date().toLocaleDateString()}
      </div>
      <div style={{ position: "absolute", right: 40, top: "50%" }}>
        {/* <NavHamburgerIcon width={54} height={23} /> */}
        {/* TODO a navbar */}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 120,
          fontSize: "18px",
          zIndex: 8388637,
        }}
      >
        Full stack developer
        <br />
        based in Fayetteville, WV
        <br />
        <br />
        <div
          style={{
            position: "relative",
            marginTop: 10,
            display: "inline-block",
          }}
        >
          <button
            style={{ fontSize: "15px", fontWeight: 600, letterSpacing: 2 }}
            // href="/projects"
            onClick={() => router.push("/projects")}
          >
            PROJECTS
          </button>
          <div
            style={{
              marginTop: 6,
              height: 2.5,
              width: "100%",
              background: "#3e3e3d",
            }}
          />
        </div>
        <br />
      </div>
      {/* TODO AudioPlayer will go here */}
      {/* <AudioPlayer /> */}
    </div>
  );
}
