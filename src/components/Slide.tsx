import type { CSSProperties, ReactNode } from "react";
import { Container } from "./Container";

/**
 * Slide — един кадър в хоризонталната презентация.
 * Рендира <section className="slide"> с авто-побиращ контейнер (slide-fit),
 * така че съдържанието винаги се събира във височината без вътрешен скрол.
 *
 * `reveal` (по подразбиране true) обвива съдържанието в [data-reveal] контейнер,
 * така че целият слайд се „сглобява" при влизане. За по-фин stagger подавай
 * собствени [data-reveal] елементи и сложи reveal={false}.
 */
export function Slide({
  id,
  className = "",
  containerClassName = "",
  reveal = true,
  revealDelay = 0,
  children,
}: {
  id: string;
  className?: string;
  containerClassName?: string;
  reveal?: boolean;
  revealDelay?: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`slide border-t border-line/40 ${className}`}>
      <Container className={`slide-fit ${containerClassName}`}>
        {reveal ? (
          <div
            data-reveal
            style={{ "--reveal-delay": `${revealDelay}ms` } as CSSProperties}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}
