import type { Metadata } from "next";
import ProjectsNav from "../components/projects/ProjectsNav";

export const metadata: Metadata = {
  title: "LJ White - Projects",
  description: "An in depth look at my projects",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProjectsNav />
      {children}
    </div>
  );
}
