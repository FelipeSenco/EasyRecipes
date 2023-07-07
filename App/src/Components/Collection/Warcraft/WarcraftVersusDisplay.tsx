import React, { FC } from "react";
import { useWarcraftFactionImageSource } from "../../../CustomHooks/useFactionImageSource";

type VersusDisplayProps = {
  factionNumber: number;
  opponentFactionNumber: number;
  imgSize?: string;
};

const WarcraftVersusDisplay: FC<VersusDisplayProps> = ({ factionNumber, opponentFactionNumber, imgSize = 20 }) => {
  const factionImageSrc = useWarcraftFactionImageSource(factionNumber);
  const opponentFactionImgSrc = useWarcraftFactionImageSource(opponentFactionNumber);

  return (
    <div className="flex gap-3 items-center">
      <img className={`w-${imgSize} h-${imgSize}`} src={factionImageSrc} />
      <span>VS</span>
      <img className={`w-${imgSize} h-${imgSize}`} src={opponentFactionImgSrc} />
    </div>
  );
};

export default WarcraftVersusDisplay;
