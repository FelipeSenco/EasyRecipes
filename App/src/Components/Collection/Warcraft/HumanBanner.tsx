import React, { CSSProperties, FC } from "react";
import humanBanner from "../../../assets/human.png";

type HumanBannerProps = {
  imgStyle?: CSSProperties;
  containerStyle?: CSSProperties;
};

const HumanBanner: FC<HumanBannerProps> = ({ imgStyle, containerStyle }) => {
  return (
    <div style={containerStyle}>
      <img src={humanBanner} className="h-20 w-20" alt="human banner" style={imgStyle} />
    </div>
  );
};

export default HumanBanner;
