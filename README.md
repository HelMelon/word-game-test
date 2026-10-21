# Word game — словесная игра

Мини-игра со словами: буквы по кругу, три уровня, экран победы.
Собери как можно больше слов из доступных букв.

**Играть:** https://helmelon.github.io/word-game-test/

## Стек

SvelteKit + `@sveltejs/adapter-static`, Vite. Сборка кладётся на GitHub Pages.

## Структура

```
src/routes/            # +page.svelte, +page.server.js
src/lib/boards/        # LetterCircle, Popup
src/lib/pages/         # App, GamePage, WinPage
src/lib/assets/data/   # level-1..3.json — словари уровней
src/utils/             # collectLetters, drawCircle, levelsCounter
```

## Запуск

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # статическая сборка в build/
```

Чтобы добавить уровень — положи новый словарь в `src/lib/assets/data/` и подключи его
в счётчике уровней.
