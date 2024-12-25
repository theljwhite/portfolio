export type Project = {
  id: number;
  name: string;
  images: string[];
  githubUrl: string;
  url: string | null;
  description: string | null;
  articlePath: string | null;
  selected?: boolean;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 0,
    name: "Lotta - Loyalty Programs on Blockchain",
    images: ["https://i.ibb.co/Gs4fMqF/dashboard-One-New.png"],
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
    ],
  },
  {
    id: 1,
    name: "Blocklingo - P2E Crypto Word Puzzle Game",
    images: ["https://i.postimg.cc/8cqLwtW1/Screenshot-2024-11-15-163452.png"],
    githubUrl: "https://github.com/theljwhite/blocklingo",
    url: null,
    description: "TODO",
    articlePath: "/blocklingo",
    tech: [
      "TypeScript",
      "React/Vite",
      "Tailwind",
      "C#",
      "ASP.NET",
      "Solidity",
      "Zustand",
    ],
  },
  {
    id: 2,
    name: "Lotta - Loyalty Programs on Blockchain",
    images: ["https://i.ibb.co/Gs4fMqF/dashboard-One-New.png"],
    githubUrl: "https://github.com/theljwhite/loyalty",
    url: null,
    description: "TODO",
    articlePath: "/loyalty",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "Prisma",
      "Solidity",
      "Zustand",
    ],
  },
  {
    id: 3,
    name: "Blocklingo - P2E Crypto Word Puzzle Game",
    images: ["https://i.postimg.cc/8cqLwtW1/Screenshot-2024-11-15-163452.png"],
    githubUrl: "https://github.com/theljwhite/blocklingo",
    url: null,
    description: "TODO",
    articlePath: "/blocklingo",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "Prisma",
      "Solidity",
      "Zustand",
    ],
  },
  {
    id: 4,
    name: "Lotta - Loyalty Programs on Blockchain",
    images: ["https://i.ibb.co/Gs4fMqF/dashboard-One-New.png"],
    githubUrl: "https://github.com/theljwhite/loyalty",
    url: null,
    description: "TODO",
    articlePath: "/loyalty",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "Prisma",
      "Solidity",
      "Zustand",
    ],
  },
  {
    id: 5,
    name: "Blocklingo - P2E Crypto Word Puzzle Game",
    images: ["https://i.postimg.cc/8cqLwtW1/Screenshot-2024-11-15-163452.png"],
    githubUrl: "https://github.com/theljwhite/blocklingo",
    url: null,
    description: "TODO",
    articlePath: "/blocklingo",
    tech: [
      "TypeScript",
      "NextJS",
      "Tailwind",
      "TRPC",
      "Prisma",
      "Solidity",
      "Zustand",
    ],
  },
];
