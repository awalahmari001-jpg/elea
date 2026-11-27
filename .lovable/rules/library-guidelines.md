# ELEA — Guidelines

## Components

The design system exports these components — import them from `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4` and compose them before building anything from scratch:

`A1`, `A2`, `AdminTeacherStudio`, `AdvancedStudios`, `AiAssistantDrawer`, `AlphabetStudio`, `AnimatedChronologicalTimeline`, `AnimatedClassroomCast`, `AnswerReview`, `ArticulationStudio`, `B1`, `B2`, `Badge`, `BrandLogo`, `BusinessCourseHub`, `Button`, `C1`, `C2`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `Card`, `CefrMasteryStudio`, `CefrModulePathway`, `CertificatesPortal`, `CompleteGrammarHub`, `CourseAssessmentPanel`, `CourseCard`, `CourseMediaBackdrop`, `DetailedRuleGuideView`, `DropdownMenuCheckboxItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuSub`, `DropdownMenuTrigger`, `DropdownMenu`, `Features`, `FloatingEmojiBurst`, `Hero`, `HighlightedText`, `I18nProvider`, `IeltsHub`, `IeltsVocabStudio`, `Input`, `KidsAssessmentRewardsStudio`, `KidsWorldHub`, `LanguageSwitcher`, `LearningCalendarView`, `LearningDashboard`, `LessonList`, `LessonObjectivesCard`, `LessonPostEvaluation`, `LessonView`, `LetterTracingPad`, `LevelBadge`, `LockedLesson`, `MobileQuickNav`, `MockExamCenter`, `MotionFocusBadges`, `ParentTeacherView`, `PathPage`, `PathSelector`, `PlacementBand`, `PlacementTest`, `ProgressDashboard`, `Progress`, `Pronunciation`, `QuestionCard`, `ReadingBlendingStudio`, `ResourcesLibraryView`, `ResultView`, `RuleVideoPlayer`, `SelfLearningStudio`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetOverlay`, `SheetPortal`, `SheetTitle`, `SheetTrigger`, `Sheet`, `SiteFooter`, `SiteHeader`, `SkillVisualAid`, `SpeakingConversation`, `SpeakingStudio`, `SpeakingThroughWritingWorkshop`, `StepQuestionBankStudio`, `StoriesCommStudio`, `TabsContent`, `TabsList`, `TabsTrigger`, `Tabs`, `Textarea`, `ThemeToggle`, `VideosGamesStudio`, `VocabGrammarStudio`, `VowelsConsonantsStudio`, `WorkshopStudio`, `WritingStep`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4/styles.css` (source — preferred import)
- `@ws-02a46459c8787a794b56/5973be80-2c6d-4079-9f58-27f6217ac5f4/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

