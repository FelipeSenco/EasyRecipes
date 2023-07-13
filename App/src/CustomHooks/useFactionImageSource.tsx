import humanBanner from "../assets/human.png";
import orcBanner from "../assets/orc.png";
import undeadBanner from "../assets/undead.png";
import nightElfBanner from "../assets/nightelf.png";
import AllBanner from "../assets/all.png";
import terranBanner from "../assets/terran.png";
import zergBanner from "../assets/zerg.png";
import protossBanner from "../assets/protoss.png";
import humanResistanceBanner from "../assets/human_resistance.png";
import infernalHostBanner from "../assets/infernal_host.png";

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

export const useStarcraftFactionImageSource = (faction: number) => {
  switch (faction) {
    case 0:
      return terranBanner;
    case 1:
      return zergBanner;
    case 2:
      return protossBanner;
    default:
      return AllBanner;
  }
};

export const useStormgateFactionImageSource = (faction: number) => {
  switch (faction) {
    case 0:
      return humanResistanceBanner;
    case 1:
      return infernalHostBanner;
    default:
      return AllBanner;
  }
};
