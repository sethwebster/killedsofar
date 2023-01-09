"use client";
export const setBrowserTitle = (title: string) => {
  if (typeof document === "undefined")
    return;
  document.title = title;
};
