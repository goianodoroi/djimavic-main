"use client";

import { useEffect, useState } from "react";

const INITIAL_TIME = 1 * 60 * 60 + 13 * 60 + 47;

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((current) => (current > 0 ? current - 1 : INITIAL_TIME));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="fixed inset-x-0 top-[30px] z-30 px-3 sm:top-5 sm:px-5">
      <div className="mx-auto flex max-w-fit items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] px-3 py-2 text-white/88 backdrop-blur-xl sm:px-6 sm:py-2">
        <div className="flex items-center justify-center gap-1 whitespace-nowrap text-center sm:gap-2.5">
          <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-white/70 sm:text-[9px]">
            Limited Time Offer
          </span>
          <span className="h-3.5 w-px bg-white/10 sm:h-4" />
          <div className="flex items-baseline gap-2 text-[1.05rem] font-medium tracking-[-0.04em] text-white sm:gap-2.5 sm:text-[1.2rem]">
            <span className="inline-flex items-baseline gap-[1px]">
              <span>{hours}</span>
              <span className="text-[0.5em] font-normal text-white/52">H</span>
            </span>
            <span className="inline-flex items-baseline gap-[1px]">
              <span>{minutes}</span>
              <span className="text-[0.5em] font-normal text-white/52">M</span>
            </span>
            <span className="inline-flex items-baseline gap-[1px]">
              <span>{seconds}</span>
              <span className="text-[0.5em] font-normal text-white/52">S</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
