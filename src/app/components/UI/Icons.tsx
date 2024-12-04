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

export const XIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    fill="none"
  >
    <g clipPath="url(#clip0_1_2)">
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
        fill={color ?? "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <rect width="1200" height="1227" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const DiscordIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 640 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
  </svg>
);

export const GithubIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    enableBackground="new 0 0 32 32"
    id="Layer_1"
    version="1.0"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      clipRule="evenodd"
      d="M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z"
      fill={color ?? "currentColor"}
      fillRule="evenodd"
    />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

export const SoundcloudIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    enableBackground="new 0 0 512 512"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="_x33_11-soundcloud_x2C__sound_x2C__music">
      <g>
        <g>
          <path
            d="M414.125,241.589c-5.121,0-10.148,0.545-14.978,1.581     c-6.466-65.524-61.753-116.895-128.772-116.895c-7.934,0-14.372,6.461-14.372,14.414V371.31c0,7.953,6.438,14.416,14.372,14.416     h143.75c39.646,0,71.874-32.319,71.874-72.068C486,273.931,453.771,241.589,414.125,241.589z"
            fill={color ?? "currentColor"}
          />
          <path
            d="M212.871,155.101c-7.93,0-14.368,6.457-14.368,14.414V371.31c0,7.953,6.439,14.416,14.368,14.416     c7.939,0,14.378-6.463,14.378-14.416V169.515C227.249,161.558,220.811,155.101,212.871,155.101z"
            fill={color ?? "currentColor"}
          />
          <path
            d="M155.373,212.758c-7.933,0-14.372,6.457-14.372,14.413V371.31c0,7.953,6.439,14.416,14.372,14.416     c7.935,0,14.379-6.463,14.379-14.416V227.17C169.752,219.214,163.308,212.758,155.373,212.758z"
            fill={color ?? "currentColor"}
          />
          <path
            d="M97.876,212.758c-7.935,0-14.379,6.457-14.379,14.413V371.31c0,7.953,6.444,14.416,14.379,14.416     c7.934,0,14.373-6.463,14.373-14.416V227.17C112.25,219.214,105.812,212.758,97.876,212.758z"
            fill={color ?? "currentColor"}
          />
          <path
            d="M40.379,256c-7.939,0-14.378,6.458-14.378,14.414v86.479c0,7.958,6.438,14.417,14.378,14.417     c7.933,0,14.374-6.459,14.374-14.417v-86.479C54.753,262.458,48.312,256,40.379,256z"
            fill={color ?? "currentColor"}
          />
        </g>
      </g>
    </g>
    <g id="Layer_1" />
  </svg>
);

export const CloseX = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    id="Layer_1"
    enableBackground="new 0 0 512 512"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
  </svg>
);

export const EthIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    data-name="Layer 1"
    id="Layer_1"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <polygon points="28.09 65.65 64 7 99.91 65.65 64 86.57 28.09 65.65" />
    <polygon points="64 93.16 98.76 71.58 64 121 28.42 71.58 64 93.16" />
  </svg>
);

export const CopyIcon = ({ size, color }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M448 0H224C188.7 0 160 28.65 160 64v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C512 28.65 483.3 0 448 0zM464 288c0 8.822-7.178 16-16 16H224C215.2 304 208 296.8 208 288V64c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16V288zM304 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V224c0-8.822 7.178-16 16-16h64V160H64C28.65 160 0 188.7 0 224v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64v-64h-48V448z" />
  </svg>
);
