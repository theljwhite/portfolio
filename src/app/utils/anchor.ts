export const navOutWithGhostAnchor = (href: string): void => {
  const ghostAnchor = document.createElement("a");

  ghostAnchor.href = href;
  ghostAnchor.target = "_blank";
  ghostAnchor.rel = "noopener noreferrer";

  ghostAnchor.click();
  ghostAnchor.remove();
};
