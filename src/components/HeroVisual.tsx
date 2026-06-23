/**
 * HeroVisual — СИГНАТУРНИЯТ елемент на началната страница.
 * --------------------------------------------------------------------------
 * Идея: „детерминизъм, направен видим". Целият оферта на консултанта е
 * анализ, който можеш да ВЪЗПРОИЗВЕДЕШ и ЗАЩИТИШ. Затова визуалът не е
 * декоративна ДНК спирала, а provenance отчет: един и същ pipeline, пуснат
 * два пъти върху едни и същи данни, дава един и същ контролен сбор (sha256)
 * → identical · защитим пред одитор.
 *
 * Долу: реална нуклеотидна секвенция в base-call цветовете (A/T/G/C) —
 * единственото място, където се показва пълният ATGC код.
 *
 * Сървърен компонент: единственото движение е CSS скенлайн (.prov-scan),
 * който зачита prefers-reduced-motion.
 */

const BASE_COLOR: Record<string, string> = {
  A: "text-base-a",
  T: "text-base-t",
  G: "text-base-g",
  C: "text-base-c",
};

// Фиксирана секвенция → детерминирани цветове (none е случайно).
const SEQUENCE = "ATGCAAGTCCGTTAGCATGCTTACG".split("");

// Един и същ контролен сбор за двата пробега = възпроизводимост.
const CHECKSUM = "a3f1·9c20·ee47";

function ProvRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="font-mono text-xs text-faint">{label}</span>
      <span className="flex items-center gap-2 font-mono text-xs text-muted">
        sha256 {CHECKSUM}
        <span aria-hidden="true" className="text-helix">
          ✓
        </span>
      </span>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-md">
      {/* Меко дуо-тон свечение зад панела */}
      <div className="bio-glow pointer-events-none absolute -inset-6" />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-sm">
        {/* Скенлайн — минава веднъж при зареждане (намек за инструментален отчет) */}
        <div
          aria-hidden="true"
          className="prov-scan pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-signal/15 to-transparent"
        />

        {/* Заглавна лента на панела */}
        <div className="flex items-center gap-2 border-b border-line/70 px-5 py-3">
          <span className="h-2 w-2 rounded-full bg-helix shadow-[0_0_10px_2px_rgba(63,209,126,0.55)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            provenance · pipeline run
          </span>
        </div>

        {/* Двата пробега + резултат */}
        <div className="px-5 py-4">
          <ProvRow label="run #1" />
          <div className="border-t border-line/50" />
          <ProvRow label="run #2" />

          <div className="mt-3 flex items-center justify-between rounded-lg border border-helix/30 bg-helix/5 px-3 py-2.5">
            <span className="font-mono text-xs text-helix">identical</span>
            <span className="text-xs text-muted">възпроизводимо · защитимо</span>
          </div>
        </div>

        {/* base-call секвенция — единственото място с пълния ATGC код */}
        <div className="border-t border-line/70 px-5 py-3">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            base call
          </p>
          <p
            className="font-mono text-sm leading-none tracking-[0.18em]"
            aria-hidden="true"
          >
            {SEQUENCE.map((nt, i) => (
              <span key={i} className={BASE_COLOR[nt]}>
                {nt}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
