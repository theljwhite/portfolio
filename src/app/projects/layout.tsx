import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import ProjectsNav from "../components/projects/ProjectsNav";

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--sharetech",
  display: "swap",
});

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
    <div className={shareTech.className}>
      <ProjectsNav />
      {children}
    </div>
  );
}
