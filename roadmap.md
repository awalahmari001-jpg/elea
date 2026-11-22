# Roadmap — Easy Learning English

## Phase 1 (current)
- [x] Project setup, folder structure, design system
- [x] English/Arabic switcher with right-to-left support
- [x] Navigation bar, footer, home page with path selector
- [x] Use the academy logo + name "Easy Learning English" (header, footer, favicon)

## Later phases (wait for user approval)
- [ ] Future phases: expand curricula, flashcards, AI writing coach, progress dashboard and accounts (await approval)

## Level test & courses (requested 21 Nov)
- [x] "Test your level" icon/button in header + home
- [x] 60-question CEFR placement test (10 per level A1–C2) with result
- [x] Six level courses (A1, A2, B1, B2, C1, C2) learners can choose/join
- [x] Separate Speaking course (alongside the A1–C2 courses)
- [x] AI-assessed placement: short writing sample + score analysed by AI, results page shows recommended course
- [x] Every placement question has its correct answer + explanation (why it is right, CEFR-based), shown in an answer review after the test
- [x] Question bank of 60 questions per level (360 total), each with answer + explanation; every test draws 10 random questions per level

## Open
- [ ] Rate-limit the AI level-test endpoint (needs Lovable Cloud / accounts for durable limits)
- [ ] Save results and joined courses to learner accounts (accounts phase)

## Lessons and speaking (requested 22 Nov)
- [x] Add 18 A1–C2 lessons with explanations, examples and practice
- [x] Add 10 IELTS lessons for all four skills and Band 7 techniques
- [x] Add browser ASR pronunciation practice with honest recognition feedback
- [x] Add 40 interactive speaking situations with 120 contextual turns
- [x] Test lesson checking, audio playback, writing review, speaking interactions, Arabic and small screens; ASR UI tested with injected transcripts and real permission denial, not live speech recognition

## Kids & Adults lessons + course paywall (requested 22 Nov)
- [x] Kids lessons covering all four skills + grammar, level-appropriate (beginner/intermediate/advanced)
- [x] Adults lessons covering all four skills + grammar, level-appropriate (beginner/intermediate/advanced)
- [x] First lesson of each course free for everyone; remaining lessons locked until the learner joins the course (applies to A1–C2, Kids, Adults, IELTS and Speaking)
- [ ] Enable payments (needs Lovable Cloud + provider eligibility check + user confirmation) and charge tuition per level/course — joining is currently free
- [ ] Persist "joined/paid" state to learner accounts when accounts exist (currently localStorage)
