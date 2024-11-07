interface IconProps {
  size: number;
  color?: string;
}

interface IconAltProps {
  width: number;
  height: number;
  color?: string;
}

export const AudioBackIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg width={size} height={size} fill="none">
    <path
      d="m10 12 8-6v12l-8-6Z"
      fill={color ?? "currentColor"}
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6 6v12"
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const AudioPauseIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M216,48V208a16,16,0,0,1-16,16H164a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h36A16,16,0,0,1,216,48ZM92,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H92a16,16,0,0,0,16-16V48A16,16,0,0,0,92,32Z" />
  </svg>
);

export const AudioForwardIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg width={size} height={size} fill="none">
    <path
      d="M14 12 6 6v12l8-6Z"
      fill={color ?? "currentColor"}
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M18 6v12"
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const NavHamburgerIcon = ({ color, width, height }: IconAltProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 54 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      y1="1.5"
      x2="54"
      y2="1.5"
      stroke={color ?? "currentColor"}
      strokeWidth="3"
    />
    <line
      y1="11.5"
      x2="54"
      y2="11.5"
      stroke={color ?? "currentColor"}
      strokeWidth="3"
    />
    <line
      y1="21.5"
      x2="54"
      y2="21.5"
      stroke={color ?? "currentColor"}
      strokeWidth="3"
    />
  </svg>
);
