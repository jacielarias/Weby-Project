//Socials
import { FaFacebookF, FaInstagram, FaPinterestP, FaGithubAlt   } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Socials = ({ customClass, customClassLi }) => {
  return (
    <ul className={customClass}>
      <li className={`${customClassLi} shine-effect`} title="X" aria-label="X">
        <FaXTwitter />
      </li>
      <li className={`${customClassLi} shine-effect`} title="Facebook" aria-label="Facebook">
        <FaFacebookF />
      </li>
      <li className={`${customClassLi} shine-effect`} title="Instagram" aria-label="Instagram">
        <FaInstagram />
      </li>
      <li className={`${customClassLi} shine-effect`} title="Pinterest" aria-label="Pinterest">
        <FaPinterestP />
      </li>
      <li className={`${customClassLi} shine-effect`} title="Github" aria-label="Github">
        <FaGithubAlt />
      </li>
    </ul>
  );
};

export default Socials;