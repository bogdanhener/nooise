"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const SLOW_THRESHOLD = 400; // ms — if nav takes longer than this, show the full loader

export default function RouteLoader() {
  const pathname = usePathname();
  // Bar state — for ALL navigations
  const [barActive, setBarActive] = useState(false);
  const [barProgress, setBarProgress] = useState(0);
  // Full loader state — only when nav exceeds SLOW_THRESHOLD
  const [loaderActive, setLoaderActive] = useState(false);
  const [loaderFading, setLoaderFading] = useState(false);

  const firstRender = useRef(true);
  const timersRef = useRef([]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Clear any in-flight timers
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    // Start the thin progress bar immediately
    setBarActive(true);
    setBarProgress(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBarProgress(80));
    });

    const t = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    };

    // If nav is still in progress after threshold, show the full loader
    t(() => {
      setLoaderActive(true);
      setLoaderFading(false);
    }, SLOW_THRESHOLD);

    // Bar completes
    t(() => setBarProgress(100), 350);
    t(() => {
      setBarActive(false);
      setBarProgress(0);
    }, 650);

    // Full loader fades out shortly after the bar
    t(() => setLoaderFading(true), 500);
    t(() => {
      setLoaderActive(false);
      setLoaderFading(false);
    }, 1100);

    return () => {
      timersRef.current.forEach((tid) => clearTimeout(tid));
      timersRef.current = [];
    };
  }, [pathname]);

  return (
    <>
      {/* Thin progress bar — always shown on nav */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: barActive ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barProgress}%`,
            background: "var(--soft-dark)",
            transition: barProgress === 0 ? "none" : "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        />
      </div>

      {/* Full loader — only on slow navigations */}
      {loaderActive && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--paper)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9998,
            pointerEvents: "none",
            opacity: loaderFading ? 0 : 1,
            transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          <style>{`
            @keyframes loaderFadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes wordmarkBreathe {
              0%, 100% { opacity: 0.5; }
              50%       { opacity: 1; }
            }
            @keyframes scanLine {
              0%   { transform: translateX(-110%); }
              100% { transform: translateX(110%); }
            }
            @keyframes scanGlow {
              0%, 100% { opacity: 0; }
              20%      { opacity: 1; }
              80%      { opacity: 1; }
            }
            @keyframes labelPulse {
              0%, 100% { opacity: 0.4; }
              50%       { opacity: 1; }
            }
            .loader-wrap {
              animation: loaderFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 28px;
            }
            .wordmark-stage {
              position: relative;
              width: 180px;
              overflow: hidden;
              padding: 12px 0;
            }
            .wordmark-img {
              width: 100%;
              display: block;
              animation: wordmarkBreathe 2.2s ease-in-out infinite;
            }
            .scan-line {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              width: 32%;
              pointer-events: none;
              background: linear-gradient(90deg,
                rgba(10,10,10,0) 0%,
                rgba(10,10,10,0.04) 35%,
                rgba(10,10,10,0.10) 50%,
                rgba(10,10,10,0.04) 65%,
                rgba(10,10,10,0) 100%);
              animation: scanLine 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite,
                         scanGlow 2.2s ease-in-out infinite;
              mix-blend-mode: multiply;
            }
            .loader-label {
              font-family: var(--sans);
              font-size: 10px;
              font-weight: 500;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              color: var(--ink-mute);
              animation: labelPulse 2.2s ease-in-out infinite;
            }
          `}</style>

          <div className="loader-wrap">
            <div className="wordmark-stage">
              <img className="wordmark-img" src="/nooise.svg" alt="nooise" />
              <div className="scan-line" />
            </div>
            <span className="loader-label">Loading</span>
          </div>
        </div>
      )}
    </>
  );
}