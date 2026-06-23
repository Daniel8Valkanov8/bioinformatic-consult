"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "./MotionProvider";
import { SectionRail, type RailSlide } from "./SectionRail";
import { HorizontalDeck } from "./HorizontalDeck";

/**
 * DeckShell — обвивка за хоризонтална презентация на коя да е страница.
 * Събира хореографията (MotionProvider), навигатора (SectionRail) и самия
 * хоризонтален дек с 3D преход (HorizontalDeck) на едно място.
 *
 * Подава се списък със слайдовете (id + етикет за рейла); децата са самите
 * <section className="slide"> (обикновено през компонента <Slide/>).
 */
export function DeckShell({
  slides,
  children,
}: {
  slides: readonly RailSlide[];
  children: ReactNode;
}) {
  return (
    <>
      <MotionProvider />
      <SectionRail slides={slides} />
      <HorizontalDeck>{children}</HorizontalDeck>
    </>
  );
}
