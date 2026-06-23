"use client";

import { useEffect, useRef, useState } from "react";

const SRC_LANDSCAPE = "/background-landscape-h.mp4";
const SRC_PORTRAIT = "/background-portrait-v.mp4";
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * VideoBackground — фиксиран кинематографичен видео фон за целия сайт.
 * -------------------------------------------------------------------------
 * Видеото НЕ се възпроизвежда автоматично. Кадърът се "скролва" заедно с
 * позицията на скрола (scroll-scrubbing): връх на страницата = начало на
 * видеото, дъно = край.
 *
 * Прецизност и липса на "зацикляне":
 *  - Видеото е презаписано all-intra (keyframe на ВСЕКИ кадър), затова seek
 *    към произволно време е точен до кадър и бърз — няма прескачане към
 *    далечен keyframe.
 *  - НЕ заливаме декодера: ново seek-ване се пуска само когато предишното е
 *    приключило (video.seeking === false) и само при реална промяна (> 1 кадър).
 *  - Леко lerp-изглаждане премахва трепкането при бърз скрол, без осезаемо
 *    забавяне.
 *  - Зачита prefers-reduced-motion (статичен кадър).
 */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // На телефон → вертикално (портретно) видео; на десктоп → хоризонтално.
  const [src, setSrc] = useState(SRC_LANDSCAPE);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const apply = () => setSrc(mq.matches ? SRC_PORTRAIT : SRC_LANDSCAPE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const FPS = 30; // видеото е 30 fps → праг ~1 кадър
    const FRAME = 1 / FPS;
    const SMOOTHING = 0.22; // 0 = няма; 1 = моментално (по-високо = по-прецизно)

    let duration = 0;
    let target = 0; // желано време според скрола
    let displayed = 0; // изгладено време
    let rafId = 0;
    let running = true;

    // На началната страница скролът е ХОРИЗОНТАЛЕН (HorizontalDeck). Тогава
    // прогресът се чете от scrollLeft на дека; иначе — от вертикалния скрол.
    const getDeck = () =>
      document.querySelector<HTMLElement>("[data-deck]");

    const computeTarget = () => {
      const deck = getDeck();
      const hMax = deck ? deck.scrollWidth - deck.clientWidth : 0;
      let progress: number;
      if (deck && hMax > 0) {
        // Десктоп: хоризонтален дек → прогрес от scrollLeft.
        progress = deck.scrollLeft / hMax;
      } else {
        // Телефон (нативен document скрол) и вътрешни страници → вертикален скрол.
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress = max > 0 ? window.scrollY / max : 0;
      }
      const clamped = Math.min(Math.max(progress, 0), 1);
      // леко отстъпваме от самия край, за да не "опре" в последния кадър
      target = clamped * Math.max(duration - FRAME, 0);
    };

    const tick = () => {
      if (!running) return;

      // изглаждане към целевия кадър
      displayed += (target - displayed) * SMOOTHING;
      if (Math.abs(target - displayed) < FRAME * 0.25) displayed = target;

      // seek само когато предишният е приключил и промяната е >= 1 кадър
      if (
        !video.seeking &&
        video.readyState >= 2 &&
        Number.isFinite(displayed) &&
        Math.abs(video.currentTime - displayed) >= FRAME
      ) {
        try {
          video.currentTime = displayed;
        } catch {
          /* seek преди готовност — игнорира се */
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      duration = video.duration || 0;
      computeTarget();
      displayed = target;
      try {
        video.currentTime = displayed;
      } catch {
        /* noop */
      }
      if (prefersReduced) return; // статичен кадър, без скрол
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (prefersReduced) return;
      computeTarget();
    };

    // "Загрява" декодера, за да рендира кадри при ръчно seek-ване.
    video.pause();
    video
      .play()
      .then(() => video.pause())
      .catch(() => {
        /* autoplay-политиката е без значение — само загряваме декодера */
      });

    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Хоризонталният дек (home) скролва ВЪТРЕ в себе си — scroll не стига до
    // window. Capture-фаза на document лови скрола от всеки елемент (дека),
    // независимо кога е монтиран.
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
    // Преинициализира scrubbing-а при смяна на източника (десктоп ↔ телефон).
  }, [src]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-carbon"
    >
      {/* Десктоп: 1280×720 landscape. Телефон: 720×1280 portrait. */}
      <video
        ref={videoRef}
        key={src}
        className="h-full w-full object-cover"
        src={src}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
