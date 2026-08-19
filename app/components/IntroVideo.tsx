"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const playVideo = async () => {
    if (!videoRef.current) return;
    try {
      setStarted(true);
      await videoRef.current.play();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnd = () => {
    setHide(true);
    setTimeout(() => {
      setShow(false);
    }, 700);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ width: "100vw", height: "100%" }}
    >
      <video
        ref={videoRef}
        poster="/assets/hero_video3.png"
        playsInline
        webkit-playsinline="true"
        muted
        preload="auto"
        onEnded={handleEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      >
        <source src="/assets/hero_video.mp4" type="video/mp4" />
      </video>

      {!started && (
        <button
          onClick={playVideo}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-20 h-20 md:w-28 md:h-28 rounded-full   
          text-black text-4xl hover:scale-110 transition cursor-pointer"
        >
         
        </button>
      )}
    </div>
  );
}