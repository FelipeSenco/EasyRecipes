import humanBanner from "../assets/human.png";
import orcBanner from "../assets/orc.png";
import undeadBanner from "../assets/undead.png";
import nightElfBanner from "../assets/nightelf.png";
import AllBanner from "../assets/all.png";

export const useWarcraftFactionImageSource = (faction: number) => {
  switch (faction) {
    case 0:
      return humanBanner;
    case 1:
      return orcBanner;
    case 2:
      return undeadBanner;
    case 3:
      return nightElfBanner;
    default:
      return AllBanner;
  }
};
