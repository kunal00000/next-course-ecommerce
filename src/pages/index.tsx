import { useRouter } from "next/router";

import { Button, Center, Group, Image, Text } from "@mantine/core";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <nav className="flex flex-row justify-between items-center my-[1vw] mx-[5vw] h-16 z-10">
        <div className="flex flex-row xs:text-lg md:text-3xl ">
          <strong>Course</strong>
          <span className="font-light">Hub</span>
        </div>

        <Group spacing={"-sm"}>
          <Button
            variant="subtle"
            color="cyan"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            color="cyan"
            onClick={() => router.push("/register")}
          >
            Start for free
          </Button>
        </Group>
      </nav>

      <Center m={"5vw"}>
        <div className="flex xs:flex-wrap flex-1 md:flex-row-reverse justify-around items-center xs:w-[90vw] md:w-full">
          <div className="relative my-6">
            <Image
              fit="cover"
              src={
                "https://www.engagedigital.ai/sites/default/files/2021-12/radisys_cpaas_teacher_diagram_hero_v2.png"
              }
              className="md:max-w-[35vw]"
              alt="CourseHub"
            />
            <Text size={"xs"}>
              Over 100K+ creators have launched their online teaching businesses
              using CourseHub.
            </Text>
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
                onClick={() => router.push("/register")}
              >
                Start for free
              </Button>
              <Button variant="light" onClick={() => router.push("/register")}>
                Book a demo
              </Button>
            </Group>
          </div>
        </div>
      </Center>
    </div>
  );
}
