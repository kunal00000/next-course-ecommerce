import CourseCardCompact from "./CourseCardCompact";
import { ProgressCard } from "./ProgressCard";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { Flex, SimpleGrid, Stack, Text } from "@mantine/core";

import { getCourses } from "@/helpers/course";
import { coursesState } from "@/store/atoms/course";

const Overview = () => {
  const [courses, setCourses] = useRecoilState(coursesState);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses({ isLoading: false, courses: data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Text size={"xl"} px={"xl"} weight={"bolder"}>
        Overview
      </Text>
      <Flex m={"xl"} columnGap={"5vw"} className="relative">
        <Stack w={"35vw"} m={"xl"}>
          <Text size={"xl"} weight={"bold"}>
            My Courses
          </Text>
          <SimpleGrid cols={1}>
            {courses.courses.length > 0
              ? courses.courses.map((course) => {
                  return <CourseCardCompact key={course._id} course={course} />;
                })
              : ""}
          </SimpleGrid>
        </Stack>
        <Stack w={"35vw"} m={"xl"} className="fixed left-[67vw] ">
          <Text size={"xl"} weight={"bold"}>
            Progress
          </Text>
          <ProgressCard courses={courses.courses} />
        </Stack>
      </Flex>
    </div>
  );
};

export default Overview;
