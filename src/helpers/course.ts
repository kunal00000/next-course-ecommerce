import axiosClient from "@/helpers/axiosClient";
import { CourseForm } from "@/types/course.types";

export async function getCourses() {
  const { data } = await axiosClient.get("/api/admin/courses");
  if (data.success === true) {
    return data.courses;
  }
}

export async function createCourse(course: CourseForm) {
  const { data } = await axiosClient.post("/api/admin/courses", course);
  if (data.success === true) {
    return data;
  }
}

export async function updateCourse(id: string, course: CourseForm) {
  const { data } = await axiosClient.put(`/api/admin/courses/${id}`, course);
  if (data.success === true) {
    return data;
  }
}
