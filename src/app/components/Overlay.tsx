import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { NavHamburgerIcon } from "./UI/Icons";

export default function Overlay() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 160,
          fontSize: "15px",
          textAlign: "right",
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
        }}
      >
        —
        <br />
        10/30/2024
      </div>
      <div style={{ position: "absolute", right: 40, top: "50%" }}>
        <NavHamburgerIcon width={54} height={23} />
        {/* TODO a navbar */}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 120,
          fontSize: "18px",
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
          <Link
            style={{ fontSize: "15px", fontWeight: 600, letterSpacing: 2 }}
            href="/projects"
          >
            PROJECTS
          </Link>
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
      <AudioPlayer />
    </div>
  );
}
