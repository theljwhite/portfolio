export type Project = {
  id: number;
  name: string;
  images: string[];
  githubUrl: string;
  url: string | null;
  description: string | null;
  articlePath: string | null;
};

export const PROJECTS: Project[] = [
  {
    id: 0,
    name: "Lotta - Loyalty Programs on Blockchain",
    images: ["https://i.ibb.co/Gs4fMqF/dashboard-One-New.png"],
    githubUrl: "https://github.com/theljwhite/loyalty",
    url: null,
    description: "TODO",
    articlePath: "/loyalty",
  },
];
