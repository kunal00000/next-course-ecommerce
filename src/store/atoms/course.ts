import { atom } from "recoil";

import { Course } from "@/types/course.types";

export const courseState = atom<{ isLoading: boolean; course: null | Course }>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null
  }
});

export const coursesState = atom<{ isLoading: boolean; courses: Course[] }>({
  key: "coursesState",
  default: {
    isLoading: true,
    courses: []
  }
});
