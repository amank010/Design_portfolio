import { clients } from "../data/work";

// A strip of film running across the top of the work section, with the
// brands and creators on it.
const Filmstrip = () => (
  <div data-animates="" className="relative z-10 -mt-11 -rotate-2 sm:-mt-14">
    <div className="filmstrip -mx-[4vw]">
      <p className="sr-only">Brands and creators: {clients.join(", ")}</p>
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {clients.map((name, index) => (
              <li
                key={name}
                className="flex items-center gap-10 pl-10 text-2xl text-white/85 sm:text-[32px]"
              >
                <span className={index % 2 ? "font-serif italic" : "font-medium tracking-tight"}>
                  {name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-rec" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </div>
);

export default Filmstrip;
