import { socials } from "../data/work";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "./Icons";

const icons = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, X: XIcon, Instagram: InstagramIcon };

const SocialLinks = ({ dark = false }) => (
  <ul className="flex items-center gap-2">
    {socials.map((social) => {
      const Icon = icons[social.label];
      return (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`icon-btn border ${
              dark
                ? "border-white/15 text-white/80 hover:bg-white hover:text-ink"
                : "border-ink/10 bg-surface/60 text-ink/80 hover:bg-ink hover:text-paper"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
