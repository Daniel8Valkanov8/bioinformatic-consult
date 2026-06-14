# Даниел Вълканов — Биоинформатичен консултант

Професионален сайт-фуния за биоинформатичен консултант. Тъмен, премиум дизайн;
едностранична начална фуния + отделни страници за дълбочина и SEO.

## Технологии

- **Next.js 16** (App Router) със **статичен експорт** (`output: 'export'`)
- **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **Netlify Forms** за контактната форма (без бекенд)
- **three / @react-three/fiber / @react-three/drei** — инсталирани, готови за
  бъдеща 3D hero визуализация (засега неизползвани)

## Структура

- `src/content/bg.ts` — **целият видим текст** (централизиран за бъдещ i18n)
- `src/lib/site.ts` — контакти, навигация, базов URL
- `src/components/` — споделени компоненти; `home/` — секциите на началната
- `src/components/HeroVisual.tsx` — **изолиран слот** за бъдещо 3D
- `src/app/` — страници: `/`, `/uslugi`, `/portfolio`, `/za-men`, `/blog`, `/kontakt`

## Локално стартиране

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build (статичен експорт)

```bash
npm run build    # генерира статичния сайт в out/
```

## Деплой (Netlify)

Конфигурацията е в `netlify.toml` (`build = npm run build`, `publish = out`).
Netlify Forms се разпознава автоматично чрез `public/__forms.html` и формата.

## Бъдещо 3D (фаза 2)

Сменя се **само вътрешността** на `HeroVisual`. R3F компонентите трябва да се
зареждат с `next/dynamic` и `{ ssr: false }` заради статичния експорт.

## Бъдещ английски (i18n)

Създай `src/content/en.ts` с идентична структура на `bg.ts` и превключвай по
locale — компонентите не съдържат твърдо закодиран текст.
