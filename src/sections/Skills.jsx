import React from "react";

const skills = [
  { name: "After Effects", src: "/assets/AE.png" },
  { name: "Premiere Pro", src: "/assets/Pr.png" },
  { name: "Photoshop", src: "/assets/ps.png" },
  { name: "Blender", src: "/assets/blender.png" },
  { name: "Figma", src: "/assets/figma.png" },
  { name: "Canva", src: "/assets/canva.png" },
];

const Skills = () => {
  return (
    <section
      id="projects"
      className="theme-violet scroll-mt-24 my-20 sm:px-50 px-15"
    >
      <h1 className="section-title mb-7">Skills</h1>
      <div className="grid grid-cols-3 gap-5 w-full">
        {skills.map(({ name, src }) => (
          <div key={name} className="card card-hover overflow-hidden">
            <img src={src} className="logo-mono w-full" alt={name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
