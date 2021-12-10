## README ENGISH  (read Russian below)
#### 1. Project start: `yarn && yarn start`
#### 2. Project structure:
- `api` - in future here will be everything for work with API
- `components` - base components which will be used by both pages and each other
- `pages` - components which print content of pages
- `contants` - constants such as themes and colours

IDE settings are stored in `.env`

#### 3. Styles
We use library `emotion`, because it is way lighter than analogs.
Example of using them is in `Button.tsx`. Styles can be used only in `components` and only for base components.
For positioning of components according to position of the parent and/or pages, please use the net which will be better. (No `bootstrap`).

#### 4. Forms
Use `react-hook-form`

#### 5. i18n
Dont use external libraries for functions in a few lines of code


### IPORTANT
1. Do not use `@ts-ignore` and directives like that.
2. First thing we do is doing the compontents such as "Button", `Tabs`, `Pagination`, `MainMenu`, `DropdownMenu`, `Accordion`, `SocialLink` and others.

## README RUSSIAN
#### 1. Запуск проекта: `yarn && yarn start`
#### 2. Структура проекта
- `api` - в будущем тут будет все необходимое для работы с АПИ
- `components` - базовые компоненты, которые могут быть и будут переиспользованы как страницами, так и  друг другом
- `pages` - компоненты, которые отрисовывают содержимое страниц
- `contants` - константы, такие как темы и цвета

Переменные среды сохраняются в `.env`

#### 3. Стили
Использована библиотека `emotion`, поскольку она на порядок компактнее своих сородичей. Пример использования в файле `Button.tsx`. Стили могут быть использованы только в `components` и только для базовых компонентов. Для позиционирования компонентов относительно родителя и/или страницы использовать сетку, что будет реализована позже (никаких `bootstrap`).

#### 4. Формы
Использовать `react-hook-form`

#### 5. i18n
Не использовать сторонние библиотеки для функции в несколько строк

### ВАЖНО
1. Не использовать `@ts-ignore` и подобные директивы.
2. В первую очередь следует реализовать компоненты, такие как `Button` (его нужно доработать), `Tabs`, `Pagination`, `MainMenu`, `DropdownMenu`, `Accordion`, `SocialLink` и т.д.
