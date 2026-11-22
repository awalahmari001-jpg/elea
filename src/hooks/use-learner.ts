import { useCallback, useEffect, useState } from "react";

import type { CourseSlug } from "@/content/courses";
import { learnerStorage } from "@/lib/learner-storage";
import type { PlacementResult } from "@/lib/placement";

/** The learner's saved test result and joined course (read after the page loads). */
export function useLearner() {
  const [result, setResultState] = useState<PlacementResult | null>(null);
  const [course, setCourseState] = useState<CourseSlug | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setResultState(learnerStorage.getResult());
    setCourseState(learnerStorage.getCourse());
    setReady(true);
  }, []);

  const joinCourse = useCallback((slug: CourseSlug) => {
    learnerStorage.setCourse(slug);
    setCourseState(slug);
  }, []);

  const saveResult = useCallback((r: PlacementResult | null) => {
    learnerStorage.setResult(r);
    setResultState(r);
  }, []);

  return { ready, result, course, joinCourse, saveResult };
}
