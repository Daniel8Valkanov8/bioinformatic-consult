/**
 * TeHierarchy — дискретна SVG схема на модела данни на TR-Viewer:
 * Ген → Транскрипт → Транспозон → Копие. Каскада с L-конектори в неоновия
 * акцент (signal за възлите, helix за листото „Копие" — верифицираният край,
 * както другаде в сайта). Декоративна: етикетите дублират текста в блок
 * „Решение", затова е aria-hidden. Цветовете идват от съществуващите токени.
 */
const NODES = [
  { x: 16, y: 24, color: "var(--color-signal)" },
  { x: 50, y: 68, color: "var(--color-signal)" },
  { x: 84, y: 112, color: "var(--color-signal)" },
  { x: 118, y: 156, color: "var(--color-helix)" },
];

export function TeHierarchy({ levels }: { levels: readonly string[] }) {
  return (
    <svg
      viewBox="0 0 232 184"
      role="img"
      aria-hidden="true"
      className="h-auto w-full max-w-[260px]"
    >
      {/* L-конектори родител → дете */}
      {NODES.slice(1).map((node, i) => {
        const p = NODES[i];
        return (
          <path
            key={`c-${i}`}
            d={`M${p.x} ${p.y} V${node.y} H${node.x}`}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Възли + етикети */}
      {NODES.map((node, i) => (
        <g key={`n-${i}`}>
          <circle cx={node.x} cy={node.y} r={9} fill={node.color} opacity={0.16} />
          <circle cx={node.x} cy={node.y} r={4.5} fill={node.color} />
          <text
            x={node.x + 14}
            y={node.y + 4}
            fontSize={12}
            className="font-mono"
            style={{ fill: "var(--color-muted)" }}
          >
            {levels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
