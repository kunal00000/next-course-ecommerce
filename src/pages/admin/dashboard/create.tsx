import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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

import { createCourse } from "@/helpers/course";
import { ErrorNotification } from "@/utils/notification";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageLink, setLink] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [published, setPublished] = useState<string | null>("true");

  const router = useRouter();

  async function onCreateCourse() {
    const data = {
      title: title,
      description: desc,
      imageLink: imageLink,
      price: price || 0,
      published: published === "true" ? true : false
    };
    console.log(data);
    try {
      const x = await createCourse(data);
      if (x.success) {
        alert("Course Created Successfully!");
        router.push(`/admin/dashboard/courses`);
      }
    } catch (error: any) {
      ErrorNotification(error.response.data.message);
      console.log(error.response.data.errors);
    }
  }

  return (
    <div>
      <Card p={"xl"} w={"50vw"} m={"auto"} shadow="lg">
        <Group position="center">
          <Text size={"xl"} color="teal" weight={"bold"}>
            Create Course Page
          </Text>
        </Group>
        <TextInput
          label="Title"
          placeholder="Learn to be a pro..."
          withAsterisk
          p={"xs"}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <Textarea
          label="Description"
          placeholder="Get to know these 5 techniques..."
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
            withAsterisk
            value={price}
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
            defaultValue={published}
            p={"xs"}
            onChange={setPublished}
          />
        </Group>
        <Group p={"sm"} position="right">
          <Link href={"/admin/dashboard/courses"} replace={true}>
            <Button variant="default">Cancel</Button>
          </Link>
          <Button variant="outline" onClick={onCreateCourse}>
            Create Course
          </Button>
        </Group>
      </Card>
    </div>
  );
}
export default CreateCourse;
