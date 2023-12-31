import { Course } from "../../types/course.types";

import { Badge, Group, Notification } from "@mantine/core";

const CourseCardCompact = ({ course }: { course: Course }) => {
  const colors = [
    "blue",
    "cyan",
    "teal",
    "green",
    "yellow",
    "red",
    "gray",
    "pink",
    "orange",
    "indigo",
    "violet",
    "grape",
    "lime",
    "dark",
  ];
  return (
    <Notification
      title={course.title}
      radius={"md"}
      color={colors[Math.floor(Math.random() * colors.length)]}
      withCloseButton={false}
    >
      <Group>
        {course.published ? (
          <Badge color="blue">Launched</Badge>
        ) : (
          <Badge color="red">Not Launched</Badge>
        )}

        <Badge color="yellow">{course.price}$</Badge>
      </Group>
    </Notification>
  );
};

export default CourseCardCompact;
