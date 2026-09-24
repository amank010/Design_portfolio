import React, { Suspense } from "react";

import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader";
import InViewCanvas from "../components/InViewCanvas";

import DtuNew from "../components/DtuNew";
import HeroCamera from "../components/HeroCamera";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "../components/Icons";

const socials = [
  { label: "GitHub", href: "https://github.com/amank010", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aman-kumar-4165071b8/",
    Icon: LinkedInIcon,
  },
  { label: "X", href: "https://x.com/AMAN1266331", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/amankr010/",
    Icon: InstagramIcon,
  },
];

const About = () => {
  return (
    <section className="theme-green scroll-mt-24 my-20 sm:px-50 px-15" id="about">
      <p className="section-title mb-7">About Me</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-7 gap-5 w-full">
        <div className="card flex flex-col gap-8 px-6 sm:px-8 py-10">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/assets/face.jpeg"
            alt="Aman Kumar"
          />
          <div className="flex flex-col gap-3">
            <p className="animatedText text-4xl font-medium tracking-tight">
              I'm Aman Kumar
            </p>
            <p className="animatedText text-xl font-light tracking-widest text-(--accent)">
              A CREATIVE DESIGNER
            </p>
            <p className="animatedText text-lg ink-soft leading-relaxed">
              Passionate student at Delhi Technological University (DTU) with a
              strong focus on UI/UX design, motion graphics, and video content
              creation. Skilled in Figma, Adobe After Effects, Premiere Pro,
              Blender, and visual storytelling, with experience crafting
              engaging digital experiences, interactive interfaces, and
              high-impact content. Eager to contribute to innovative design
              projects and collaborate with creative, forward-thinking teams.
            </p>
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="icon-btn"
              >
                <social.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="https://drive.google.com/file/d/1kwY6XG_OYAdJSoGr9qY8UPSupUJ1hGKZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="pill md:text-lg py-2"
            >
              My Resume
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/918130703182"
              target="_blank"
              rel="noopener noreferrer"
              className="pill md:text-lg py-2"
            >
              Contact Me
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="card sm:p-7 p-4 flex flex-col gap-5">
          <InViewCanvas className="rounded-lg">
            <ambientLight intensity={1} />
            <directionalLight position={[0, 2, 10]} />

            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={1}>
                  <HeroCamera>
                    <DtuNew
                      scale={10}
                      rotation={[0, 0, 0]}
                      position={[-61, -143, 165]}
                    />
                  </HeroCamera>
                </group>
              </Suspense>
            </Center>
            <OrbitControls
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              enableZoom={true}
              enablePan={true}
            />
          </InViewCanvas>
        </div>
      </div>
    </section>
  );
};

export default About;
