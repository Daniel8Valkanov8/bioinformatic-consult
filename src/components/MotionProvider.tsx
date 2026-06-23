"use client";

import { useEffect } from "react";

/**
 * MotionProvider — мозъкът на презентационната хореография на началната страница.
 * --------------------------------------------------------------------------
 * Прави три неща, всичките евтини (без анимационни библиотеки):
 *  1. Маркира <html> с `reveal-root` + `snap`, които включват CSS ефектите
 *     (виж globals.css). Прогресивно подобрение: без JS нищо не се крие.
 *  2. Един IntersectionObserver следи всички [data-reveal] елементи и добавя
 *     `.is-in`, когато влязат в кадър — еднократно (после спира да ги наблюдава).
 *  3. Изчиства класовете при размонтиране (за да не „заразява" вътрешните
 *     страници, които не ползват тази хореография).
 *
 * Зачита prefers-reduced-motion: CSS изключва snap и анимациите; тук просто
 * маркираме всичко като влязло веднага, за да няма скрито съдържание.
 */
export function MotionProvider() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-root");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-in"));
      return () => root.classList.remove("reveal-root");
    }

    // Преиграва се при ВСЯКО влизане в слайда: добавя `is-in`, когато елементът
    // се вижда, и я маха, когато слайдът напълно напусне кадъра — така всяко
    // прескачане към секция изпълнява хореографията наново (усещане за слайдове).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
            entry.target.classList.add("is-in");
          } else if (entry.intersectionRatio === 0) {
            entry.target.classList.remove("is-in");
          }
        }
      },
      { threshold: [0, 0.12, 0.5] },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-root", "snap");
    };
  }, []);

  return null;
}
