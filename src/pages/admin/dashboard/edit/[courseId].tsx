import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
  Textarea
} from "@mantine/core";

import { updateCourse } from "@/helpers/course";
import { coursesState } from "@/store/atoms/course";
import { Course, CourseForm } from "@/types/course.types";
import { ErrorNotification } from "@/utils/notification";

function EditCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageLink, setLink] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [published, setPublished] = useState<string | null>("true");

  const router = useRouter();
  const courses = useRecoilValue(coursesState);

  useEffect(() => {
    if (!courses.isLoading && courses.courses.length > 0) {
      const currCourse = courses["courses"].find(
        (course: Course) => course._id === router.query.courseId
      );

      if (!currCourse) {
        ErrorNotification("Course not found!");
        router.push("/admin/dashboard/courses");
      } else {
        setTitle(currCourse.title);
        setDesc(currCourse.description);
        setLink(currCourse.imageLink);
        setPrice(currCourse.price);
        setPublished(currCourse.published ? "true" : "false");
      }
    }
  }, [courses, router.query.courseId]);

  async function onEditCourse() {
    const edittedCourse = {
      title: title,
      description: desc,
      imageLink: imageLink,
      price: price,
      published: published === "true" ? true : false
    } as CourseForm;
    console.log(edittedCourse);
    try {
      await updateCourse(router.query.courseId as string, edittedCourse);
      router.push("/admin/dashboard/courses");
    } catch (error) {
      console.log(error);
    }
  }

  if (courses.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card p={"xl"} w={"50vw"} m={"auto"} shadow="lg">
        <Group position="center">
          <Text size={"xl"} color="teal" weight={"bold"}>
            Edit Course Page
          </Text>
        </Group>
        <TextInput
          label="Title"
          placeholder="Learn to be a pro..."
          value={title}
          withAsterisk
          p={"xs"}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <Textarea
          label="Description"
          placeholder="Get to know these 5 techniques..."
          value={desc}
          withAsterisk
          autosize
          minRows={2}
          maxRows={4}
          p={"xs"}
          onChange={(e) => {
            setDesc(e.currentTarget.value);
          }}
        />
        <TextInput
          label="Image Link"
          placeholder="image link here..."
          value={imageLink}
          withAsterisk
          p={"xs"}
          onChange={(e) => {
            setLink(e.currentTarget.value);
          }}
        />
        <Group position="apart">
          <NumberInput
            label="Price (in $)"
            placeholder="best price you can offer..."
            value={price}
            withAsterisk
            min={0}
            w={"50%"}
            p={"xs"}
            onChange={setPrice}
          />
          <Select
            label="Publish"
            data={[
              { value: "true", label: "Publish Now" },
              { value: "false", label: "Publish Later" }
            ]}
            value={published}
            p={"xs"}
            onChange={setPublished}
          />
        </Group>
        <Group p={"sm"} position="right">
          <Link href={"/admin/dashboard/courses"} replace={true}>
            <Button variant="default">Cancel</Button>
          </Link>
          <Button variant="outline" onClick={onEditCourse}>
            Edit Course
          </Button>
        </Group>
      </Card>
    </div>
  );
}
export default EditCourse;
