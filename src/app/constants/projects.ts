export type Project = {
  id: number;
  name: string;
  images: string[];
  githubUrl: string;
  url: string | null;
  description: string | null;
  articlePath: string | null;
  tech: string[];
  position?: number[];
};

export const PROJECTS: Project[] = [
  {
    id: 0,
    name: "Lotta - Loyalty Programs on Blockchain",
    images: [
      "https://i.ibb.co/Gs4fMqF/dashboard-One-New.png",
      "https://i.ibb.co/YP9Zb3g/connect-Wallet-New.png",
      "https://i.ibb.co/6Dm0MWn/dashboard-One-Light.png",
      "https://i.ibb.co/s6tNT1m/create-Obj.png",
      "https://i.ibb.co/t2VSpD7/deploy-Summary.png",
      "https://i.ibb.co/LvCdvPS/overview-New.png",
      "https://i.ibb.co/6tfBvGJ/escrow-Wallet-New.png",
      "https://i.ibb.co/Kmdz9zf/erc721-Deposit.png",
      "https://i.ibb.co/1JGjG0r/reset-New2.png",
    ],
    githubUrl: "https://github.com/theljwhite/loyalty",
    url: null,
    description:
      "Allows entities to create, deploy, and manage customizable on-chain loyalty program smart contracts & reward users with cryptocurrencies",
    articlePath: "/loyalty",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "Prisma",
      "Solidity",
      "Zustand",
      "Zod",
      "NextAuth",
      "Ethers",
      "Wagmi",
    ],
  },
  {
    id: 1,
    name: "Blocklingo - P2E Crypto Word Puzzle Game",
    images: [
      "https://i.postimg.cc/kqSyw30k/Screenshot-2024-10-29-130516.png",
      "https://i.postimg.cc/RSSRpR6r/Blocklingo3.png",
      "https://i.postimg.cc/sjTJkh7M/Screenshot-2024-11-19-153707.png",
    ],
    githubUrl: "https://github.com/theljwhite/blocklingo",
    url: null,
    description:
      "Multi step browser word puzzle game, similar to the games Connections & Contexto. Earn crypto while you solve word puzzles.",
    articlePath: "/blocklingo",
    tech: [
      "TypeScript",
      "React/Vite",
      "Tailwind",
      "C#",
      "ASP.NET",
      "Solidity",
      "Zustand",
      "Ethers",
      "Wagmi",
    ],
  },
  {
    id: 2,
    name: "TRNEE - Tournament Bracket Generator",
    images: [
      "https://i.postimg.cc/PTpkCsgn/Home1.png",
      "https://i.postimg.cc/kgqjsbwZ/Tourney1.png",
    ],
    githubUrl: "https://github.com/theljwhite/trnee",
    url: null,
    description:
      "Allows users to create, update, and manage a customized tournament bracket. Although TRNEE is tailored to e-sports and gaming, a bracket can be generated for any hobby.",
    articlePath: "/trnee",
    tech: ["JavaScript", "React/Vite", "Tailwind"],
  },
  {
    id: 3,
    name: "My Portfolio App (Inception)",
    images: ["https://i.postimg.cc/XWmxsCQY/Screenshot-2024-11-15-163452.png"],
    githubUrl: "https://github.com/theljwhite/portfolio",
    url: "https://ljwhite.is",
    description:
      "My portfolio website, which is very much still a work in progress. If you're reading this, you are here. Thanks a lot for visiting!",
    articlePath: "/portfolio",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "Zustand",
      "THREE.js",
      "React Three Fiber",
      "React Three Drei",
      "React Three Rapier",
      "React Spring / Three",
    ],
  },
  {
    id: 4,
    name: "Tags - Web3 Homepage & Link in Bio Tool",
    images: [
      "https://i.postimg.cc/RS0knVDr/tagsHome.jpg",
      "https://i.postimg.cc/9W13Mq1t/tags-Link-Editor1.jpg",
      "https://i.postimg.cc/tqmLdQKs/tags-Link-Editor2.jpg",
      "https://i.postimg.cc/dJ2Pbfyf/tags-Custom1.jpg",
      "https://i.postimg.cc/HpTDdt0k/tags-Custom2.jpg",
      "https://i.postimg.cc/0xFTbvG3/tags-Profile1.jpg",
    ],
    githubUrl: "https://github.com/theljwhite/tags",
    url: null,
    description:
      "Tags - fully customizable web3 homepage & 'link in bio' tool. Usernames, or 'tags' are ERC721 tokens and users sign in with their owned tokens. ",
    articlePath: "/tags",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "NextAuth",
      "Prisma",
      "Solidity",
      "Zustand",
      "Ethers",
      "Wagmi",
      "Zod",
    ],
  },
  {
    id: 5,
    name: "EggieBot - Diabotical Discord Bot",
    images: ["https://i.ibb.co/VgQYDrj/eggie2.png"],
    githubUrl: "https://github.com/theljwhite/EggieBot",
    url: null,
    description:
      "Made for DBT friends. Was my first time ever trying a Discord bot, was fun. It has slash commands, and it'll update every minute with a status message of the most full server.",
    articlePath: "/eggiebot",
    tech: ["TypeScript", "Discord.js"],
  },
];
