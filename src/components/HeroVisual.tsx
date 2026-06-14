/**
 * HeroVisual — ИЗОЛИРАН СЛОТ за hero визуализацията.
 * --------------------------------------------------------------------------
 * Засега показва статичен градиент + финен био-мотив (решетка/глоу).
 *
 * ГОТОВНОСТ ЗА 3D (фаза 2): когато се добави Three.js / R3F сцена, СМЕНЯ СЕ
 * САМО ВЪТРЕШНОСТТА на този компонент — останалият сайт остава непроменен.
 * R3F компонентът ТРЯБВА да се зарежда с next/dynamic и { ssr: false },
 * защото проектът е статичен експорт (output: 'export'). Пример:
 *
 *   // const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
 *   // ... и вътре в контейнера по-долу: <HeroScene />
 *
 * Контейнерът (aspect ratio, позициониране) остава същият, така че смяната
 * на статичното съдържание с 3D е минимална промяна.
 */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface"
    >
      {/* Базов градиент (графит → лек циан) */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-2 via-carbon to-carbon" />

      {/* Финна био-решетка */}
      <div className="bio-grid absolute inset-0" />

      {/* Меко био-свечение */}
      <div className="bio-glow absolute inset-0" />

      {/* Дискретен ДНК/мрежов мотив (SVG плейсхолдър до 3D сцената) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-70"
        fill="none"
      >
        {/* Две ДНК нишки */}
        <path
          d="M70 10 C 110 50, 110 50, 70 90 C 30 130, 30 130, 70 170 C 90 188, 90 188, 70 198"
          stroke="rgba(79,224,196,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M130 10 C 90 50, 90 50, 130 90 C 170 130, 170 130, 130 170 C 110 188, 110 188, 130 198"
          stroke="rgba(170,179,191,0.4)"
          strokeWidth="1.5"
        />
        {/* "Стъпала" между нишките */}
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 14 + i * 20;
          return (
            <line
              key={i}
              x1={i % 2 === 0 ? 78 : 86}
              y1={y}
              x2={i % 2 === 0 ? 122 : 114}
              y2={y}
              stroke="rgba(79,224,196,0.25)"
              strokeWidth="1.2"
            />
          );
        })}
        {/* Възли (микробен/мрежов мотив) */}
        {[
          [70, 10],
          [70, 90],
          [70, 170],
          [130, 10],
          [130, 90],
          [130, 170],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(79,224,196,0.7)" />
        ))}
      </svg>
    </div>
  );
}
