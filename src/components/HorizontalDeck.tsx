"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * HorizontalDeck — превръща началната страница в хоризонтална презентация.
 * --------------------------------------------------------------------------
 * Поведение:
 *  • Всяка .slide е цял екран; колелцето/клавишите прескачат ЦЯЛ слайд наведнъж
 *    (минимално скролване → следваща секция, без междинно положение).
 *  • Дълъг слайд (напр. Доверие/Контакт) първо се скролва вертикално отвътре;
 *    чак когато стигне ръба, следващото движение сменя слайда.
 *  • Тъч (мобилно) ползва нативния хоризонтален snap — не го прихващаме.
 *  • Клавиатура: ← → / PageUp PageDown / Home End. Стрелките се пропускат,
 *    когато фокусът е във форма.
 *  • Зачита prefers-reduced-motion (моментален вместо плавен преход).
 *
 * Заключва вертикалната страница и скрива footer-а през класа `home-deck`
 * на <html> (виж globals.css); чисти се при размонтиране → вътрешните
 * страници остават нормални.
 */
export function HorizontalDeck({ children }: { children: ReactNode }) {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const root = document.documentElement;
    root.classList.add("home-deck");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    // Телефон: декът е ВЕРТИКАЛЕН (виж globals.css). Логиката се сменя по ос.
    const isVertical = () => window.matchMedia("(max-width: 767px)").matches;

    const slides = () => deck.querySelectorAll<HTMLElement>(".slide");
    const slideCount = () => slides().length;
    // Телефон: нативен document скрол → индексът е от window.scrollY.
    // Десктоп: хоризонтален дек → от scrollLeft.
    const indexNow = () =>
      isVertical()
        ? Math.round(window.scrollY / Math.max(window.innerHeight - 64, 1))
        : Math.round(deck.scrollLeft / Math.max(deck.clientWidth, 1));

    // Лек 3D преход (само десктоп/хоризонтално): всеки слайд леко се завърта
    // (rotateY) и отива в дълбочина спрямо отдалечеността си от центъра. При
    // покой активният е плосък; ефектът се вижда основно ПО ВРЕМЕ на смяната.
    const apply3D = () => {
      if (prefersReduced) return;
      if (isVertical()) {
        // На телефон няма 3D — изчистваме евентуални остатъчни трансформации.
        deck.querySelectorAll<HTMLElement>(".slide").forEach((slide) => {
          slide.style.transform = "";
          slide.style.opacity = "";
        });
        return;
      }
      const w = deck.clientWidth || 1;
      const center = deck.scrollLeft + w / 2;
      deck.querySelectorAll<HTMLElement>(".slide").forEach((slide, i) => {
        const off = Math.max(-1, Math.min(1, (i * w + w / 2 - center) / w));
        const a = Math.abs(off);
        slide.style.transform = `rotateY(${off * -15}deg) translateZ(${-a * 130}px)`;
        slide.style.opacity = String(1 - a * 0.42);
      });
    };

    // Авто-побиране: свива съдържанието на всеки слайд точно колкото да се
    // събере във височината (вкл. при OS мащабиране 125/150%). Ползва `zoom`,
    // защото намалява реалната височина → без вътрешен скрол. Никога не уголемява.
    const fitSlides = () => {
      // На телефон е по-тясно (една колона) → допускаме по-силно свиване.
      const floor = isVertical() ? 0.55 : 0.7;
      deck.querySelectorAll<HTMLElement>(".slide").forEach((slide) => {
        const fit = slide.querySelector<HTMLElement>(".slide-fit");
        if (!fit) return;
        fit.style.zoom = "1"; // нулиране, за да измерим естествената височина
        const cs = getComputedStyle(slide);
        const avail =
          slide.clientHeight -
          parseFloat(cs.paddingTop) -
          parseFloat(cs.paddingBottom);
        const needed = fit.scrollHeight;
        const scale = needed > avail ? Math.max(avail / needed, floor) : 1;
        fit.style.zoom = scale < 1 ? String(scale) : "";
      });
    };

    const goTo = (i: number) => {
      const max = slideCount() - 1;
      const idx = Math.max(0, Math.min(max, i));
      if (isVertical()) {
        // Телефон: скролваме самия документ до началото на слайда
        // (scrollIntoView зачита scroll-padding-top → изчиства навбара).
        slides()[idx]?.scrollIntoView({ behavior, block: "start" });
      } else {
        deck.scrollTo({ left: idx * deck.clientWidth, behavior });
      }
    };

    // Една стъпка на жест — заключва, докато преходът приключи.
    let locked = false;

    const onWheel = (e: WheelEvent) => {
      // На телефон/вертикален дек оставяме нативния y-mandatory snap.
      if (isVertical()) return;
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const dir = Math.sign(delta);
      if (dir === 0) return;

      // Позволи вътрешен вертикален скрол на дълъг слайд, докато стигне ръба.
      const active = deck.querySelectorAll<HTMLElement>(".slide")[indexNow()];
      if (active && active.scrollHeight > active.clientHeight + 1) {
        const atTop = active.scrollTop <= 0;
        const atBottom =
          active.scrollTop + active.clientHeight >= active.scrollHeight - 1;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          return; // нативен вертикален скрол вътре в слайда
        }
      }

      e.preventDefault();
      if (locked || Math.abs(delta) < 6) return;
      locked = true;
      goTo(indexNow() + dir);
      window.setTimeout(
        () => {
          locked = false;
        },
        prefersReduced ? 60 : 680,
      );
    };

    const isFormField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);

    const onKey = (e: KeyboardEvent) => {
      if (isFormField(e.target)) return;
      const next = ["ArrowRight", "ArrowDown", "PageDown"];
      const prev = ["ArrowLeft", "ArrowUp", "PageUp"];
      if (next.includes(e.key)) {
        e.preventDefault();
        goTo(indexNow() + 1);
      } else if (prev.includes(e.key)) {
        e.preventDefault();
        goTo(indexNow() - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slideCount() - 1);
      }
    };

    // 3D се преизчислява при всеки скрол кадър (евтино: само transform/opacity).
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          apply3D();
        });
    };

    // Държи активния слайд подравнен + преизчислява побирането при resize.
    const onResize = () => {
      fitSlides();
      apply3D();
      goTo(indexNow());
    };

    // Anchor връзки (#services, #contact …) отварят съответния слайд.
    const goToHash = (behavior: ScrollBehavior) => {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target || !target.classList.contains("slide")) return;
      if (isVertical()) {
        // Моментално на телефон — плавният скрол се „бори" с mandatory snap.
        target.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        const idx = Array.from(slides()).indexOf(target);
        if (idx >= 0) deck.scrollTo({ left: idx * deck.clientWidth, behavior });
      }
    };
    const onHashChange = () => goToHash(behavior);

    deck.addEventListener("wheel", onWheel, { passive: false });
    deck.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);

    // Първоначално побиране + позиция по хеша (моментално, без анимация).
    fitSlides();
    apply3D();
    // Отлагаме позиционирането по хеша, за да е след като layout-ът и
    // scroll-snap са готови (иначе mandatory snap връща в началото на телефон).
    goToHash("auto");
    requestAnimationFrame(() => goToHash("auto"));
    const hashTimer = window.setTimeout(() => goToHash("auto"), 120);
    // Шрифтовете променят височините — преизчисли, щом се заредят.
    document.fonts?.ready
      .then(() => {
        fitSlides();
        apply3D();
      })
      .catch(() => {});

    return () => {
      deck.removeEventListener("wheel", onWheel);
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(hashTimer);
      root.classList.remove("home-deck");
    };
  }, []);

  return (
    <div ref={deckRef} data-deck className="deck">
      {children}
    </div>
  );
}
