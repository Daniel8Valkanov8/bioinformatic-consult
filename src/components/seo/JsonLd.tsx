/**
 * Рендира JSON-LD structured data като <script>. Сървърен компонент → влиза в
 * пререндирания статичен HTML (видим за Google и AI краулери без JS).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify е безопасен тук (контролирани данни от речника).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
