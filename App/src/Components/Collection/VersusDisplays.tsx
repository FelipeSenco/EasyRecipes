import React, { FC } from "react";
import {
  useStarcraftFactionImageSource,
  useStormgateFactionImageSource,
  useWarcraftFactionImageSource,
} from "../../CustomHooks/useFactionImageSource";
import { Games } from "../../Types&Globals/enums";

type VersusDisplayProps = {
  factionNumber: number;
  opponentFactionNumber: number;
  imgSize?: string;
  game?: Games;
};

export const VersusDisplay: FC<VersusDisplayProps> = ({ factionNumber, opponentFactionNumber, imgSize = "20", game }) => {
  switch (game) {
    case Games.Starcraft_II:
      return <StarcraftVersusDisplay factionNumber={factionNumber} opponentFactionNumber={opponentFactionNumber} imgSize={imgSize} />;
    case Games.Stormgate:
      return <StormgateVersusDisplay factionNumber={factionNumber} opponentFactionNumber={opponentFactionNumber} imgSize={imgSize} />;
    default:
      return <WarcraftVersusDisplay factionNumber={factionNumber} opponentFactionNumber={opponentFactionNumber} imgSize={imgSize} />;
  }
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

const StarcraftVersusDisplay: FC<VersusDisplayProps> = ({ factionNumber, opponentFactionNumber, imgSize = 20 }) => {
  const factionImageSrc = useStarcraftFactionImageSource(factionNumber);
  const opponentFactionImgSrc = useStarcraftFactionImageSource(opponentFactionNumber);

  return (
    <div className="flex gap-3 items-center">
      <img className={`w-${imgSize} h-${imgSize}`} src={factionImageSrc} />
      <span>VS</span>
      <img className={`w-${imgSize} h-${imgSize}`} src={opponentFactionImgSrc} />
    </div>
  );
};

const StormgateVersusDisplay: FC<VersusDisplayProps> = ({ factionNumber, opponentFactionNumber, imgSize = 20 }) => {
  const factionImageSrc = useStormgateFactionImageSource(factionNumber);
  const opponentFactionImgSrc = useStormgateFactionImageSource(opponentFactionNumber);

  return (
    <div className="flex gap-3 items-center">
      <img className={`w-${imgSize} h-${imgSize}`} src={factionImageSrc} />
      <span>VS</span>
      <img className={`w-${imgSize} h-${imgSize}`} src={opponentFactionImgSrc} />
    </div>
  );
};
