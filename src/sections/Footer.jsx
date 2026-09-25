import { RewindIcon } from "../components/Icons";
import { SEQUENCE_SECONDS } from "../components/Transport";
import { toTimecode } from "../lib/timecode";

const Footer = () => (
  <footer className="container-x flex flex-col items-center justify-between gap-4 pb-24 pt-8 sm:flex-row sm:pb-28">
    <p className="eyebrow text-ink/50">© {new Date().getFullYear()} Aman Kumar · Cut in Delhi</p>
    <p className="eyebrow hidden text-ink/40 md:block">
      End of sequence · {toTimecode(SEQUENCE_SECONDS)}
    </p>
    <a href="#top" className="eyebrow flex items-center gap-2 text-ink/70 transition-colors hover:text-ink">
      <RewindIcon className="h-3.5 w-3.5" />
      Rewind to start
    </a>
  </footer>
);

export default Footer;
