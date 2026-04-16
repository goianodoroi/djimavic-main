"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";

const STREAM_URL =
  "https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/46bcd6a7f00631e33a04b99d61a262b8/manifest/video.m3u8";

export function ComparisonVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current || playerRef.current) {
      return;
    }

    const player = videojs(videoRef.current, {
      autoplay: true,
      controls: false,
      fill: true,
      loop: true,
      muted: true,
      preload: "auto",
      sources: [
        {
          src: STREAM_URL,
          type: "application/x-mpegURL",
        },
      ],
      userActions: {
        click: false,
        doubleClick: false,
        hotkeys: false,
      },
    });

    player.ready(() => {
      player.muted(true);
      const playback = player.play();

      playback?.catch(() => {
        // Browsers can defer autoplay until the player is visible.
      });
    });

    playerRef.current = player;

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="relative mx-auto h-[min(56.25vw,427.5px)] w-full overflow-hidden rounded-[28px] bg-[#090909]">
      <div data-vjs-player className="comparison-video-shell absolute inset-0">
        <video
          ref={videoRef}
          className="video-js vjs-fill comparison-video-player"
          muted
          playsInline
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/76 via-45% to-transparent"
      />
    </div>
  );
}
