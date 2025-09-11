import React, { useState } from "react";

const NavItems = ({ setIsOpen }) => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="flex sm:absolute sm:right-0 sm:px-5 sm:py-0.5 flex-col sm:flex-row gap-6">
      {/* {["Home", "Work", "Contact", "Resume"].map((item, index)=>(<li key={index} className='text-neutral-500 hover:text-black font-light text-lg transition-colors nav-li'>
                <a href="/" className='nav-li_a'>
                {item}</a>
                
                </li>))} */}

      <li className=" text-neutral-500 hover:text-black font-light text-lg transition-colors">
        <button
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
        >
          Home
        </button>
      </li>

      <li className="cursor-pointer text-neutral-500 hover:text-black font-light text-lg transition-colors">
        <button
          className="cursor-pointer"
          onClick={() => {
            handleScroll("projects");
            setIsOpen(false);
          }}
        >
          Work
        </button>
      </li>
      <li className="cursor-pointer text-neutral-500 hover:text-black font-light text-lg transition-colors">
        <button
          className="cursor-pointer"
          onClick={() => {
            handleScroll("about");
            setIsOpen(false);
          }}
        >
          About
        </button>
      </li>

      <li className="cursor-pointer text-neutral-500 hover:text-black font-light text-lg transition-colors">
        <button
          className="cursor-pointer"
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1PMfR_ewu7igTqenVqwsYP7p1lEY_CWSJ/view?usp=sharing",
            )
          }
        >
          Resume
        </button>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header className="sm:border border-neutral-200 sm:rounded-full fixed backdrop-blur-md sm:top-7 z-50  mx-auto max-w-5xl overflow-hidden bg-white/20 left-1/2 transform -translate-x-1/2 w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex gap-5 justify-between py-3">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full w-8 h-8"
              src="/assets/face.jpeg"
              alt=""
            />
            <a
              href="/"
              className="text-black/50 text-xl font-medium transition-colors"
            >
              Aman
            </a>
          </div>

          <button
            onClick={toggleMenu}
            className=" my-auto focus-outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "/assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6 invert"
            />
          </button>

          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>
      <div
        className={`nav-sidebar transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <nav className="p-5 sm:hidden">
          <NavItems setIsOpen={setIsOpen} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
