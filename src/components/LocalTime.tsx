"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function LocalTime() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: site.timeZone,
        }) + " · " + site.timeZone.split("/")[1].replace("_", " ")
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
