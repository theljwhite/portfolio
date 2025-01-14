import { useSceneStore } from "@/app/store/scene";

import { useRef } from "react";

const fakeNavLinks = [
  "Home",
  "Browse",
  "Search",
  "Messages",
  "Blog",
  "Bulletins",
  "Forum",
  "Groups",
];

const fakeFriends = [
  {
    name: "Tom",
    img: "/tom2.jpg",
  },
  {
    name: "Guy",
    img: "/guyb.jpg",
  },
];

const fakeContactItems = [
  "Add to Friends",
  "Add to Favorites",
  "Send Message",
  "Forward to Friend",
  "Instant Message",
  "Block User",
  "Add to Group",
  "Report User",
];

const interests = {
  general: "Coding",
  music: "EDM, Rock, Metal, Hip Hop",
  television: "Sports",
  heroes: "Theo Browne",
};

const Interests = () => (
  <div className="w-full border-[#60A5FA] border my-2.5">
    <div className="bg-[#60A5FA] text-[11px] items-center justify-start flex text-white py-1 px-[7px] h-4">
      <h1 className="inline-block">LJ&apos;s Interests</h1>
    </div>
    <div className="block">
      <table
        cellPadding={1}
        cellSpacing={1}
        className="w-full table bg-white border-spacing-0.5 border-separate"
      >
        <tbody className="table-row-group align-middle text-[10px]">
          {Object.entries(interests).map(([key, value], index) => {
            return (
              <tr key={index} className="table-row">
                <td className="w-1/3 bg-[#BFDBFE] text-[#1D4ED8] table-cell font-semibold py-px">
                  <p className="capitalize">{key}</p>
                </td>
                <td className="align-top bg-[#DBEAFE] table-cell text-black py-px">
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default function LaptopProfile() {
  const { resetLaptopContent } = useSceneStore((state) => state);

  const ctnRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ctnRef}
      className="w-[334px] h-[216px] bg-white overflow-y-auto my-2"
    >
      <nav>
        <div className="flex justify-between bg-[#1D4ED8] relative py-3.5 px-2.5">
          <div className="inline-block align-top">
            <span>
              <img
                src="/myspace.png"
                alt="MySpace logo"
                className="w-[110px] h-[30px] ml-1.5"
              />
            </span>
          </div>
          <div className="text-right inline-block align-top text-xs">
            <button onClick={resetLaptopContent} className="underline">
              Go back
            </button>{" "}
            | <span>LogIn</span> | <span>SignUp</span>
          </div>
        </div>
        <ul className="list-none py-1 px-4 bg-[#60A5FA] w-full h-[24px] overflow-hidden flex flex-row">
          {fakeNavLinks.map((link, index) => {
            return (
              <li className="text-xs pl-1 flex" key={index}>
                {" "}
                {link}{" "}
                <span className="border-r border-black px-1 mt-0.5 h-[10px]" />
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="bg-white h-full w-full pt-1.5">
        <div className="w-full table table-fixed">
          <div className="w-5/12 p-2.5 align-top table-cell">
            <span className="text-black">LJ White</span>
            <div>
              <div className="block float-left h-[80px] mr-4 mb-2">
                <img src="./meFromGH.jpg" className="w-[80px] h-[80px]" />
              </div>
              <div className="w-full inline-block">
                <p className="mb-1 text-xs text-black font-semibold">
                  Mood: Hopeful
                </p>
              </div>
              <div className="table-cell w-full border border-[#60A5FA]">
                <div className="bg-[#60A5FA] text-[9px] items-center justify-start flex text-white py-1 px-[7px] h-3">
                  <h1 className="inline-block">Contacting LJ</h1>
                </div>
                <div className="grid grid-cols-2">
                  {fakeContactItems.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mx-[7px] font-semibold text-blue-700 truncate text-[7px]"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Interests />
            </div>
          </div>
          <div className="p-2.5 table-cell align-top">
            <div>
              <div className="bg-[#f9c56c] font-semibold text-xs text-[#ED0707] py-0.5 px-[7px]">
                LJ&apos;s Blurbs
              </div>
              <div className="p-[7px]">
                <div className="mb-4">
                  <h1 className="text-[#ED0707] text-xs font-semibold">
                    About me:
                  </h1>
                  <p className="text-xs text-black">30/m/WV</p>
                </div>
                <div className="mb-4">
                  <h1 className="text-[#ED0707] text-xs font-semibold">
                    Who I&apos;d like to meet:
                  </h1>
                  <p className="text-xs text-black">
                    The Primeagen, Austin Reaves
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#f9c56c] font-semibold text-xs text-[#ED0707] py-0.5 px-[7px]">
                LJ&apos;s Friend Space
              </div>
              <div className="p-[7px]">
                <p className="text-xs text-black font-semibold">
                  LJ has{" "}
                  <span className="text-[#ED0707]">{fakeFriends.length}</span>{" "}
                  friends.
                </p>
                <div className="mb-4 text-center items-start flex">
                  {fakeFriends.map((friend, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[60px] items-center align-middle inline-block pr-3.5"
                      >
                        <span className="text-[#666666] text-center text-xs">
                          {friend.name}
                        </span>
                        <img
                          src={friend.img}
                          alt={`A pictue of friend ${friend.name}`}
                          className="block mx-auto w-[50px] h-[40px]"
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div className="bg-[#f9c56c] font-semibold text-xs text-[#ED0707] py-0.5 px-[7px]">
                    LJ&apos;s Friends Comments
                  </div>
                  <div className="p-[7px]">
                    <p className="mb-2 text-black text-[10px] font-semibold">
                      Displaying <span className="text-[#D32626]">0</span> of{" "}
                      <span className="text-[#D32626]">0</span> comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-4 w-full">
          <p className="flex my-2 text-[10px] text-black py-0.5 mb-1.5 align-middle justify-center">
            Disclaimer: not affiliated with MySpace® in any way, z!ng
          </p>
        </div>
      </main>
    </div>
  );
}
