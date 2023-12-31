import type { Course } from "../../types/course.types";
import Link from "next/link";

import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";

import { IconExternalLink } from "@tabler/icons-react";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Card shadow="sm" padding="md" radius="lg" w={320}>
      <Card.Section>
        <Image src={course.imageLink} height={230} withPlaceholder />
      </Card.Section>

      <Group my={"xs"}>
        <Text weight={500}>{course.title}</Text>
        {course.published ? (
          <Badge color="blue" variant="light">
            Launched
          </Badge>
        ) : (
          <Badge color="red" variant="light">
            Not Launched
          </Badge>
        )}
        <Badge color="yellow" radius={"xs"} variant="filled">
          {course.price}$
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {course.description}
      </Text>

      <Text size={"xs"} color="dimmed" mt={"md"}>
        {course.updatedAt}
      </Text>
      <Link href={`/admin/dashboard/edit/${course._id}`}>
        <Button
          rightIcon={<IconExternalLink />}
          variant="default"
          color="dark"
          fullWidth
          mt="md"
          radius="md"
        >
          Edit Course
        </Button>
      </Link>
    </Card>
  );
}
