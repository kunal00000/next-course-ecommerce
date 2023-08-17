import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Center, Group, Image, Text } from "@mantine/core";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <nav className="flex flex-row justify-between items-center my-[1vw] px-[5vw] h-16 z-10">
        <div className="flex flex-row xs:text-lg md:text-3xl ">
          <strong>Course</strong>
          <span className="font-light">Hub</span>
        </div>

        <Group spacing={"-sm"}>
          <Button
            variant="subtle"
            color="cyan"
            onClick={() => router.push("/user/signup")}
          >
            User
          </Button>
          <Button
            variant="outline"
            color="cyan"
            onClick={() => router.push("/admin/signup")}
          >
            Creator
          </Button>
        </Group>
      </nav>

      <Center p={"5vw"}>
        <div className="flex xs:flex-wrap-reverse flex-1 justify-around items-center xs:w-[90vw] md:w-full">
          <div>
            <Text fw={700} className="xs:text-2xl md:text-5xl text-bold">
              Learn something
              <br />
              new everyday.
            </Text>
            <Text className="my-[2vw]">
              Let's learn new course and Gain more skills
              <br />
              all using just CourseHub.
            </Text>
            <Group spacing="sm" my={"2vw"}>
              <Button
                variant="outline"
                color="teal"
                onClick={() => router.push("/user/signup")}
              >
                Start as user
              </Button>
              <Button
                variant="light"
                onClick={() => router.push("/user/login")}
              >
                Explore Courses
              </Button>
            </Group>
          </div>

          <div className="relative my-6">
            <Image
              fit="cover"
              src={
                "https://otus.com/wp-content/uploads/2022/06/Homepage-Header.png"
              }
              alt="CourseHub"
              className="md:max-w-[35vw]"
              caption="Over 100K+ students have leveled up their learnings and skills using CourseHub."
            />
          </div>
        </div>
      </Center>

      <div className="w-[70%] mx-auto my-2 rounded-full border-2 border-amber-400 shadow-yellow-300" />

      <Center p={"5vw"}>
        <div className="flex xs:flex-wrap flex-1 justify-around items-center xs:w-[90vw] md:w-full">
          <div className="relative my-6">
            <Image
              fit="cover"
              src={
                "https://www.engagedigital.ai/sites/default/files/2021-12/radisys_cpaas_teacher_diagram_hero_v2.png"
              }
              className="md:max-w-[35vw]"
              alt="CourseHub"
              caption="Over 100K+ creators have launched their online teaching businesses
              using CourseHub."
            />
          </div>
          <div>
            <Text fw={700} className="xs:text-2xl md:text-5xl text-bold">
              Build supercharged <br />
              online courses
            </Text>
            <Text className="my-[2vw]">
              Create custom courses, get access to huge student community,{" "}
              <br />
              impact the lives of lakhs — all just by using CourseHub.
            </Text>
            <Group spacing="sm" my={"2vw"}>
              <Button
                variant="outline"
                color="teal"
                onClick={() => router.push("/admin/signup")}
              >
                Start as creator
              </Button>
              <Button
                variant="light"
                onClick={() => router.push("/admin/login")}
              >
                Launch a course
              </Button>
            </Group>
          </div>
        </div>
      </Center>

      <footer className="w-full flex flex-row justify-center items-center border-y-[0.1rem] border-gray-200 my-[1vw] px-[5vw] h-16 xs:text-xs">
        <Link
          href="https://github.com/kunal00000"
          target="_blank"
          className="underline"
        >
          Made by Kunal Verma. All rights reserved
        </Link>
      </footer>
    </div>
  );
}
