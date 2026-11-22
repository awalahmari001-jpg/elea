import { useCallback, useEffect, useState } from "react";

import { addCourse, learnerStorage } from "@/lib/learner-storage";
import type { JoinableCourse } from "@/lib/lesson-access";
import type { PlacementResult } from "@/lib/placement";

/** The learner's saved test result and joined courses (read after the page loads). */
export function useLearner() {
  const [result, setResultState] = useState<PlacementResult | null>(null);
  const [courses, setCourses] = useState<JoinableCourse[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setResultState(learnerStorage.getResult());
    setCourses(learnerStorage.getCourses());
    setReady(true);
  }, []);

  const joinCourse = useCallback((slug: JoinableCourse) => {
    const next = addCourse(learnerStorage.getCourses(), slug);
    learnerStorage.setCourses(next);
    setCourses(next);
  }, []);

  const saveResult = useCallback((r: PlacementResult | null) => {
    learnerStorage.setResult(r);
    setResultState(r);
  }, []);

  const hasJoined = useCallback((slug: JoinableCourse) => courses.includes(slug), [courses]);

  return { ready, result, courses, hasJoined, joinCourse, saveResult };
}
