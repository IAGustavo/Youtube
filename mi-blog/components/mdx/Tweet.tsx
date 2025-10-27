"use client";
import { useEffect } from "react";

type Props = { id: string; theme?: "light" | "dark" };

export default function Tweet({ id, theme = "dark" }: Props) {
  useEffect(() => {
    // Load Twitter script once
    if (typeof window === "undefined") return;
    const src = "https://platform.twitter.com/widgets.js";
    if (!document.querySelector(`script[src='${src}']`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      s.charset = "utf-8";
      document.body.appendChild(s);
    } else if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, []);

  return (
    <blockquote
      className="twitter-tweet"
      data-theme={theme}
      data-dnt="true"
    >
      <a href={`https://twitter.com/x/status/${id}`}>Tweet {id}</a>
    </blockquote>
  );
}
