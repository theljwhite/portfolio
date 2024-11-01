// position: absolute;
//   font-size: 14vw;
//   font-weight: 800;
//   padding: 0;
//   margin: 0;
//   line-height: 0.8em;

export default function Overlay() {
  return (
    <div>
      {/* <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ top: 40, left: 40 }}
      >
        L
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ top: 40, left: "20vw" }}
      >
        J
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ top: 40, left: "40vw" }}
      >
        W
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ top: "20vw", left: "20vw" }}
      >
        H
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ bottom: 40, left: "40vw" }}
      >
        I
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ bottom: 40, left: "60vw" }}
      >
        T
      </div>
      <div
        className="text-[14vw] m-0 p-0 absolute"
        style={{ bottom: 40, left: "80vw" }}
      >
        E
      </div> */}
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
      <svg
        style={{ position: "absolute", right: 40, top: "50%" }}
        width="54"
        height="23"
        viewBox="0 0 54 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="1.5" x2="54" y2="1.5" stroke="black" strokeWidth="3" />
        <line y1="11.5" x2="54" y2="11.5" stroke="black" strokeWidth="3" />
        <line y1="21.5" x2="54" y2="21.5" stroke="black" strokeWidth="3" />
      </svg>
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
          <a
            style={{ fontSize: "15px", fontWeight: 600, letterSpacing: 2 }}
            href="https://github.com/pmndrs/drei#caustics"
          >
            PROJECTS
          </a>
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
    </div>
  );
}
