# ELEA — Guidelines

## Components

The design system exports these components — import them from `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4` and compose them before building anything from scratch:

`A1`, `A2`, `AnswerReview`, `B1`, `B2`, `BrandLogo`, `Button`, `C1`, `C2`, `CourseCard`, `Features`, `Hero`, `I18nProvider`, `IeltsHub`, `LanguageSwitcher`, `LessonList`, `LessonView`, `LevelBadge`, `LockedLesson`, `PathPage`, `PathSelector`, `PlacementBand`, `PlacementTest`, `Progress`, `Pronunciation`, `QuestionCard`, `ResultView`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetOverlay`, `SheetPortal`, `SheetTitle`, `SheetTrigger`, `Sheet`, `SiteFooter`, `SiteHeader`, `SpeakingConversation`, `SpeakingStudio`, `ThemeToggle`, `WritingStep`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4/styles.css` (source — preferred import)
- `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

