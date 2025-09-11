import React from "react";

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-24 my-20 sm:px-50 px-15">
      <h1 className="text-5xl font-medium mb-7">Brands I have worked with</h1>
      <div className="grid xl:grid-cols-2 xl:grid-rows-1 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/*  grid */}
        <div className="col-span-1 xl:row-span-1">
          {/*  grid container, maybe one project */}
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center ">
              PokerBaazi and SportsBaazi
            </h1>

            <div className="relative w-full rounded-md overflow-hidden group">
              <img
                className="cursor-pointer w-full rounded-md object-contain"
                src="/assets/PokerBaazi.png"
                alt=""
              />
              {/* glass plane */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100  ease-in-out flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform duration-500 cursor-pointer"
                onClick={() =>
                  window.open("https://e-commerce-frontend-two-beta.vercel.app")
                }
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-10 gap-4 shadow-2xl flex">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ae1.png" className="h-10 w-10" alt="" />
                  <img src="assets/canva1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ps1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/DIOlGfXz0As/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 1
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/C9xIqXLvsqp/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 2
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/C9h2eo3vOqZ/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 3
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Helped PokerBaazi launch their Sports and Poker content IP,
                editing high-engagement videos using Premiere Pro and After
                Effects, and developing trend-based content strategies that grew
                the page from 0 to 200K followers within 6 months.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:span-3">
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center">Fisdom</h1>

            <div className="relative w-full rounded-md overflow-hidden group">
              <img
                className="cursor-pointer w-full rounded-md object-contain"
                src="/assets/fisdom.png"
                alt=""
              />

              <div
                className="absolute inset-0 opacity-0 hover:opacity-100  ease-in-out flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform duration-500
                cursor-pointer"
                onClick={() => window.open("https://www.instagram.com/fisdom/")}
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-7 gap-4 shadow-2xl flex ">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/canva1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CvUmOANM3d-/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 1
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/Cu1oMnYOfHj/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 2
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CuPEwdMsPEu/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 3
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Created both short-form and long-form video content for fintech
                brand Fisdom, using Premiere Pro to deliver high-quality,
                engaging visual content aligned with their brand goals.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Influencers ------------ */}
      <h1 className="text-5xl font-medium mb-7 mt-9">
        Influencers I have worked with
      </h1>
      <div className="grid xl:grid-cols-2 xl:grid-rows-1 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* <div className="col-span-1 xl:span-3">
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center">
              Ayushman Pandita
            </h1>
            <div>
              <img
                onClick={() =>
                  window.open("https://www.youtube.com/@AyushmanPandita/videos")
                }
                className="cursor-pointer w-full rounded-md h-fit object-contain"
                src="/assets/AP.png"
                alt=""
              />

              <div
                className=" absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform ease-in-out duration-500 cursor-pointer"
                onClick={() =>
                  window.open("https://portfolio-wine-pi-12.vercel.app")
                }
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-5 gap-4 shadow-2xl flex">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ae1.png" className="h-10 w-10" alt="" />
                  <img src="assets/blender1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ps1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=j8SlxLqa4g8")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Intro Video
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=GPieFWs5yNo")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Podcast Trailer
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=9Y5AVEG7ysY")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Long Video
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Edited a wide range of content from intros and podcasts to
                long-form videos for Ayushman Pandita, contributing to projects
                that garnered 500K+ views.{" "}
              </p>
            </div>
          </div>
        </div> */}
        {/* -----------correct one--------- */}
        <div className="col-span-1 xl:span-3">
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center">
              Ayushman Pandita
            </h1>

            <div className="relative w-full rounded-md overflow-hidden">
              <img
                className=" w-full rounded-md object-contain
              relative"
                src="/assets/AP.png"
                alt=""
              />

              <div
                className=" absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform ease-in-out duration-500 cursor-pointer"
                onClick={() =>
                  window.open("https://www.youtube.com/@AyushmanPandita/videos")
                }
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-5 gap-4 shadow-2xl flex">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ae1.png" className="h-10 w-10" alt="" />
                  <img src="assets/blender1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ps1.png" className="h-10 w-10" alt="" />
                  <img src="assets/canva1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=j8SlxLqa4g8")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Intro
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=GPieFWs5yNo")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Podcast Trailer
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=9Y5AVEG7ysY")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Long Video
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Edited a wide range of content from intros and podcasts to
                long-form videos for Ayushman Pandita, contributing to projects
                that garnered 500K+ views.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:span-3">
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center">Kanav Bhakat</h1>

            <div className="relative w-full rounded-md overflow-hidden">
              <img
                className=" w-full rounded-md object-contain
              relative
              "
                src="/assets/kanav.png"
                alt=""
              />

              <div
                className=" absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform ease-in-out duration-500 cursor-pointer"
                onClick={() =>
                  window.open("https://www.instagram.com/kanav.bhagat98/")
                }
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-5 gap-4 shadow-2xl flex">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ae1.png" className="h-10 w-10" alt="" />
                  <img src="assets/canva1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CvkCa_kpuOT/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Collab Video 1
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CvcTifkJjaF/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Collab Video 2
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Edited a collaborative sports content video featuring Kanav and
                SportyBarbie, delivering engaging visuals that aligned with
                their brand style and audience.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:span-3">
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center">Yash Garg</h1>

            <div className="relative w-full rounded-md overflow-hidden">
              <img
                className=" w-full rounded-md object-contain
              relative
              "
                src="/assets/yash.png"
                alt=""
              />

              <div
                className=" absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform ease-in-out duration-500 cursor-pointer"
                onClick={() =>
                  window.open("https://www.instagram.com/yashgarg.me/reels/")
                }
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-5 gap-4 shadow-2xl flex">
                  <img src="assets/pr1.png" className="h-10 w-10" alt="" />
                  <img src="assets/ae1.png" className="h-10 w-10" alt="" />
                  <img src="assets/canva1.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CqfmLfFsC5n/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 1
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/reel/CqQGF8bOLDV/")
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Video 2
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Edited short-form case study videos and educational content for
                Yash Garg, which collectively garnered 1M+ views, delivering
                clear and visually engaging narratives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-5xl font-medium mb-7 mt-9">UI/UX Design</h1>
      <div className="grid xl:grid-cols-2 xl:grid-rows-1 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/*  grid */}
        <div className="col-span-1 xl:row-span-1">
          {/*  grid container, maybe one project */}
          <div className="w-full h-full border border-neutral-200  bg-white/20 backdrop-blur-md rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <h1 className="text-2xl font-medium text-center ">D.Tech</h1>

            <div className="relative w-full rounded-md overflow-hidden group">
              <img
                className="cursor-pointer w-full rounded-md object-contain"
                src="/assets/dtech1.png"
                alt=""
              />
              {/* glass plane */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100  ease-in-out flex items-center justify-center gap-4 translate-y-5 hover:translate-y-0 transition-transform duration-500 cursor-pointer"
                onClick={() => window.open("http://d-tech-red.vercel.app")}
              >
                <div className="backdrop-blur-md border border-neutral-200 bg-white/20 rounded-xl p-10 gap-4 shadow-2xl flex">
                  <img src="assets/figma1.png" className="h-10 w-10" alt="" />
                  <img
                    src="assets/tailwindcss.png"
                    className="h-10 w-10"
                    alt=""
                  />
                  <img src="assets/blender1.png" className="h-10 w-10" alt="" />
                  <img src="assets/threejs.png" className="h-10 w-10" alt="" />
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-between my-2">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.figma.com/design/pIWjUKHhgclGdKyPqmQHEC/D.Tech-Redesign?node-id=0-1&t=oec8HKxzPupUy6Ls-1",
                    )
                  }
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Figma
                </button>
                <button
                  onClick={() => window.open("https://d-tech-red.vercel.app")}
                  className="cursor-pointer border border-neutral-200 backdrop-blur-md bg-white/20 rounded-full px-4 py-1 hover:bg-black hover:text-white hover:border-black ease-in-out duration-300"
                >
                  Live
                </button>
              </div>
              <p className="text-[#656565] text-base">
                Designed and prototyped an end-to-end responsive UI in Figma,
                improving design iteration speed and dev handoff. Created 3D
                models in Blender and integrated them using Three.js and GSAP
                for interactive web experiences. Elevated the brand’s visual
                identity through clean UI layouts, smooth motion, and
                microinteractions.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
