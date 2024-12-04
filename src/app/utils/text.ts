//TODO update date this with Toast

export const copyTextToClipboard = async (
  textToCopy: string,
  message?: string
): Promise<void> => {
  await navigator.clipboard.writeText(textToCopy);
};
